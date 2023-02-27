using HotChocolate.Types;
using webstep.Models;

namespace webstep.GraphQL.Entities
{
    public class ProjectConsultantType : ObjectType<ProjectConsultant>
    {
        
    }

    public record AddProjectConsultantInput(int Id, Consultant consultant, Project project);
    #nullable enable
    public record EditProjectConsultantInput(int Id, Consultant? consultant, Project? project);
    public record DeleteProjectConsultantInput(int Id);

    public record ProjectConsultantPayload(ProjectConsultant Project);


}