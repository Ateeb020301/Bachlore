using System.Collections.Generic;
using System.Linq;
using NodaTime;
using NodaTime.Calendars;
using NUnit.Framework;
using webstep.GraphQL;
using webstep.Models;

namespace WebstepTest.ModelTest
{
    public class ConsultantTest
    {
        [SetUp]
        public void Setup()
        {
        }

        /*
        [Test]
        public void ConsultantCalculateCapacityTest()
        {           
            var rule = WeekYearRules.Iso;
            const int startWeek = 1;
            const int year = 2021;
            const int endWeek = 2;

            var consultant = new Consultant
            {
                FirstName = "John",
                LastName = "Doe",
                EmploymentDate = new LocalDate(2020, 05, 05),
                Projects = new List<Project>()
                {
                    new Project()
                    {
                        CustomerName = "Bouvet", ProjectName = "Test", Contracts = new List<Contract>()
                        {
                            new Contract()
                            {
                                DaysOfWeek = 2,
                                StartWeek = startWeek + 1,
                                StartYear = year,
                                EndWeek = endWeek,
                                EndYear = year,
                            },
                            new Contract()
                            {
                                DaysOfWeek = 2,
                                StartWeek = startWeek,
                                StartYear = year,
                                EndWeek = endWeek,
                                EndYear = year,
                            }
                        }
                    }
                }
            };

            var capacity = consultant.CalculateCapacity(year, year);
            
            Assert.True(capacity.Capacity.First(x => x.Week == 1).Days == 2);
            Assert.True(capacity.Capacity.First(x => x.Week == 2).Days == 4);
            Assert.True(capacity.Capacity.First(x => x.Week == 3).Days == 0);
        }
        */

        [Test]
        public void EmploymentDateGreaterThanResignationDateShouldThrowException()
        {
            var consultant = new Consultant
            {
                FirstName = "John",
                LastName = "Doe",
                EmploymentDate = new LocalDate(2020, 05, 05),
                ResignationDate = new LocalDate(2020, 05, 06)
            };
            try
            {
                consultant.Validate();
            }
            catch (EmploymentDateGreaterThanResignationDateException)
            {
                Assert.Pass();
            }

            Assert.Fail();
        }
    }
}