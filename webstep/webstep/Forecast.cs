using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.EntityFrameworkCore;
using NodaTime;
using webstep.Interfaces;
using webstep.Models;

namespace webstep
{
    public class Forecast
    {
        private readonly IRepository _repo;

        public Forecast(IRepository repo)
        {
            _repo = repo;
        }

        public decimal GetContracts(int year, int week)
        {
            var days = _repo.SelectAll<Contract>().IgnoreQueryFilters()
                .Where(y => y.StartYear <= year && y.EndYear >= year)
                .Where(x => x.StartWeek <= week && x.EndWeek >= week)
                .Sum(x => x.DaysOfWeek);

            return days;
        }

        public int GetConsultants(int year, int week)
        {
            var curr = LocalDate.FromWeekYearWeekAndDay(year, week, IsoDayOfWeek.Monday);
            
            var consultants = _repo.SelectAll<Consultant>()
                .Where(x => x.EmploymentDate <= curr)
                .Where(x => x.ResignationDate > curr || x.ResignationDate == null)
                .Sum(x => x.Workdays);

            return consultants;
        }

        public IEnumerable<SubProspect> GetSubProspects(int year, int week)
        {
            var subProspects = _repo.SelectAll<SubProspect>()
                .Where(y => y.StartYear <= year && y.EndYear >= year)
                .Where(x => x.StartWeek <= week && x.EndWeek >= week).ToList();

            return subProspects;
        }
        
        public static decimal CalculateForecast(decimal contractsDays, int consultantsWorkdays, IEnumerable<SubProspect> subProspects)
        {
            var prospectPts = subProspects.Sum(s => (decimal) s.Probability / 100 * s.NumOfConsultants * 5);

            return consultantsWorkdays == 0 ? 0 : Math.Round((prospectPts + contractsDays) / consultantsWorkdays * 100);
        }
        
        public static decimal CalculateContracts(decimal contracts, int consultantsWorkdays) => 
            consultantsWorkdays == 0 ? 0 : Math.Round(contracts / consultantsWorkdays * 100);
        }
}