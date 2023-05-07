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
                Email = "Test@test.com",
            };

            try
            {
                customer.Validate();
            }
            catch (FirstNameException)
            {
                Assert.Pass();
            }

            Assert.Fail();
        }

    }
}