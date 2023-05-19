using HotChocolate;

namespace webstep.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.IdentityModel.Tokens.Jwt;
    using HotChocolate.Types.Relay;
    using IdentityServer4.Extensions;

    using NodaTime;

    using webstep.GraphQL;

    public class Seller : BaseModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public override int Id { get; set; } 

        [Required]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

#nullable enable
        public string? NameIdentifier { get; set; }

        [Required]
        public LocalDate EmploymentDate { get; set; }
        
        public LocalDate? ResignationDate { get; set; }

        public ICollection<Prospect>? Prospects { get; set; }

        public void Validate()
        {
            if (this.FullName.IsNullOrEmpty())
            {
                throw new RequiredFieldNullException() { Field = nameof(this.FullName) };
            }

            if (this.Email.IsNullOrEmpty())
            {
                throw new RequiredFieldNullException() { Field = nameof(this.FullName) };
            }

            if (this.ResignationDate.HasValue)
            {
                if (this.EmploymentDate > this.ResignationDate)
                {
                    throw new EmploymentDateGreaterThanResignationDateException();
                }
            }
        }
    }
}
