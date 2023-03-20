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
            var project = await _repo.SelectByIdAsync<Project>(input.ProjectId, context, cancellationToken)
                .ConfigureAwait(false);
            var consultant = await _repo.SelectByIdAsync<Consultant>(input.ConsultantId, context, cancellationToken)
                .ConfigureAwait(false);
            
            var rule = WeekYearRules.Iso;
            var projectconsultant = new ProjectConsultant
            {
                Project = project,
                Consultant = consultant,
            };

            await _repo
                .CreateAsync(projectconsultant, context, cancellationToken)
                .ConfigureAwait(false);

            return new ProjectConsultantPayload(projectconsultant);
        }


        [UseDbContext(typeof(WebstepContext))]
        public async Task<ProjectConsultantPayload> DeleteProjectConsultantAsync(
            DeleteProjectConsultantInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var projectconsultant = await _repo
                               .SelectByIdAsync<ProjectConsultant>(input.Id, context, cancellationToken)
                               .ConfigureAwait(false);

            await _repo.DeleteAsync(projectconsultant, context, cancellationToken)
                               .ConfigureAwait(false);

            return new ProjectConsultantPayload(projectconsultant);
        }
    }
}
