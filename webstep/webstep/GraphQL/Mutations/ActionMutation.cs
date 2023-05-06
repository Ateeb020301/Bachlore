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
    public class ActionMutation
    {
        private readonly IRepository _repo;

        public ActionMutation(IRepository repo)
        {
            _repo = repo;
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<ActionPayload> AddActionAsync(
            AddActionInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var customer = await _repo.SelectByIdAsync<Customer>(input.CustomerId, context, cancellationToken)
                     .ConfigureAwait(false);

            var action = new Models.Action
            {
                Comment = input.Comment,
                Date = input.Date,
                Customer = customer,
            };


            await _repo.CreateAsync(action, context, cancellationToken)
                .ConfigureAwait(false);

            return new ActionPayload(action);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<ActionPayload> EditActionAsync(
            EditActionInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var action = await _repo.SelectByIdAsync<Models.Action>(input.Id, context, cancellationToken)
                                 .ConfigureAwait(false);

            action.Comment = input.Comment ?? action.Comment;

            await _repo
                .UpdateAsync(action, context, cancellationToken)
                .ConfigureAwait(false);

            return new ActionPayload(action);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<ActionPayload> DeleteActionAsync(
            DeleteActionInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var action = await _repo.SelectByIdAsync<Models.Action>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);

            await _repo.DeleteAsync(action, context, cancellationToken)
                .ConfigureAwait(false);

            return new ActionPayload(action);
        }
    }
}
