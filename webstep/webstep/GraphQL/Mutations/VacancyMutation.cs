using System;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using NodaTime;
using NodaTime.Calendars;
using webstep.Data;
using webstep.GraphQL.Entities;
using webstep.Interfaces;
using webstep.Models;

namespace webstep.GraphQL.Mutations
{
    [ExtendObjectType(Name = nameof(Mutation))]
    public class VacancyMutation
    {
        private readonly IRepository _repo;

        public VacancyMutation(IRepository repo)
        {
            _repo = repo;
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<VacancyPayload> AddVacancyAsync(
            AddVacancyInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var consultant = await _repo.SelectByIdAsync<Consultant>(input.ConsultantId, context, cancellationToken)
                .ConfigureAwait(false);
            var rule = WeekYearRules.Iso;
            
            var vacancy = new Vacancy()
            {
                Planned = input.Planned,
                Consultant = consultant,
                DaysOfWeek = input.DaysOfWeek
            };
            
            try
            {
                vacancy.StartDate = rule.GetLocalDate(input.Start.Year, input.Start.Week, IsoDayOfWeek.Monday);
                vacancy.EndDate = rule.GetLocalDate(input.End.Year, input.End.Week, IsoDayOfWeek.Friday);
            }
            catch (ArgumentOutOfRangeException)
            {
                throw new InvalidDateException();
            }
            
            vacancy.Validate();

            await _repo
                .CreateAsync(vacancy, context, cancellationToken)
                .ConfigureAwait(false);

            return new VacancyPayload(vacancy);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<VacancyPayload> EditVacancyAsync(
            EditVacancyInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var rule = WeekYearRules.Iso;
            var vacancy = await _repo
                .SelectByIdAsync<Vacancy>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);
            
            vacancy.Planned = input.Planned ?? vacancy.Planned;
            vacancy.DaysOfWeek = input.DaysOfWeek ?? vacancy.DaysOfWeek;

            try
            {
                if (input.Start != null)
                {
                    vacancy.StartDate = rule.GetLocalDate(input.Start.Year, input.Start.Week, IsoDayOfWeek.Monday);
                }
                    
                if (input.End != null)
                {
                    vacancy.EndDate = rule.GetLocalDate(input.End.Year, input.End.Week, IsoDayOfWeek.Friday);
                }
            }
            catch (ArgumentOutOfRangeException)
            {
                throw new InvalidDateException();
            }
            
            vacancy.Validate();
            
            await _repo.UpdateAsync(vacancy, context, cancellationToken).ConfigureAwait(false);

            return new VacancyPayload(vacancy);
        }
        
        [UseDbContext(typeof(WebstepContext))]
        public async Task<VacancyPayload> DeleteVacancyAsync(
            DeleteVacancyInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var vacancy = await _repo
                .SelectByIdAsync<Vacancy>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);

            await _repo.DeleteAsync(vacancy, context, cancellationToken)
                .ConfigureAwait(false);

            return new VacancyPayload(vacancy);
        }

    }
}