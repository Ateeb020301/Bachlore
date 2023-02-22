namespace webstep.GraphQL.Entities
{
    using global::NodaTime;
    using HotChocolate;
    using HotChocolate.Types;
    using NodaTime;
    using System;
    using System.ComponentModel.DataAnnotations;
    using webstep.Models;

    public class DealsConsulentsType : ObjectType<Deals>
    {
        protected override void Configure(IObjectTypeDescriptor<Deals> descriptor)
        {
        }
    }

    public record AddDealsConsulentsInput
    {
        [Required] public int ConsultantId { get; set; }

    }
#nullable enable
    public record DeleteDealsConsulentsInput(int Id);

    public record DealsConsulentsPayload(DealsConsulents Deals);
}