namespace webstep.GraphQL.Entities
{
    using global::NodaTime;
    using HotChocolate;
    using HotChocolate.Types;
    using NodaTime;
    using System;
    using System.ComponentModel.DataAnnotations;
    using webstep.Models;

    public class DealsType : ObjectType<Deals>
    {
        protected override void Configure(IObjectTypeDescriptor<Deals> descriptor)
        {
            descriptor.Field(x => x.StartDate).Ignore();
            descriptor.Field(x => x.EndDate).Ignore();
        }
    }

    public record AddDealsInput
    {
        [Required] public decimal NumOfConsultants { get; set; }
        [Required] public int ProjectId { get; set; }
        [Required] public int SellerId { get; set; }

        [Required] public LocalDate? startDate { get; set; }

        [Required] public LocalDate? endDate { get; set; }
    }
#nullable enable
    public record EditDealsInput(int Id, int? NumOfConsultants, LocalDate? startDate, LocalDate? endDate);

    public record DeleteDealsInput(int Id);

    public record DealsPayload(Deals Deals);
}