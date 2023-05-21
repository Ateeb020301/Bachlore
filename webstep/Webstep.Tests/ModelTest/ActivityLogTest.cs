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
                Method = "Insert",
                Type = "Action",
                Date = new LocalDate(2020, 05, 04),
                OldValues = "Test",
                NewValues = "Test"
            };
            try
            {
                activityLog.Validate();
            }
            catch (ClassException)
            {
                Assert.Fail();
            }

            Assert.Pass();
        }

    }
}