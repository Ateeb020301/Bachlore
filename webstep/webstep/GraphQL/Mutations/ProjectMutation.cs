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
    public class ProjectMutation
    {
        private readonly IRepository _repo;

        public ProjectMutation(IRepository repo)
        {
            _repo = repo;
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<ProjectPayload> AddProjectAsync(
            AddProjectInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {

            var project = new Project()
            {
                ProjectName = input.ProjectName,
                CustomerName = input.CustomerName,
            };

            var activitylog = new ActivityLog
            {
                Type = "Project",
                Method = "Insert",
                newValues = "[" + input.ProjectName + ", " + input.CustomerName + "]",
            };
            
            await _repo
                .CreateAsync(project, context, cancellationToken)
                .ConfigureAwait(false);

            await _repo
                .CreateAsync(activitylog, context, cancellationToken)
                .ConfigureAwait(false);

            return new ProjectPayload(project);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<ProjectPayload> EditProjectAsync(
            EditProjectInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var project = await _repo.SelectByIdAsync<Project>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);
            
            project.CustomerName = input.CustomerName ?? project.CustomerName;
            project.ProjectName = input.ProjectName ?? project.ProjectName;
            
            
            await _repo
                .UpdateAsync(project, context, cancellationToken)
                .ConfigureAwait(false);

            return new ProjectPayload(project);
        }
        
        [UseDbContext(typeof(WebstepContext))]
        public async Task<ProjectPayload> DeleteProjectAsync(
            DeleteProjectInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var project = await _repo.SelectByIdAsync<Project>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);

            var activitylog = new ActivityLog
            {
                Type = "Project",
                Method = "Delete",
                newValues = "[" + project.ProjectName + ", " + project.CustomerName + "]",
            };

            await _repo
                .DeleteAsync(project, context, cancellationToken)
                .ConfigureAwait(false);

            await _repo
                .CreateAsync(activitylog, context, cancellationToken)
                .ConfigureAwait(false);

            return new ProjectPayload(project);
        }
        
        
    }
}