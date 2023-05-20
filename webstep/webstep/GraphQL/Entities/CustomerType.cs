namespace webstep.GraphQL.Entities
{
    using HotChocolate;
    using HotChocolate.Types;
    using System.ComponentModel.DataAnnotations;
    using global::NodaTime;
    using webstep.Models;
    using HotChocolate.Resolvers;

    public class CustomerType : ObjectType<Customer>
    {
        protected override void Configure(IObjectTypeDescriptor<Customer> descriptor)
        {
            descriptor
                .ImplementsNode()
                .IdField(t => t.Id)
                .ResolveNode((ctx, id) =>
                    ctx.DataLoader<CustomerDataLoader>().LoadAsync(id, ctx.RequestAborted));
        }
    }

    public record AddCustomerInput
    {
        [Required] public string FirstName { get; set; }
        [Required] public string LastName { get; set; }
        [Required] public string Adresse { get; set; }
        [Required] public string Email { get; set; }
        [Required] public string Tlf { get; set; }
        [Required] public int SellerId { get; set; }
    }
#nullable enable
    public record EditCustomerInput(int Id, string? FirstName, string? LastName, string? Adresse, string? Email, string? Tlf, int? SellerId);
    public record DeleteCustomerInput(int Id);
    public record CustomerPayload(Customer Customer);
}
