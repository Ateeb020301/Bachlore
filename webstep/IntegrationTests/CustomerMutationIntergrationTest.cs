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

namespace IntegrationTests
{
    public class CustomerMutationIntegrationTest : IDisposable
    {
        private readonly Mock<IRepository> _mockRepository;
        private readonly WebstepContext _dbContext;
        private readonly CustomerMutation _customerMutation;

        public CustomerMutationIntegrationTest()
        {
            var options = new DbContextOptionsBuilder<WebstepContext>()
                .UseInMemoryDatabase(databaseName: $"TestDb{Guid.NewGuid()}")
                .Options;

            _dbContext = new WebstepContext(options);
            _mockRepository = new Mock<IRepository>();
            _customerMutation = new CustomerMutation(_mockRepository.Object);
        }

        [Fact]
        public async void AddCustomerAsync_ShouldWork()
        {
            // Arrange
            var seller = new Seller
            {
                Id = 1,
                FullName = "Test Seller",
                Email = "seller@test.com",
                EmploymentDate = NodaTime.LocalDate.FromDateTime(DateTime.UtcNow)
            };

            _dbContext.Sellers.Add(seller);
            await _dbContext.SaveChangesAsync();

            _ = _mockRepository.Setup(r => r.SelectByIdAsync<Seller>(It.IsAny<int>(), It.IsAny<WebstepContext>(), It.IsAny<CancellationToken>()))
                               .ReturnsAsync(_dbContext.Sellers.FirstOrDefault(s => s.Id == 1));

            var input = new AddCustomerInput
            {
                FirstName = "Test",
                LastName = "User",
                Email = "testuser@test.com",
                Adresse = "123 Test St",
                Tlf = "1234567890",
                SellerId = 1
            };

            // Act
            var result = await _customerMutation.AddCustomerAsync(input, _dbContext, CancellationToken.None);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(input.FirstName, result.Customer.FirstName);
            Assert.Equal(input.LastName, result.Customer.LastName);
            Assert.Equal(input.Email, result.Customer.Email);
            Assert.Equal(input.Adresse, result.Customer.Adresse);
            Assert.Equal(input.Tlf, result.Customer.Tlf);
            Assert.Equal(input.SellerId, result.Customer.Seller.Id);
        }

        public void Dispose()
        {
            _dbContext.Database.EnsureDeleted();
            _dbContext.Dispose();
        }
    }
}
