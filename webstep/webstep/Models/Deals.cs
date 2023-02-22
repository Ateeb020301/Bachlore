namespace webstep.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using System.Threading.Tasks;

    using HotChocolate;
    using HotChocolate.Types;

    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Configuration.Ini;

    using NodaTime;
    using NodaTime.Calendars;

    using webstep.GraphQL;

    public class Deals : BaseModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public override int Id { get; set; }

        [Required]
        public decimal NumOfConsultants { get; set; }

        [Required]
        public Project Project { get; set; }

        [Required]
        public Seller Seller { get; set; }

        [Required]
        [GraphQLIgnore]
        public LocalDate? StartDate { get; set; }

        [Required]
        [GraphQLIgnore]
        public LocalDate? EndDate { get; set; }

        public void Validate()
        {
            if (this.StartDate > this.EndDate)
            {
                throw new StartDateGreaterThanEndDateException();
            }

            if (this.NumOfConsultants < 0)
            {
                throw new NegativeNumberException() { Field = nameof(this.NumOfConsultants) };
            }

        }
    }
}
