namespace webstep.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    using HotChocolate;
    using HotChocolate.Types;

    using IdentityServer4.Extensions;

    using NodaTime;

    using webstep.GraphQL;

    public class Contract : BaseModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public override int Id { get; set; }

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

        [Required]
        public int HourlyRate { get; set; }

        [Required]
        public Project Project { get; set; }

        [Key]
        [Required]
        public Consultant Consultant { get; set; }

        [Required]
        public decimal DaysOfWeek { get; set; }

        public void Validate()
        {
            if (this.DaysOfWeek < 0)
            {
                throw new NegativeNumberException() { Field = nameof(this.DaysOfWeek) };
            }
            
            if (this.StartDate > this.EndDate)
            {
                throw new StartDateGreaterThanEndDateException();
            }
        }

    }


}
