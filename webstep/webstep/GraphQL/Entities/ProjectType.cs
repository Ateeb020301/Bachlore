using HotChocolate.Types;
using webstep.Models;

namespace webstep.GraphQL.Entities
{
    public class ProjectType : ObjectType<Project>
    {
        
    }

    public record AddProjectInput(string CustomerName, string ProjectName, int teamId);
    #nullable enable
    public record EditProjectInput(int Id, string? CustomerName, string? ProjectName);
    public record DeleteProjectInput(int Id);

    public record ProjectPayload(Project Project);


}