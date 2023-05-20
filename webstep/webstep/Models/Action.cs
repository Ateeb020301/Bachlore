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

    using NodaTime;

    using webstep.GraphQL;

    public class Action : BaseModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public override int Id { get; set; }

        [Required]
        public string Comment { get; set; }

        [Required]
        public Customer Customer { get; set; }
        
        [Required]
        public LocalDate Date { get; set; }

        public void Validate()
        {
            if (!this.Comment.IsNullOrEmpty())
            {
                throw new ClassException();
            }
        }
    }
}