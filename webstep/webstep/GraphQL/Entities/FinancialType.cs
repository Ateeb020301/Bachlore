namespace webstep.GraphQL.Entities
{
    using HotChocolate.Types;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Threading.Tasks;
    using webstep.Models;
    public class FinancialType : ObjectType<Financial>
    {
        protected override void Configure(IObjectTypeDescriptor<Financial> descriptor)
        {
        }
    }

    public record AddFinancialInput
    {
        [Required]
        public int Year { get; set; }
        [Required]
        public int Month { get; set; }
        public int? Revenue { get; set; }
        public int? ActualRevenue { get; set; }
        public int? EBIT { get; set; }
        public int? ActualEBIT { get; set; }
        public int? DefaultHourlyRate { get; set; }
        public int? ActualHourlyRate { get; set; }
    }
#nullable enable
    public record EditFinancialInput(int Id, int? Year, int? Month, int? Revenue, int? ActualRevenue, int? EBIT, int? ActualEBIT, int? DefaultHourlyRate, int? ActualHourlyRate);
    public record DeleteFinancialInput(int Id);
    public record FinancialPayload(Financial Financial);
}
