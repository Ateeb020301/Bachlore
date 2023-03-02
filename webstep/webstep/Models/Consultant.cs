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

    public class Consultant : BaseModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public override int Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public LocalDate EmploymentDate { get; set; }

        public LocalDate? ResignationDate { get; set; }

        [Required]
        public int Workdays { get; set; }
        public ICollection<Team> ProjectConsultants { get; set; }

        public ICollection<Project> Projects{ get; set; }
        public ICollection<Vacancy> Vacancies { get; set; } = new List<Vacancy>();



        public void Validate()
        {
            if (this.FirstName.IsNullOrEmpty())
            {
                throw new RequiredFieldNullException() { Field = nameof(this.FirstName) };
            }

            if (this.LastName.IsNullOrEmpty())
            {
                throw new RequiredFieldNullException() { Field = nameof(this.LastName) };
            }

            if (this.ResignationDate.HasValue)
            {
                if (this.EmploymentDate > this.ResignationDate)
                {
                    throw new EmploymentDateGreaterThanResignationDateException();
                }
            }

            if (this.Workdays < 0)
            {
                throw new NegativeNumberException() { Field = nameof(this.Workdays) };
            }
        }
        
        
        //Finds all busy days and reverses the logic to find available days.
        [GraphQLIgnore]
        public ConsultantCapacity CalculateCapacity(int startYear, int? endYear)
        {
            if (endYear - startYear > 15)
            {
                return null;
            }

            endYear ??= startYear;
            
            var rule = WeekYearRules.Iso;
            var capacity = new List<Capacity>();
            for (var year = startYear; year <= endYear; year++)
            {
                var current = Projects.SelectMany(x => x.Contracts).Where(x => x.StartYear <= year && x.EndYear >= year);
                for (var i = 1; i <= rule.GetWeeksInWeekYear(year); i++)
                {
                    var x = current.Where(x => (x.StartWeek <= i || x.StartYear < year) && (x.EndWeek >= i || x.EndYear > year)).Sum(s => s.DaysOfWeek);

                    capacity.Add(new Capacity{Days = x, Week = i, Year = year});
                }
            }

            return new ConsultantCapacity(){Consultant = this, Capacity = capacity};
        }
    }
    
    //Holds a consultant id and its capacity
    public record ConsultantCapacity
    {
        public ConsultantCapacity()
        {
        }
        public Consultant Consultant { get; set; }
        public IEnumerable<Capacity> Capacity { get; set; }
    }
    
    //Holds weeknumber and number of available days
    public record Capacity
    {
        public Capacity()
        {
            
        }
        public decimal Days { get; set; }
        public int Week { get; set; }
        
        public int Year { get; set; }

    };

    public record Absence(string Description, bool Planned, int Week, int Year);

    public record ConsultantAbsence(Consultant Consultant, IEnumerable<Absence> Absence);

}
