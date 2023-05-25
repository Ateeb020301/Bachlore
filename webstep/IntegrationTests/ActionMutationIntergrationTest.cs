using System;
using System.Threading;
using Xunit;
using Microsoft.EntityFrameworkCore;
using webstep.Data;
using webstep.GraphQL.Mutations;
using webstep.Models;
using webstep.Interfaces;
using Moq;
using System.Linq;
using webstep.GraphQL.Entities;
using Action = webstep.Models.Action;

namespace IntegrationTests
{
    public class ActionMutationIntegrationTest : IDisposable
    {
        private readonly Mock<IRepository> _mockRepository;
        private readonly WebstepContext _dbContext;
        private readonly ActionMutation _actionMutation;

        public ActionMutationIntegrationTest()
        {
            var options = new DbContextOptionsBuilder<WebstepContext>()
                .UseInMemoryDatabase(databaseName: $"TestDb{Guid.NewGuid()}")
                .Options;

            _dbContext = new WebstepContext(options);
            _mockRepository = new Mock<IRepository>();
            _actionMutation = new ActionMutation(_mockRepository.Object);
        }

        [Fact]
        public async void AddActionAsync_ShouldWork()
        {
            // Arrange
            var customer = new Customer
            {
                Id = 1,
                FirstName = "Test",
                LastName = "User",
                Email = "testuser@test.com",
                Adresse = "123 Test St",
                Tlf = "1234567890"
            };

            _dbContext.Customers.Add(customer);
            await _dbContext.SaveChangesAsync();

            _ = _mockRepository.Setup(r => r.SelectByIdAsync<Customer>(It.IsAny<int>(), It.IsAny<WebstepContext>(), It.IsAny<CancellationToken>()))
                               .ReturnsAsync(_dbContext.Customers.FirstOrDefault(c => c.Id == 1));

            var input = new AddActionInput
            {
                Comment = "Test Comment",
                Date = NodaTime.LocalDate.FromDateTime(DateTime.UtcNow),
                CustomerId = 1
            };

            // Act
            var result = await _actionMutation.AddActionAsync(input, _dbContext, CancellationToken.None);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(input.Comment, result.Action.Comment);
            Assert.Equal(input.Date, result.Action.Date);
            Assert.Equal(input.CustomerId, result.Action.Customer.Id);
        }

        [Fact]
        public async void DeleteActionAsync_ShouldWork()
        {
            // Arrange
            var action = new Action
            {
                Id = 1,
                Comment = "Test Comment",
                Date = NodaTime.LocalDate.FromDateTime(DateTime.UtcNow)
            };

            _dbContext.Actions.Add(action);
            await _dbContext.SaveChangesAsync();

            _ = _mockRepository.Setup(r => r.SelectByIdAsync<Action>(It.IsAny<int>(), It.IsAny<WebstepContext>(), It.IsAny<CancellationToken>()))
                               .ReturnsAsync(_dbContext.Actions.FirstOrDefault(a => a.Id == 1));

            var input = new DeleteActionInput(1); // Provide the required Id parameter

            // Act
            var result = await _actionMutation.DeleteActionAsync(input, _dbContext, CancellationToken.None);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(input.Id, result.Action.Id);
        }


        public void Dispose()
        {
            _dbContext.Database.EnsureDeleted();
            _dbContext.Dispose();
        }
    }
}
