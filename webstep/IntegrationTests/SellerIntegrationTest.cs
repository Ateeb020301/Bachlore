using System;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using Xunit;
using webstep.GraphQL;
using webstep.GraphQL.Mutations;
using webstep.GraphQL.Entities;

namespace IntegrationTests
{
    public class SellerIntegrationTest
    {
        private readonly IRequestExecutor executor;

        public SellerIntegrationTest()
        {
            // Prepare your executor here.
            var services = new ServiceCollection();

            // Mock any dependencies your GraphQL classes may have
            // For example:
            // services.AddSingleton<ISellerService, MockSellerService>();

            // You need to replace Query and Mutation with your actual classes
            services
                .AddGraphQLServer()
                .AddQueryType<Query>()
                .AddMutationType<SellerMutation>()
                .AddType<SellerType>();

            var serviceProvider = services.BuildServiceProvider();
            var executorResolver = serviceProvider.GetRequiredService<IRequestExecutorResolver>();
            executor = executorResolver.GetRequestExecutorAsync().Result;
        }

        [Fact]
        public async Task AddSeller()
        {
            IExecutionResult result = await executor.ExecuteAsync(@"
                mutation {
                    addSeller(input: {
                        fullName: ""John Doe"",
                        email: ""johndoe@example.com"",
                        employmentDate: ""2023-05-18T00:00:00Z""
                    }) {
                        seller {
                            fullName
                            email
                            employmentDate
                        }
                    }
                }");

            // Handle any errors that occurred during execution
            if (result.Errors?.Count > 0)
            {
                // Log the errors or throw an exception for better error understanding
                throw new Exception("Execution errors occurred: " + result.Errors[0].Message);
            }

            // Cast the result data to IQueryResult to access the data
            if (result is IQueryResult queryResult)
            {
                var data = queryResult.Data;

                // Use your data here
                Assert.NotNull(data);

                var addSeller = data["addSeller"] as Dictionary<string, object>;
                var seller = addSeller["seller"] as Dictionary<string, object>;

                Assert.Equal("John Doe", seller["fullName"]);
                Assert.Equal("johndoe@example.com", seller["email"]);
                Assert.Equal("2023-05-18T00:00:00Z", seller["employmentDate"]);
            }
        }
    }
}