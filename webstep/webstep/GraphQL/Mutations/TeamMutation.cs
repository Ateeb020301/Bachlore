using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using webstep.Data;
using webstep.GraphQL.Entities;
using webstep.Interfaces;
using webstep.Models;

namespace webstep.GraphQL.Mutations
{
    [ExtendObjectType(Name = nameof(Mutation))]
    public class TeamMutation
    {
        private readonly IRepository _repo;

        public TeamMutation(IRepository repo)
        {
            _repo = repo;
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<TeamPayload> AddTeamAsync(
            AddTeamInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var teams = await _repo.SelectByIdAsync<Team>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);

            var team = new Team()
            {
                TeamName = input.TeamName,
            };
            
            await _repo
                .CreateAsync(team, context, cancellationToken)
                .ConfigureAwait(false);

            return new TeamPayload(teams);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<TeamPayload> EditTeamAsync(
            EditTeamInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var team = await _repo.SelectByIdAsync<Team>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);
            
            team.TeamName = input.TeamName ?? team.TeamName;
            
            
            await _repo
                .UpdateAsync(team, context, cancellationToken)
                .ConfigureAwait(false);

            return new TeamPayload(team);
        }
        
        [UseDbContext(typeof(WebstepContext))]
        public async Task<TeamPayload> DeleteTeamAsync(
            DeleteTeamInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var team = await _repo.SelectByIdAsync<Team>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);

            await _repo
                .DeleteAsync(team, context, cancellationToken)
                .ConfigureAwait(false);

            return new TeamPayload(team);
        }
        
        
    }
}