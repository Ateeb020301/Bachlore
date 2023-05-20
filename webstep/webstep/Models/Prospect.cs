namespace webstep.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    using IdentityServer4.Extensions;

    using webstep.GraphQL;

    public class Prospect : BaseModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public override int Id { get; set; }

        [Required]
        public string ProjectName { get; set; }

        [Required]
        public Seller Seller { get; set; }

        [Required]
        public Customer Customer { get; set; }

        public ICollection<SubProspect> SubProspects { get; set; }
        public void Validate()
        {
            if ((Customer == null) && (Seller == null) && this.ProjectName.IsNullOrEmpty())
            {
                throw new ClassException();
            }
        }
    }


}
