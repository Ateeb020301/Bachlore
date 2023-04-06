using HotChocolate;
using NodaTime.Calendars;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using static webstep.Models.Consultant;

namespace webstep.Models
{
    public class ProjectConsultant : BaseModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public override int Id { get; set; }

        [Required]
        public Project Project { get; set; }

        [Required]
        public Consultant Consultant { get; set; }

       
    }
}
