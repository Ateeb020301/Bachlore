using System.Collections.Generic;
using NUnit.Framework;
using webstep;
using webstep.GraphQL;
using webstep.Models;

namespace WebstepTest
{
    public class TargetNumbers
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void ContractBillableCalculation()
        {
            Assert.AreEqual(100, Forecast.CalculateContracts(1,1));
            Assert.AreEqual(0, Forecast.CalculateContracts(1,0));
            Assert.AreEqual(0, Forecast.CalculateContracts(0,1));
        }

        [Test]
        public void ContractForecastCalculation()
        {
            var subProspects = new List<SubProspect>()
            {
                new SubProspect()
                {
                    Probability = 10,
                    NumOfConsultants = 1
                },
                new SubProspect()
                {
                    Probability = 10,
                    NumOfConsultants = 1
                }
            };
            Assert.AreEqual(120, Forecast.CalculateForecast(5, 5, subProspects));
            Assert.AreEqual(0, Forecast.CalculateForecast(5, 0, subProspects));
            Assert.AreEqual(0, Forecast.CalculateForecast(0, 5, new List<SubProspect>()));
            
        }
    }
}