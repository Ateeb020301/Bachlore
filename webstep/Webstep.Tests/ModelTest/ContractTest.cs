using NodaTime;
using NUnit.Framework;
using webstep.GraphQL;
using webstep.Models;

namespace WebstepTest.ModelTest
{
    public class ContractTest
    {
        [SetUp]
        public void Setup()
        {
        }
        
        [Test]
        public void StartDateCannotBeGreaterThanEndDate()
        {
            var contract = new Contract
            {
                DaysOfWeek = 1,
                StartDate = new LocalDate(2020, 01, 02),
                EndDate = new LocalDate(2020, 01, 01),
            };

            try
            {
                contract.Validate();
            }
            catch (StartDateGreaterThanEndDateException)
            {
                Assert.Pass();
            }

            Assert.Fail();
        }
    }
}