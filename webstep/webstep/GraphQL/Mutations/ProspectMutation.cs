﻿using System;
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
    using webstep.Interfaces;

    [ExtendObjectType(Name = nameof(Mutation))]
    public class ProspectMutation
    {
        private readonly IRepository _repo;

        public ProspectMutation(IRepository repo)
        {
            this._repo = repo;
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<ProspectPayload> AddProspectAsync(
            AddProspectInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var customer = await this._repo
               .SelectByIdAsync<Customer>(input.CustomerId, context, cancellationToken)
               .ConfigureAwait(false);

            var seller = await this._repo
                .SelectByIdAsync<Seller>(input.SellerId, context, cancellationToken)
                .ConfigureAwait(false);
            Console.WriteLine(input.CustomerId);


            var prospect = new Prospect
            {
                Seller = seller,
                ProjectName = input.ProjectName,
                Customer = customer,
            };

            prospect.Validate();
            await this._repo
                .CreateAsync(prospect, context, cancellationToken)
                .ConfigureAwait(false);

            return new ProspectPayload(prospect);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<ProspectPayload> EditProspectAsync(
            EditProspectInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var prospect = await this._repo.SelectByIdAsync<Prospect>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);
            if (input.SellerId.HasValue)
            {
                var seller = await this._repo.SelectByIdAsync<Seller>((int)input.SellerId, context, cancellationToken).ConfigureAwait(false);
                prospect.Seller = seller;
            }
            if (input.CustomerId.HasValue)
            {
                var customer = await this._repo.SelectByIdAsync<Customer>((int)input.CustomerId, context, cancellationToken).ConfigureAwait(false);
                prospect.Customer = customer;
            }

            prospect.ProjectName = input.ProjectName ?? prospect.ProjectName;

            prospect.Validate();
            await this._repo
                .UpdateAsync(prospect, context, cancellationToken)
                .ConfigureAwait(false);

            return new ProspectPayload(prospect);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<ProspectPayload> DeleteProspectAsync(
            DeleteProspectInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var prospect = await this._repo.SelectByIdAsync<Prospect>(input.Id, context, cancellationToken)
                             .ConfigureAwait(false);

            await this._repo
                 .DeleteAsync(prospect, context, cancellationToken)
                 .ConfigureAwait(false);

            return new ProspectPayload(prospect);
        }
    }
}
