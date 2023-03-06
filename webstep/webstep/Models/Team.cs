using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webstep.Models
{
    public class Team : BaseModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public override int Id { get; set; }

        [Required]
        public string TeamName { get; set; }

        public ICollection<Project> projects { get; set; }

        public ICollection<TeamConsultant> teamConsultants { get; set; }


    }
}