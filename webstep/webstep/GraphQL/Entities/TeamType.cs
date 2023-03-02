namespace webstep.GraphQL.Entities
{
    using HotChocolate;
    using HotChocolate.Types;
    using System;
    using System.ComponentModel.DataAnnotations;
    using webstep.Models;

    public class TeamType : ObjectType<Team>
    {
        protected override void Configure(IObjectTypeDescriptor<Team> descriptor)
        {
        }
    }

    public record AddTeamInput
    {
        [Required] public string TeamName { get; set; }
    }
#nullable enable
    public record EditTeamInput(int Id, string? TeamName);

    public record DeleteTeamInput(int Id);

    public record TeamPayload(Team Team);
}