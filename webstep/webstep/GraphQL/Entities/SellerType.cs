namespace webstep.GraphQL.Entities
{
    using HotChocolate;
    using HotChocolate.Types;
    using HotChocolate.Types.Relay;
    using System.ComponentModel.DataAnnotations;
    using global::NodaTime;
    using webstep.Models;
    using HotChocolate.Resolvers;

    public class SellerType : ObjectType<Seller>, INode
    {
        protected override void Configure(IObjectTypeDescriptor<Seller> descriptor)
        {
            descriptor
                .ImplementsNode()
                .IdField(t => t.Id)
                .ResolveNode((ctx, id) =>
                    ctx.DataLoader<SellerDataLoader>().LoadAsync(id, ctx.RequestAborted));

            descriptor
                .Field(p => p.NameIdentifier)
                .Ignore();
        }
    }

    public record AddSellerInput
    {
        [Required]
        public string FullName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public LocalDate EmploymentDate { get; set; }

        public LocalDate? ResignationDate { get; set; }
    }

    public record EditSellerInput(int Id, string? FullName, string? Email, LocalDate? EmploymentDate, Optional<LocalDate?> ResignationDate);
    public record DeleteSellerInput(int Id);
    public record SellerPayload(Seller Seller);
}