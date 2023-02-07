using System.ComponentModel.DataAnnotations;

namespace webstep.Models
{
    public class WeekYear
    {
        [Required]
        public int Year { get; set; }
        [Required]
        public int Week { get; set; }
    }
}