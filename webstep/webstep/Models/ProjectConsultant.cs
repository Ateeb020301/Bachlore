using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        public void Validate()
        {
            if (!(Consultant==null)&& !(Project==null))
            {
                throw new ArgumentNullException(nameof(Consultant), "Consultant cannot be null.");
            }
        }

    }
}