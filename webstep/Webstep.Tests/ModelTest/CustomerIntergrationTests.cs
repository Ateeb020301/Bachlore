using System.Net.Http;
using System.Threading.Tasks;
using GraphQL.Client.Http;
using GraphQL.Client.Serializer.Newtonsoft;
using Microsoft.AspNetCore.Mvc.Testing;
using Newtonsoft.Json.Linq;
using NUnit.Framework;
using webstep;
using Xunit;

namespace WebstepTest.ModelTest
{
    public class CustomerIntegrationTests : IClassFixture<WebApplicationFactory<Startup>>
    {
        private readonly WebApplicationFactory<Startup> _factory;

        public CustomerIntegrationTests(WebApplicationFactory<Startup> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task CreateCustomerMutation_ReturnsNewCustomer()
        {
            // Arrange
            var client = _factory.CreateClient();
            var httpClientHandler = new HttpClientHandler();
            var gqlHttpClient = new GraphQLHttpClient(new GraphQLHttpClientOptions
            {
                EndPoint = new System.Uri(client.BaseAddress, "graphql"),
                HttpMessageHandler = httpClientHandler
            }, new NewtonsoftJsonSerializer());

            var query = @"
                mutation CreateCustomer($input: CustomerInput!) {
                    createCustomer(input: $input) {
                        id
                        name
                        email
                    }
                }
            ";

            var variables = new
            {
                input = new
                {
                    name = "John Doe",
                    email = "john.doe@example.com"
                }
            };

            var request = new GraphQLHttpRequest
            {
                Query = query,
                Variables = JObject.FromObject(variables)
            };

            // Act
            var response = await gqlHttpClient.SendMutationAsync<dynamic>(request);

            // Assert
            Assert.NotNull(response.Data.createCustomer);
            Assert.Equals("John Doe", response.Data.createCustomer.name.ToString());
            Assert.Equals("john.doe@example.com", response.Data.createCustomer.email.ToString());
        }
    }
}