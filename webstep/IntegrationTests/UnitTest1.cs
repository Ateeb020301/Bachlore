using Xunit;
using webstep.Models;
using System;
using webstep.GraphQL;

namespace IntegrationTests
{
    public class UnitTest1
    {
        [Fact]
        public void Validate_ThrowsException_WhenFirstNameIsNull()
        {
            // Arrange
            var customer = new Customer
            {
                FirstName = null,
                LastName = "Doe",
                Email = "johndoe@example.com",
                Adresse = "123 St",
                Tlf = "1234567890",
            };

            // Act and Assert
            Assert.Throws<RequiredFieldNullException>(() => customer.Validate());
        }
        /*
        [Fact]
        public void Validate_ThrowsException_WhenEmailIsNull()
        {
            // Arrange
            var customer = new Customer
            {
                FirstName = "John",
                LastName = "Doe",
                Email = "johndoe@example.com",
                Adresse = "123 St",
                Tlf = "1234567890",
            };

            // Act and Assert
            Assert.Throws<RequiredFieldNullException>(() => customer.Validate());
        }*/
    }
}