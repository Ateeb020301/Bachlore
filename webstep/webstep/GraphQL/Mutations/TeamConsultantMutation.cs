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
    public class TeamConsultantMutation
    {
        private readonly IRepository _repo;

        public TeamConsultantMutation(IRepository repo)
        {
            _repo = repo;
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<TeamConsultantPayload> AddTeamConsultantAsync(
            AddTeamConsultantInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var teamsconsultant = await _repo.SelectByIdAsync<TeamConsultant>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);

            var team = new TeamConsultant()
            {
                Consultant = input.consultant,
                Team = input.team
            };
            
            await _repo
                .CreateAsync(team, context, cancellationToken)
                .ConfigureAwait(false);

            return new TeamConsultantPayload(teamsconsultant);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<TeamConsultantPayload> EditTeamConsultantAsync(
            EditTeamConsultantInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var teamconsultant = await _repo.SelectByIdAsync<TeamConsultant>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);
            
            teamconsultant.Consultant = input.consultant ?? teamconsultant.Consultant;
            teamconsultant.Team = input.team ?? teamconsultant.Team;
            
            
            await _repo
                .UpdateAsync(teamconsultant, context, cancellationToken)
                .ConfigureAwait(false);

            return new TeamConsultantPayload(teamconsultant);
        }
        
        [UseDbContext(typeof(WebstepContext))]
        public async Task<TeamConsultantPayload> DeleteTeamConsultantAsync(
            DeleteTeamConsultantInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var teamconsultant = await _repo.SelectByIdAsync<TeamConsultant>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);

            await _repo
                .DeleteAsync(teamconsultant, context, cancellationToken)
                .ConfigureAwait(false);

            return new TeamConsultantPayload(teamconsultant);
        }
        
        
    }
}