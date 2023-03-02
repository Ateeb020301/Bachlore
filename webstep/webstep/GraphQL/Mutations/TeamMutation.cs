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
    public class TeamMutation
    {
        private readonly IRepository _repo;

        public TeamMutation(IRepository repo)
        {
            this._repo = repo;
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<TeamPayload> AddTeamAsync(
           AddTeamInput input,
           [ScopedService] WebstepContext context,
           CancellationToken cancellationToken)
        {

            var team = new Team
            {
                TeamName = input.TeamName
            };


            await this._repo
                .CreateAsync(team, context, cancellationToken)
                .ConfigureAwait(false);

            return new TeamPayload(team);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<TeamPayload> EditTeamAsync(
            EditTeamInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var team = await this._repo.SelectByIdAsync<Team>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);

            team.TeamName = input.TeamName ?? team.TeamName;

            await this._repo
                .UpdateAsync(team, context, cancellationToken)
                .ConfigureAwait(false);

            return new TeamPayload(team);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<TeamPayload> DeleteTeamAsync(
            DeleteSubProspectInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var team = await this._repo.SelectByIdAsync<Team>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);


            await this._repo
                .DeleteAsync(team, context, cancellationToken)
                .ConfigureAwait(false);

            return new TeamPayload(team);
        }

    }
}
