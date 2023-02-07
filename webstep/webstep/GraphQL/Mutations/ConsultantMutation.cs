namespace webstep.GraphQL.Mutations
{
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

            consultant.Validate();

            await _repo.CreateAsync(consultant, context, cancellationToken)
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

            consultant.FirstName = input.FirstName ?? consultant.FirstName;
            consultant.LastName = input.LastName ?? consultant.LastName;
            consultant.EmploymentDate = input.EmploymentDate ?? consultant.EmploymentDate;
            consultant.Workdays = input.Workdays ?? consultant.Workdays;
            
            if (input.ResignationDate.HasValue)
            {
                consultant.ResignationDate = input.ResignationDate;
            }
            
            consultant.Validate();

            await _repo
                .UpdateAsync(consultant, context, cancellationToken)
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

            await _repo.DeleteAsync(consultant, context, cancellationToken)
                .ConfigureAwait(false);

            return new ConsultantPayload(consultant);
        }
    }
}
