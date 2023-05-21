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
        public void CustomerObjectTest()
        {
            var customer = new Customer { FirstName= "Ateeb", LastName = "Salam", Adresse = "Byggveien 7", Tlf = "45418389", Email = "ateeb@live.com" };

            try {
                customer.Validate();
            }
            catch {

                Assert.Fail();
            }
            Assert.Pass();
        }



    }
}