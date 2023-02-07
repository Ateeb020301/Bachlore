using NodaTime;
using NUnit.Framework;
using webstep.GraphQL;
using webstep.Models;

namespace WebstepTest.ModelTest
{
    public class SellerTest
    {
        [SetUp]
        public void Setup()
        {
            
        }

        [Test]
        public void EmploymentDateCannotBeGreaterThanResignationDate()
        {
            var seller = new Seller
            {
                FullName = "Test",
                Email = "Test@test.com",
                EmploymentDate = new LocalDate(2020, 05, 05),
                ResignationDate = new LocalDate(2020, 05, 04),
                
            };

            try
            {
                seller.Validate();
            }
            catch (EmploymentDateGreaterThanResignationDateException)
            {
                Assert.Pass();
            }
            
            Assert.Fail();
        }
        
    }
}