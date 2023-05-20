using NodaTime;
using NUnit.Framework;
using System;
using webstep.GraphQL;
using webstep.Models;
using Action = webstep.Models.Action;

namespace WebstepTest.ModelTest
{
    public class ActionTest
    {
        [SetUp]
        public void Setup()
        {

        }

        [Test]
        public void ActionException()
        {
            var customer = new Customer
            {
                FirstName = "Test",
                LastName = "Test",
                Email = "Test",
                Adresse = "Test",
                Tlf = "Test",
            };
            var action = new Action
            {
                Comment = "Test",
                Customer = customer,
                Date= new LocalDate(2020, 05, 04),
            };

            try
            {
                action.Validate();
            }
            catch (ClassException)
            {
                Assert.Pass();
            }

            Assert.Fail();
        }

    }
}