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
    public class DealsMutation
    {
        private readonly IRepository _repo;

        public DealsMutation(IRepository repo)
        {
            _repo = repo;
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<DealsPayload> AddDealsAsync(
            AddDealsInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var project = await this._repo.SelectByIdAsync<Project>(input.ProjectId, context, cancellationToken)
            .ConfigureAwait(false);
            
            var seller = await this._repo.SelectByIdAsync<Seller>(input.SellerId, context, cancellationToken)
            .ConfigureAwait(false);
            
            var deal = new Deals
            {
                NumOfConsultants = input.NumOfConsultants,
                Project = project,
                Seller = seller,
            };

            await _repo.CreateAsync(deal, context, cancellationToken)
                .ConfigureAwait(false);

            return new DealsPayload(deal);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<DealsPayload> EditConsultantAsync(
            EditDealsInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var deals = await _repo.SelectByIdAsync<Deals>(input.Id, context, cancellationToken)
                                 .ConfigureAwait(false);

            deals.NumOfConsultants = input.NumOfConsultants ?? deals.NumOfConsultants;
            
            if (input.endDate.HasValue)
            {
                deals.EndDate = input.endDate;
            }
           

            await _repo
                .UpdateAsync(deals, context, cancellationToken)
                .ConfigureAwait(false);

            return new DealsPayload(deals);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<DealsPayload> DeleteConsultantAsync(
            DeleteDealsInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var deals = await _repo.SelectByIdAsync<Deals>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);

            await _repo.DeleteAsync(deals, context, cancellationToken)
                .ConfigureAwait(false);

            return new DealsPayload(deals);
        }
    }
}
