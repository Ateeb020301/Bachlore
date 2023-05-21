using System.Collections;
using System.Linq;
using HotChocolate;
using IdentityModel.Client;
using IdentityServer4.Extensions;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using NodaTime.Calendars;

namespace webstep.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Text.RegularExpressions;
    using NodaTime;

    using webstep.GraphQL;

    public class Customer : BaseModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public override int Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Adresse { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Tlf { get; set; }

        public Seller Seller { get; set; }

        public ICollection<Prospect> Prospects { get; set; }
        public ICollection<Action> Action { get; set; }

        public void Validate()
        {
            string regex = @"^[^@\s]+@[^@\s]+\.(com|net|org|gov|no)$";
            if (this.FirstName.IsNullOrEmpty() || 
                this.Adresse.IsNullOrEmpty() || 
                this.LastName.IsNullOrEmpty() ||
                this.Tlf.IsNullOrEmpty() || 
                this.Email.IsNullOrEmpty() || 
                !(Regex.IsMatch(this.Email, regex, RegexOptions.IgnoreCase)) || 
                this.Email.IsNullOrEmpty())
            {
                throw new RequiredFieldNullException();
            }
           
        }
    }
}