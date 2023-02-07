namespace webstep.GraphQL.Entities
{
    using HotChocolate;
    using HotChocolate.Types;
    using System.ComponentModel.DataAnnotations;
    using global::NodaTime;
    using webstep.Models;

    public class SellerType : ObjectType<Seller>
    {
        protected override void Configure(IObjectTypeDescriptor<Seller> descriptor)
        {
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
#nullable enable
    public record EditSellerInput(int Id, string? FullName, string? Email, LocalDate? EmploymentDate, Optional<LocalDate?> ResignationDate);
    public record DeleteSellerInput(int Id);
    public record SellerPayload(Seller Seller);
}
