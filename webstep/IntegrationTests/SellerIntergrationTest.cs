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

namespace GraphQL.Tests
{
    public class SellerIntergrationTest
    {
        [Fact]
        [Obsolete]
        public async Task Seller_Schema_Changed()
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
                    .AddTypeExtension<SellerMutation>()
                .AddType<SellerType>()
                .EnableRelaySupport()
                .BuildSchemaAsync();

            // assert
            schema.Print().MatchSnapshot();
        }
        [Fact]
        [Obsolete]
        public async Task RegisterSeller()
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
                    .AddTypeExtension<SellerMutation>()
                .AddType<SellerType>()
                .EnableRelaySupport()
                .BuildRequestExecutorAsync();

            // act
            IExecutionResult result = await executor.ExecuteAsync(@"
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
                    }");

            // assert
            result.ToJson().MatchSnapshot();
        }
    }
}