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

    public class SubProspect : BaseModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public override int Id { get; set; }

        [Required]
        public int Probability { get; set; }

        [Required]
        public decimal NumOfConsultants { get; set; }
        
        [Required]
        public Prospect Prospect { get; set; }

        [Required]
        [GraphQLIgnore]
        public LocalDate StartDate { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public int StartYear { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public int StartWeek { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public int EndYear { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public int EndWeek { get; set; }

        [Required]
        [GraphQLIgnore]
        public LocalDate EndDate { get; set; }

        public void Validate()
        {
            var builder = new ConfigurationBuilder().AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
            var configuration = builder.Build();

            var probability = configuration.GetSection("Probability").Get<int[]>();
            
            if (!probability.Contains(this.Probability))
            {
                throw new ProbabilityOutOfBoundsException() { Probability = probability };
            }

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
