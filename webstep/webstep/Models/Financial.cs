using System.Collections.Generic;

namespace webstep.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    using webstep.GraphQL;

    public class Financial : BaseModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public override int Id { get; set; }

        [Column(TypeName = "int check(year > 0000 AND year <= 9999)")]
        public int Year { get; set; }

        [Column(TypeName = "int check(month > 0 AND month <= 12)")]
        public int Month { get; set; }

        ////Revenue
        public int? Revenue { get; set; }

        public int? ActualRevenue { get; set; }

        [NotMapped] 
        public int? AccumulatedRevenue { get; set; }
        
        [NotMapped] 
        public int? AccumulatedActualRevenue { get; set; }

        ////Result
        public int? EBIT { get; set; }

        public int? ActualEBIT { get; set; }

        [NotMapped]
        public int? AccumulatedEBIT { get; set; }

        [NotMapped]
        public int? AccumulatedActualEBIT { get; set; }

        public int? DefaultHourlyRate { get; set; }

        public int? ActualHourlyRate { get; set; }

        public static List<Financial> Accumulate(List<Financial> financials)
        {
            financials = financials.OrderBy(x => x.Year).ThenBy(y => y.Month).ToList();

            var revenue = financials.First().AccumulatedRevenue=financials.First().Revenue;
            var actualRevenue = financials.First().AccumulatedActualRevenue = financials.First().ActualRevenue;
            var ebit = financials.First().AccumulatedEBIT = financials.First().EBIT;
            var actualEbit = financials.First().AccumulatedActualEBIT = financials.First().ActualEBIT;

            for (int i = 1; i < financials.Count(); i++)
            {
                if (financials[i].Year == financials[i - 1].Year)
                {
                    financials[i].AccumulatedRevenue = revenue += financials[i].Revenue;
                    financials[i].AccumulatedActualRevenue = actualRevenue += financials[i].ActualRevenue;
                    financials[i].AccumulatedEBIT = ebit += financials[i].EBIT;
                    financials[i].AccumulatedActualEBIT = actualEbit += financials[i].ActualEBIT;
                }
                else
                {
                    revenue = 0;
                    actualRevenue = 0;
                    ebit = 0;
                    actualEbit = 0;
                }
            }
            return financials;
        }
        
        public void Validate()
        {
            if (this.Year < 0 || this.Year > 9999)
            {
                throw new ArgumentOutOfRangeException(nameof(this.Year), "Invalid");
            }

            if (this.Month < 0 || this.Month > 12)
            {
                throw new ArgumentOutOfRangeException(nameof(this.Month), "Invalid");
            }
            
            if (this.Revenue < 0)
            {
                throw new NegativeNumberException() { Field = nameof(this.Revenue) };
            }

            if (this.ActualRevenue < 0)
            {
                throw new NegativeNumberException() { Field = nameof(this.ActualRevenue) };
            }

            if (this.EBIT < 0)
            {
                throw new NegativeNumberException() { Field = nameof(this.EBIT) };
            }

            if (this.ActualEBIT < 0)
            {
                throw new NegativeNumberException() { Field = nameof(this.ActualRevenue) };
            }

            if (this.DefaultHourlyRate < 0)
            {
                throw new NegativeNumberException() { Field = nameof(this.DefaultHourlyRate) };
            }

            if (this.ActualHourlyRate < 0)
            {
                throw new NegativeNumberException() { Field = nameof(this.ActualHourlyRate) };
            }
        }
    }
}
