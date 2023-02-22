namespace webstep.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using System.Threading.Tasks;

    using HotChocolate;
    using HotChocolate.Types;

    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Configuration.Ini;

    using NodaTime;
    using NodaTime.Calendars;

    using webstep.GraphQL;

    public class DealsConsulents : BaseModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public override int Id { get; set; }

        [Required]
        public Consultant Consultant { get; set; }
        
    }
}
