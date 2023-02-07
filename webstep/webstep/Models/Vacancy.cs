using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using HotChocolate;
using Newtonsoft.Json;
using NodaTime;
using webstep.GraphQL;

namespace webstep.Models
{
    public class Vacancy : BaseModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public override int Id { get; set; }
        
        [Required]
        public decimal DaysOfWeek { get; set; }
            
        [Required]
        public bool Planned { get; set; } 
        
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
        public Consultant Consultant { get; set; }

        public void Validate()
        {
            if (StartDate > EndDate)
            {
                throw new StartDateGreaterThanEndDateException();
            }
        }
        
        
    }
}