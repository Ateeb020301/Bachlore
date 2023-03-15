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
    using HotChocolate.Data.Filters.Expressions;
    using webstep.Interfaces;

    [ExtendObjectType(Name = nameof(Mutation))]
    public class TeamConsultantMutation
    {
        private readonly IRepository _repo;

        public TeamConsultantMutation(IRepository repo)
        {
            this._repo = repo;
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<TeamConsultantPayload> AddTeamConsultantAsync(
           AddTeamConsultantInput input,
           [ScopedService] WebstepContext context,
           CancellationToken cancellationToken)
        {
            var team = await this._repo.SelectByIdAsync<Team>(input.teamId, context, cancellationToken)
                .ConfigureAwait(false);            
            
            var consultant = await this._repo.SelectByIdAsync<Consultant>(input.consultantId, context, cancellationToken)
                .ConfigureAwait(false);


            var rule = WeekYearRules.Iso;
            var teamConsultant = new TeamConsultant
            {
                Team = team,
                Consultant= consultant,
            };

            await this._repo
                .CreateAsync(teamConsultant, context, cancellationToken)
                .ConfigureAwait(false);

            return new TeamConsultantPayload(teamConsultant);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<TeamConsultantPayload> EditTeamConsultantAsync(
            EditTeamConsultantInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {

            var teamConsultant = await this._repo.SelectByIdAsync<TeamConsultant>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);

            if (input.teamId.HasValue)
            {
                var team = await this._repo.SelectByIdAsync<Team>((int)input.teamId, context, cancellationToken);
                teamConsultant.Team = team;
            }
            if (input.consultantId.HasValue)
            {
                var consultant = await this._repo.SelectByIdAsync<Consultant>((int)input.consultantId, context, cancellationToken);
                teamConsultant.Consultant = consultant;
            }
           

            await this._repo
                .UpdateAsync(teamConsultant, context, cancellationToken)
                .ConfigureAwait(false);

            return new TeamConsultantPayload(teamConsultant);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<TeamConsultantPayload> DeleteTeamConsultantAsync(
            DeleteTeamConsultantInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var teamconsultant = await _repo.SelectByIdAsync<TeamConsultant>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);

            await _repo.DeleteAsync(teamconsultant, context, cancellationToken)
                .ConfigureAwait(false);

            return new TeamConsultantPayload(teamconsultant);
        }

    }
}
