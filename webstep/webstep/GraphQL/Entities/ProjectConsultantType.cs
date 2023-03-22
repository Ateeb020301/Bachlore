namespace webstep.GraphQL.Entities
{
    using HotChocolate.Types;
    using System.ComponentModel.DataAnnotations;
    using webstep.Models;

    public class ProjectConsultantType : ObjectType<ProjectConsultant>
    {
        protected override void Configure(IObjectTypeDescriptor<ProjectConsultant> descriptor)
        {
        }
    }

    public record AddProjectConsultantInput
    {

        [Required]
        public int ProjectId { get; set; }

        [Required]
        public int ConsultantId { get; set; }
    }
    #nullable enable
    public record DeleteProjectConsultantInput(int Id);
    public record ProjectConsultantPayload(ProjectConsultant projectconsultant);
}
