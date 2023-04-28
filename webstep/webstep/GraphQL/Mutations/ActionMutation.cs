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
                Customer = customer,
                IsInsert = input.IsInsert,
                IsUpdate = input.IsUpdate,
                IsDelete = input.IsDelete,
                IsMessage = input.IsMessage,
                IsPhone = input.IsPhone
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
            action.IsInsert = input.IsInsert ?? action.IsInsert;
            action.IsUpdate = input.IsUpdate ?? action.IsUpdate;
            action.IsDelete = input.IsDelete ?? action.IsDelete;
            action.IsMessage = input.IsMessage ?? action.IsMessage;
            action.IsPhone = input.IsPhone ?? action.IsPhone;

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
