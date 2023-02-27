using HotChocolate.Types;
using webstep.Models;

namespace webstep.GraphQL.Entities
{
    public class ProjectType : ObjectType<Project>
    {
        
    }

    public record AddProjectInput(int ConsultantId, string CustomerName, string ProjectName);
    #nullable enable
    public record EditProjectInput(int Id, string? CustomerName, string? ProjectName);
    public record DeleteProjectInput(int Id);

    public record ProjectPayload(Project Project);


}