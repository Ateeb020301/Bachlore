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
    public class ProjectConsultantMutation
    {
        private readonly IRepository _repo;

        public ProjectConsultantMutation(IRepository repo)
        {
            _repo = repo;
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<ProjectConsultantPayload> AddProjectConsultantAsync(
            AddProjectConsultantInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var consultant = await _repo.SelectByIdAsync<Consultant>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);

            var project = await _repo.SelectByIdAsync<Project>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);

            var projectConsultant = new ProjectConsultant()
            {
                Consultant = consultant,
                Project = project,
            };
            
            await _repo
                .CreateAsync(projectConsultant, context, cancellationToken)
                .ConfigureAwait(false);

            return new ProjectConsultantPayload(projectConsultant);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<ProjectConsultantPayload> EditProjectConsultantAsync(
            EditProjectConsultantInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var projectConsultant = await _repo.SelectByIdAsync<ProjectConsultant>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);
            
            projectConsultant.Consultant = input.consultant ?? projectConsultant.Consultant;
            projectConsultant.Project = input.project ?? projectConsultant.Project;
            
            
            await _repo
                .UpdateAsync(projectConsultant, context, cancellationToken)
                .ConfigureAwait(false);

            return new ProjectConsultantPayload(projectConsultant);
        }
        
        [UseDbContext(typeof(WebstepContext))]
        public async Task<ProjectConsultantPayload> DeleteProjectAsync(
            DeleteProjectConsultantInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var projectConsultant = await _repo.SelectByIdAsync<ProjectConsultant>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);

            await _repo
                .DeleteAsync(projectConsultant, context, cancellationToken)
                .ConfigureAwait(false);

            return new ProjectConsultantPayload(projectConsultant);
        }
        
        
    }
}