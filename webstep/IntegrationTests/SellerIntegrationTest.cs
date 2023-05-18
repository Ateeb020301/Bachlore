using System.Net.Http;
using System.Text;
using System.Text.Json;
using Xunit;
using Microsoft.AspNetCore.TestHost;
using Microsoft.AspNetCore.Hosting;
using webstep;
using System.Net;
using webstep.Models;

namespace IntegrationTests
{
    public class SellerIntergrationTest
    {
        private readonly TestServer _server;
        private readonly HttpClient _client;

        public SellerIntergrationTest()
        {
            // Arrange
            _server = new TestServer(new WebHostBuilder().UseStartup<Startup>());
            _client = _server.CreateClient();
        }

        [Fact]
        public async Task AddSellerAsync_ReturnsSeller_WhenDataIsValid()
        {
            // Arrange
            var query = new
            {
                query = @"
                    mutation {
                        addSeller(input: {
                            fullName: ""John Doe"",
                            email: ""johndoe@example.com"",
                            employmentDate: ""2023-05-18""
                        }) {
                            seller {
                                fullName
                                email
                                employmentDate
                            }
                        }
                    }"
            };

            var content = new StringContent(JsonSerializer.Serialize(query), Encoding.UTF8, "application/json");

            // Act
            var response = await _client.PostAsync("/graphql", content);

            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            var jsonResponse = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<GraphQLResponse<SellerPayload>>(jsonResponse);

            Assert.NotNull(result);
            Assert.NotNull(result.Data);
            Assert.NotNull(result.Data.Seller);
            Assert.Equal("John Doe", result.Data.Seller.FullName);
            Assert.Equal("johndoe@example.com", result.Data.Seller.Email);
        }
    }

    public class GraphQLResponse<T>
    {
        public T Data { get; set; }
        // Other fields...
    }

    public class SellerPayload
    {
        public Seller Seller { get; set; }
        // Other fields...
    }
}