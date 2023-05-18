using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using GraphQL;
using Newtonsoft.Json;
using webstep;
using webstep.GraphQL.Entities;
using webstep.Models;
using Xunit;

namespace WebstepIntergration
{
    public class CustomerIntergrationTest : IClassFixture<WebApplicationFactory<Startup>>
    {
        private readonly WebApplicationFactory<Startup> _factory;
        private readonly HttpClient _client;

        public CustomerIntergrationTest(WebApplicationFactory<Startup> factory)
        {
            _factory = factory;
            _client = _factory.CreateClient();
        }

        [Fact]
        public async Task AddCustomerMutation_ReturnsNewCustomer()
        {
            // Arrange
            var query = @"
                mutation ($input: AddCustomerInput!) {
                    addCustomer(input: $input) {
                        customer {
                            id
                            firstName
                            lastName
                            address
                            email
                            tlf
                            sellerId
                        }
                    }
                }";

            var variables = new
            {
                input = new AddCustomerInput
                {
                    FirstName = "John",
                    LastName = "Doe",
                    Adresse = "123 Main St",
                    Email = "john.doe@example.com",
                    Tlf = "555-1234",
                    SellerId = 1
                }
            };

            var request = new
            {
                query,
                variables
            };

            // Act
            var response = await SendGraphQLRequestAsync(request);

            // Assert
            response.EnsureSuccessStatusCode();

            var responseContent = await response.Content.ReadAsStringAsync();
            var responseObject = JsonConvert.DeserializeObject<GraphQLResponse<CustomerPayload>>(responseContent);

            var customer = responseObject.Data?.AddCustomer?.Customer;
            Assert.NotNull(customer);
            Assert.Equal("John", customer?.FirstName);
            Assert.Equal("Doe", customer?.LastName);
            Assert.Equal("123 Main St", customer?.Address);
            Assert.Equal("john.doe@example.com", customer?.Email);
            Assert.Equal("555-1234", customer?.Tlf);
            Assert.Equal(1, customer?.SellerId);
        }

        private async Task<HttpResponseMessage> SendGraphQLRequestAsync(object request)
        {
            var content = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");
            return await _client.PostAsync("/graphql", content);
        }
    }
}