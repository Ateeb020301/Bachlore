using NodaTime;
using NUnit.Framework;
using System;
using webstep.GraphQL;
using webstep.Models;

namespace WebstepTest.ModelTest
{
    public class ProjectConsutantTest
    {
        [SetUp]
        public void Setup()
        {

        }

        [Test]
        public void ProjectConsultantException()
        {
            var consultant= new Consultant
            {
                FirstName = "John",
                LastName = "Doe",
                EmploymentDate = new LocalDate(2020, 05, 04)

            };

            var project = new Project
            {
                CustomerName = "Jane",
                ProjectName = "Kassesystem"
            };

            var projectConsultant = new ProjectConsultant
            {
                Consultant = consultant,
                Project = project
            };

            try
            {
                projectConsultant.Validate();
            }
            catch (ArgumentNullException)
            {
                Assert.Fail();
            }
            Assert.Pass();

        }

    }
}