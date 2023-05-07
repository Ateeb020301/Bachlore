using NodaTime;
using NUnit.Framework;
using System;
using webstep.GraphQL;
using webstep.Models;

namespace WebstepTest.ModelTest
{
    public class CustomerTest
    {
        [SetUp]
        public void Setup()
        {

        }

        [Test]
        public void FirstNameException()
        {
            var customer = new Customer
            {
                FirstName= "Test",
                LastName="test",
                Email = "Test@test.com",
                Adresse="",
                Tlf="",
            };
            try
            {
                customer.Validate();
            }
            catch (FirstNameException)
            {
                Assert.Pass();
            }
        }

    }
}