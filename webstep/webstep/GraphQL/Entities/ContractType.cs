namespace webstep.GraphQL.Entities
{
    using HotChocolate.Types;
    using System.ComponentModel.DataAnnotations;
    using webstep.Models;

    public class ContractType : ObjectType<Contract>
    {
        protected override void Configure(IObjectTypeDescriptor<Contract> descriptor)
        {
            descriptor.Field(x => x.StartDate).Ignore();
            descriptor.Field(x => x.EndDate).Ignore();
        }
    }

    public record AddContractInput
    {

        [Required]
        public int HourlyRate { get; set; }

        [Required]
        public WeekYear Start { get; set; }

        [Required]
        public WeekYear End { get; set; }
        
        [Required]
        public int ProjectId { get; set; }
        
        [Required]
        public decimal DaysOfWeek { get; set; }
    }
    #nullable enable
    public record EditContractInput(int Id, WeekYear? Start, WeekYear? End, decimal? DaysOfWeek, int? HourlyRate);
    public record DeleteContractInput(int Id);
    public record ContractPayload(Contract Contract);
}
