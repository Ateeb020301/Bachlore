using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webstep.Models
{
    public class Project : BaseModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public override int Id { get; set; }
        
        [Required]
        public string CustomerName { get; set; }
        
        [Required]
        public string ProjectName { get; set; }

        [Required]
        public Consultant Consultant { get; set; }

        public ICollection<Contract> Contracts { get; set; }
        
    }
}