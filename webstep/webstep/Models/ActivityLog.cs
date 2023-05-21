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
    using NodaTime.Extensions;
    using webstep.GraphQL;

    public class ActivityLog : BaseModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public override int Id { get; set; }

        [Required]
        public string Type { get; set; }

        [Required]
        public string Method { get; set; }

        public string OldValues { get; set; }

        public string NewValues { get; set; }

        [Required]
        public LocalDate Date { get; set; } = SystemClock.Instance.InZone(DateTimeZoneProviders.Tzdb["Europe/London"]).GetCurrentDate();

        public void Validate()
        {
            if (this.Method.IsNullOrEmpty() ||
                this.Type.IsNullOrEmpty() ||
                (this.OldValues.IsNullOrEmpty() && this.NewValues.IsNullOrEmpty()))
            {
                throw new ClassException();
            }
        }
    }
}