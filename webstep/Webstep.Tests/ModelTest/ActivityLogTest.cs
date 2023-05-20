using NodaTime;
using NUnit.Framework;
using System;
using webstep.GraphQL;
using webstep.Models;

namespace WebstepTest.ModelTest
{
    public class ActivityLogTest
    {
        [SetUp]
        public void Setup()
        {

        }

        [Test]
        public void ActivityLogException()
        {
            var activityLog = new ActivityLog
            {
                Method = "Test",
                Type = "ghj",
                Date = new LocalDate(2020, 05, 04),
                OldValues = "ef",
                NewValues = "sfg"
            };
            try
            {
                activityLog.Validate();
            }
            catch (ClassException)
            {
                Assert.Pass();
            }

            Assert.Fail();
        }

    }
}