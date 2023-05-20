using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using HotChocolate;
using HotChocolate.Execution;
using Snapshooter.Xunit;
using Xunit;
using Google;
using webstep.Data;
using webstep.GraphQL.Entities;
using webstep.GraphQL.Mutations;
using webstep.GraphQL;
using webstep.GraphQL.NodaTime.Types;
using webstep.Models;

namespace GraphQL.Tests
{
    public class CustomerIntergrationTest
    {
        [Fact]
        [Obsolete]
        public async Task Customer_Schema_Changed()
        {

            // arrange
            // act
            ISchema schema = await new ServiceCollection()
                .AddPooledDbContextFactory<WebstepContext>(
                    options => options.UseInMemoryDatabase($"Data Source=conferences-{Guid.NewGuid()}.db"))
                .AddGraphQL()
                .AddSorting()
                .AddFiltering()
                .AddProjections()  // Add Projections
                .AddType<LocalDateType>()
                .AddQueryType<Query>()
                .AddMutationType(d => d.Name("Mutation"))
                    .AddTypeExtension<CustomerMutation>()
                .AddType<CustomerType>()
                .EnableRelaySupport()
                .BuildSchemaAsync();

            // assert
            schema.Print().MatchSnapshot();
        }
        [Fact]
        [Obsolete]
        public async Task RegisterCustomer()
        {
            // arrange
            IRequestExecutor executor = await new ServiceCollection()
                .AddPooledDbContextFactory<WebstepContext>(
                    options => options.UseInMemoryDatabase($"Data Source=conferences-{Guid.NewGuid()}.db"))
                .AddGraphQL()
                .AddSorting()
                .AddFiltering()
                .AddProjections()  // Add Projections
                .AddType<LocalDateType>()
                .AddQueryType<Query>()
                .AddMutationType(d => d.Name("Mutation"))
                    .AddTypeExtension<CustomerMutation>()
                .AddType<CustomerType>()
                .EnableRelaySupport()
                .BuildRequestExecutorAsync();

            // act
            IExecutionResult result = await executor.ExecuteAsync(@"
            mutation {
                addCustomer(input: {
                    firstName: ""John"",
                    lastName: ""Doe"",
                    email: ""johndoe@example.com"",
                    adresse: ""123 St"",
                    tlf: ""1234567890""
                }) {
                customer {
                    firstName
                    lastName
                    email
                    adresse
                    tlf
                }
                }
            }");

            // assert
            result.ToJson().MatchSnapshot();
        }
    }
}