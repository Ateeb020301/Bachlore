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
    public class DealsConsulentsMutation
    {
        private readonly IRepository _repo;

        public DealsConsulentsMutation(IRepository repo)
        {
            _repo = repo;
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<DealsConsulentsPayload> AddDealsAsync(
            AddDealsConsulentsInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var consulent = await this._repo.SelectByIdAsync<Consultant>(input.ConsultantId, context, cancellationToken)
            .ConfigureAwait(false);

            var dealsconsulent = new DealsConsulents
            {
                 Consultant = consulent,
            };

            await _repo.CreateAsync(dealsconsulent, context, cancellationToken)
                .ConfigureAwait(false);

            return new DealsConsulentsPayload(dealsconsulent);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<DealsConsulentsPayload> DeleteConsultantAsync(
            DeleteDealsConsulentsInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var dealsconsulents = await _repo.SelectByIdAsync<DealsConsulents>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);

            await _repo.DeleteAsync(dealsconsulents, context, cancellationToken)
                .ConfigureAwait(false);

            return new DealsConsulentsPayload(dealsconsulents);
        }
    }
}
