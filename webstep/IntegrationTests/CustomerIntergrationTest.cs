using GraphQL;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using System.Net;
using System.Text;
using System.Text.Json;
using webstep;
using webstep.GraphQL.Entities;

public class CustomerIntergrationTest
{
    private readonly TestServer _server;
    private readonly HttpClient _client;

    public CustomerIntergrationTest()
    {
        _server = new TestServer(new WebHostBuilder().UseStartup<Startup>());
        _client = _server.CreateClient();
    }

    [Fact]
    public async Task CreateCustomer_ReturnsCustomer_WhenDataIsValid()
    {
        int sellerId = 1;

        var query = new
        {
            query = @"
                mutation {
                    addCustomer(input: {
                        firstName: ""John"",
                        lastName: ""Doe"",
                        email: ""johndoe@example.com"",
                        adresse: ""123 St"",
                        tlf: ""1234567890"",
                        sellerId: " + sellerId + @"
                    }) {
                        customer {
                            firstName
                            lastName
                            email
                        }
                    }
                }"
        };

        var content = new StringContent(JsonSerializer.Serialize(query), Encoding.UTF8, "application/json");

        var response = await _client.PostAsync("/graphql", content);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var jsonResponse = await response.Content.ReadAsStringAsync();

        // Log the jsonResponse to inspect it
        Console.WriteLine(jsonResponse);

        var result = JsonSerializer.Deserialize<GraphQLResponse<CustomerPayload>>(jsonResponse);

        Assert.NotNull(result);
        Assert.NotNull(result.Data);
        Assert.Equal("John", result.Data.Customer.FirstName);
        Assert.Equal("Doe", result.Data.Customer.LastName);
        Assert.Equal("johndoe@example.com", result.Data.Customer.Email);
    }
}
