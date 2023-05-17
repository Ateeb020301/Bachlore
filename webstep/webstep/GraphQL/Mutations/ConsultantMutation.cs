namespace webstep.GraphQL.Mutations
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using global::NodaTime;
    using global::NodaTime.Extensions;
    using HotChocolate;
    using HotChocolate.Data;
    using HotChocolate.Types;
    using webstep.Data;
    using webstep.GraphQL.Entities;
    using webstep.Interfaces;
    using webstep.Models;

    [ExtendObjectType(Name = nameof(Mutation))]
    public class ConsultantMutation
    {
        private readonly IRepository _repo;

        public ConsultantMutation(IRepository repo)
        {
            _repo = repo;
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<ConsultantPayload> AddConsultantAsync(
            AddConsultantInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {

            var consultant = new Consultant
            {
                FirstName = input.FirstName,
                LastName = input.LastName,
                EmploymentDate = input.EmploymentDate,
                ResignationDate = input.ResignationDate,
                Workdays = input.Workdays
            };

            var activitylog = new ActivityLog
            {
                Type = "Consultant",
                Method = "Insert",
                NewValues = "[" + input.FirstName + ", " + input.LastName + ", " + input.EmploymentDate + ", " + input.ResignationDate + ", " + input.Workdays + "]",
            };

            consultant.Validate();

            await _repo.CreateAsync(consultant, context, cancellationToken)
                .ConfigureAwait(false);

            await _repo.CreateAsync(activitylog, context, cancellationToken)
                .ConfigureAwait(false);
            return new ConsultantPayload(consultant);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<ConsultantPayload> EditConsultantAsync(
            EditConsultantInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var consultant = await _repo.SelectByIdAsync<Consultant>(input.Id, context, cancellationToken)
                                 .ConfigureAwait(false);

            var activitylog = new ActivityLog
            {
                Type = "Consultant",
                Method = "Update",
                OldValues = "[" + consultant.FirstName + ", " + consultant.LastName + ", " + consultant.EmploymentDate + ", " + consultant.ResignationDate.HasValue + ", " + consultant.Workdays + "]"
            };

            consultant.FirstName = input.FirstName ?? consultant.FirstName;
            consultant.LastName = input.LastName ?? consultant.LastName;
            consultant.EmploymentDate = input.EmploymentDate ?? consultant.EmploymentDate;
            consultant.Workdays = input.Workdays ?? consultant.Workdays;
            
            if (input.ResignationDate.HasValue)
            {
                consultant.ResignationDate = input.ResignationDate;
            }
            activitylog.NewValues = "Consultant edited [" + input.FirstName + ", " + input.LastName + ", " + input.EmploymentDate + ", " + input.ResignationDate.HasValue + ", " + input.Workdays + "]";
            
            consultant.Validate();

            await _repo.UpdateAsync(consultant, context, cancellationToken)
                .ConfigureAwait(false);

            await _repo.CreateAsync(activitylog, context, cancellationToken)
                .ConfigureAwait(false);

            return new ConsultantPayload(consultant);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<ConsultantPayload> DeleteConsultantAsync(
            DeleteConsultantInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var consultant = await _repo.SelectByIdAsync<Consultant>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);

            var activitylog = new ActivityLog
            {
                Type = "Consultant",
                Method = "Delete",
                NewValues = "[" + consultant.FirstName + ", " + consultant.LastName + ", " + consultant.EmploymentDate + ", " + consultant.ResignationDate + ", " + consultant.Workdays + "]",
            };

            await _repo.DeleteAsync(consultant, context, cancellationToken)
                .ConfigureAwait(false);
            await _repo.CreateAsync(activitylog, context, cancellationToken)
                .ConfigureAwait(false);
            return new ConsultantPayload(consultant);
        }
    }
}
