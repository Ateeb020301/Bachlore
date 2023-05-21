using NodaTime;
using NUnit.Framework;
using System;
using webstep.GraphQL;
using webstep.Models;

namespace WebstepTest.ModelTest
{
    public class ProspectTest
    {
        [SetUp]
        public void Setup()
        {

        }

        [Test]
        public void ProspectException()
        {
            var customer = new Customer
            {
                FirstName = "Test",
                LastName = "Test",
                Email = "test@msn.com",
                Adresse = "Test",
                Tlf = "45418389",
            };
            var seller = new Seller
            {
                FullName = "Test",
                Email = "Test",
                EmploymentDate = new LocalDate(2020, 05, 04),
            };
            var prospect = new Prospect
            {
                ProjectName = "Test",
                Seller = seller,
                Customer = customer
            };
            try
            {
                prospect.Validate();
            }
            catch (ClassException)
            {
                Assert.Fail();
                
            }
            Assert.Pass();


        }

    }
}