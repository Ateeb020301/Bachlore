using Microsoft.Extensions.Configuration;
using NodaTime;
using NUnit.Framework;
using webstep.GraphQL;
using webstep.Models;

namespace WebstepTest.ModelTest
{
    public class SubProspectTest
    {
        
        
        [SetUp]
        public void Setup()
        {
           
        }

        [Test]
        public void ProbabilityOutOfRange()
        {
            var subprospect = new SubProspect
            {
                Probability = 1,
                StartDate = new LocalDate(2020, 05, 05),
                EndDate = new LocalDate(2020, 06, 06),
                NumOfConsultants = 2,
            };

            try
            {
                subprospect.Validate();
            }
            catch (ProbabilityOutOfBoundsException)
            {
                Assert.Pass();
            }

            Assert.Fail();
        }

        [Test]
        public void StartDateCannotBeGreaterThanEndDate()
        {
            var builder = new ConfigurationBuilder().AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
            var configuration = builder.Build();
            var probability = configuration.GetSection("Probability").Get<int[]>();
            
            var subprospect = new SubProspect
            {
                Probability = probability[0],
                StartDate = new LocalDate(2020, 05, 05),
                EndDate = new LocalDate(2020, 05, 04),
                NumOfConsultants = 2
            };

            try
            {
                subprospect.Validate();
            }
            catch (StartDateGreaterThanEndDateException)
            {
                Assert.Pass();
            }

            Assert.Fail();
        }

    }
}