using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using webstep.Data;
using webstep.GraphQL.Entities;
using webstep.Models;

namespace webstep.GraphQL.Mutations
{
    using global::NodaTime;
    using global::NodaTime.Calendars;

    using webstep.Interfaces;

    [ExtendObjectType(Name = nameof(Mutation))]
    public class SubProspectMutation
    {
        private readonly IRepository _repo;

        public SubProspectMutation(IRepository repo)
        {
            this._repo = repo;
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<SubProspectPayload> AddSubProspectAsync(
           AddSubProspectInput input,
           [ScopedService] WebstepContext context,
           CancellationToken cancellationToken)
        {
            var prospect = await this._repo.SelectByIdAsync<Prospect>(input.ProspectId, context, cancellationToken)
                .ConfigureAwait(false);


            var rule = WeekYearRules.Iso;
            var subProspect = new SubProspect
            {
                Probability = input.Probability,
                NumOfConsultants = input.NumOfConsultants,
                Prospect = prospect,
            };

            try
            {
                subProspect.StartDate = rule.GetLocalDate(input.Start.Year, input.Start.Week, IsoDayOfWeek.Monday);
                subProspect.EndDate = rule.GetLocalDate(input.End.Year, input.End.Week, IsoDayOfWeek.Friday);
            }
            catch (ArgumentOutOfRangeException)
            {
                throw new InvalidDateException();
            }

            subProspect.Validate();

            await this._repo
                .CreateAsync(subProspect, context, cancellationToken)
                .ConfigureAwait(false);

            return new SubProspectPayload(subProspect);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<SubProspectPayload> EditSubProspectAsync(
            EditSubProspectInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var rule = WeekYearRules.Iso;
            var subProspect = await this._repo.SelectByIdAsync<SubProspect>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);

            subProspect.Probability = input.Probability ?? subProspect.Probability;
            subProspect.NumOfConsultants = input.NumOfConsultants ?? subProspect.NumOfConsultants;

            if (input.ProspectId.HasValue)
            {
                var prospect = await this._repo.SelectByIdAsync<Prospect>((int)input.ProspectId, context, cancellationToken);
                subProspect.Prospect = prospect;
            }
            
            try
            {
                if (input.Start != null)
                {
                    subProspect.StartDate = rule.GetLocalDate(input.Start.Year, input.Start.Week,
                        IsoDayOfWeek.Monday);
                }

                if (input.End != null)
                {
                    subProspect.EndDate =
                        rule.GetLocalDate(input.End.Year, input.End.Week, IsoDayOfWeek.Friday);
                }
            }
            catch (ArgumentOutOfRangeException)
            {
                throw new InvalidDateException();
            }

            subProspect.Validate();

            await this._repo
                .UpdateAsync(subProspect, context, cancellationToken)
                .ConfigureAwait(false);

            return new SubProspectPayload(subProspect);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<SubProspectPayload> DeleteSubProspectAsync(
            DeleteSubProspectInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var subProspect = await this._repo.SelectByIdAsync<SubProspect>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);


            await this._repo
                .DeleteAsync(subProspect, context, cancellationToken)
                .ConfigureAwait(false);

            return new SubProspectPayload(subProspect);
        }

    }
}
