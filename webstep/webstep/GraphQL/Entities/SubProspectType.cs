namespace webstep.GraphQL.Entities
{
    using HotChocolate;
    using HotChocolate.Types;
    using System;
    using System.ComponentModel.DataAnnotations;
    using webstep.Models;

    public class SubProspectType : ObjectType<SubProspect>
    {
        protected override void Configure(IObjectTypeDescriptor<SubProspect> descriptor)
        {
            descriptor.Field(x => x.StartDate).Ignore();
            descriptor.Field(x => x.EndDate).Ignore();
        }
    }

    public record AddSubProspectInput
    {
        [Required] public int ProspectId { get; set; }

        [Required] public int Probability { get; set; }

        [Required] public decimal NumOfConsultants { get; set; }

        [Required] public WeekYear Start { get; set; }

        [Required] public WeekYear End { get; set; }
    }
#nullable enable
    public record EditSubProspectInput(int Id, int? Probability, decimal? NumOfConsultants, int? ProspectId,
        WeekYear? Start, WeekYear? End);

    public record DeleteSubProspectInput(int Id);

    public record SubProspectPayload(SubProspect SubProspect);
}