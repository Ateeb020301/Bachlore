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
                FirstName= "test",
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
        [Test]
        public void EmailException()
        {
            var customer = new Customer
            {
                Email = "Test@test.com",
            };
            try
            {
                customer.Validate();
            }
            catch (EmailException)
            {
                Assert.Pass();
            }
            Assert.Fail();
        }

    }
}