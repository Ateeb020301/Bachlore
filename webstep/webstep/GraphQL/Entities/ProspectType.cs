namespace webstep.GraphQL.Entities
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using HotChocolate;
    using HotChocolate.Types;
    using Models;

    public class ProspectType : ObjectType<Prospect>
    {
        protected override void Configure(IObjectTypeDescriptor<Prospect> descriptor)
        {
        }
    }

    public record AddProspectInput
    {
        [Required] public int SellerId { get; set; }

        [Required] public string CustomerName { get; set; }

        [Required] public string ProjectName { get; set; }
    }
#nullable enable
    public record EditProspectInput(int Id, string? CustomerName, int? SellerId, string? ProjectName);
    public record DeleteProspectInput(int Id);
    public record ProspectPayload(Prospect Prospect);
}

