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
        public Team Team { get; set; }

        public ICollection<Contract> Contracts { get; set; }

        public List<Contract> GetContracts(int id)
        {
            List<Contract> result = new List<Contract>();
            foreach (var contract in Contracts) {
                if (contract.Consultant.Id == id)
                {
                    result.Add(contract);
                }
            }

            return result;
        }
    }
}
