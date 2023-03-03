namespace webstep.GraphQL.Entities
{
    using HotChocolate;
    using HotChocolate.Types;
    using System;
    using System.ComponentModel.DataAnnotations;
    using webstep.Models;

    public class TeamConsultantType : ObjectType<TeamConsultant>
    {
        protected override void Configure(IObjectTypeDescriptor<TeamConsultant> descriptor)
        {
        }
    }

    public record AddTeamConsultantInput
    {
        [Required] public int consultantId { get; set; }

        [Required] public int teamId { get; set; }
    }
#nullable enable
    public record EditTeamConsultantInput(int Id, int? consultantId, int? teamId);

    public record DeleteTeamConsultantInput(int Id);

    public record TeamConsultantPayload(TeamConsultant TeamConsultant);
}