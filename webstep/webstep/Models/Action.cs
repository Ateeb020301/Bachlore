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

        public int IsInsert { get; set; }
        public int IsUpdate { get; set; }
        public int IsDelete { get; set; }
        public int IsMessage { get; set; }
        public int IsPhone { get; set; }




    }
}