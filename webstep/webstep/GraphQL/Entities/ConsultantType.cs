namespace webstep.GraphQL.Entities
{
    using HotChocolate;
    using HotChocolate.Types;
    using System.ComponentModel.DataAnnotations;
    using global::NodaTime;
    using webstep.Models;

    public class ConsultantType : ObjectType<Consultant>
    {
        protected override void Configure(IObjectTypeDescriptor<Consultant> descriptor)
        {
        }
    }

    public record AddConsultantInput
    {
        [Required] public string FirstName { get; set; }
        [Required] public string LastName { get; set; }
        [Required] public LocalDate EmploymentDate { get; set; }
        public LocalDate? ResignationDate { get; set; }
        [Required]
        public int Workdays { get; set; }
    }
#nullable enable
    public record EditConsultantInput(int Id, string? FirstName, string? LastName, LocalDate? EmploymentDate, Optional<LocalDate?> ResignationDate, int? Workdays);
    public record DeleteConsultantInput(int Id);
    public record ConsultantPayload(Consultant Consultant);
}
