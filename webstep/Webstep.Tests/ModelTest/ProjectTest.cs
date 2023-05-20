using NodaTime;
using NUnit.Framework;
using System;
using webstep.GraphQL;
using webstep.Models;

namespace WebstepTest.ModelTest
{
    public class ProjectTest
    {
        [SetUp]
        public void Setup()
        {

        }

        [Test]
        public void ProjectException()
        {

            var project = new Project
            {
                CustomerName = "Test",
                ProjectName= "Test",
            };

            try
            {
                project.Validate();

            }
            catch (ClassException)
            {
                Assert.Pass();
            }

            Assert.Fail();
        }

    }
}