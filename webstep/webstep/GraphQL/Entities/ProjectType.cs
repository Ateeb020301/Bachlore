using HotChocolate.Execution.Processing;
using HotChocolate.Types;
using System.Security.Cryptography.X509Certificates;
using webstep.Models;

namespace webstep.GraphQL.Entities
{
    public class ProjectType : ObjectType<Project>
    {
        protected override void Configure(IObjectTypeDescriptor<Project> descriptor)
        {
            descriptor
                .Field(p => p.Contracts)
                .Argument("id", a => a.Type<NonNullType<IntType>>())
                .ResolveWith<Project>(r => r.GetContracts(default));
        }
    }

    public record AddProjectInput(string CustomerName, string ProjectName, int teamId);
    #nullable enable
    public record EditProjectInput(int Id, string? CustomerName, string? ProjectName);
    public record DeleteProjectInput(int Id);

    public record ProjectPayload(Project Project);


}