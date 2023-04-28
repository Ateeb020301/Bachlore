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
    public class CustomerMutation
    {
        private readonly IRepository _repo;

        public CustomerMutation(IRepository repo)
        {
            _repo = repo;
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<CustomerPayload> AddCustomerAsync(
            AddCustomerInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var seller = await _repo.SelectByIdAsync<Seller>(input.SellerId, context, cancellationToken)
                     .ConfigureAwait(false);

            var customer = new Customer
            {
                FirstName = input.FirstName,
                LastName = input.LastName,
                Email = input.Email,
                Adresse = input.Adresse,
                Tlf = input.Tlf,
                Seller = seller,
            };


            await _repo.CreateAsync(customer, context, cancellationToken)
                .ConfigureAwait(false);

            return new CustomerPayload(customer);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<CustomerPayload> EditCustomerAsync(
            EditCustomerInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var customer = await _repo.SelectByIdAsync<Customer>(input.Id, context, cancellationToken)
                                 .ConfigureAwait(false);


            customer.FirstName = input.FirstName ?? customer.FirstName;
            customer.LastName = input.LastName ?? customer.LastName;
            customer.Email = input.Email ?? customer.Email;
            customer.Adresse = input.Adresse ?? customer.Adresse;
            customer.Tlf = input.Tlf ?? customer.Tlf;
            if (input.SellerId.HasValue)
            {
                var seller = await this._repo.SelectByIdAsync<Seller>((int)input.SellerId, context, cancellationToken).ConfigureAwait(false);
                customer.Seller = seller;
            }

            await _repo
                .UpdateAsync(customer, context, cancellationToken)
                .ConfigureAwait(false);

            return new CustomerPayload(customer);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<CustomerPayload> DeleteCustomerAsync(
            DeleteCustomerInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var customer = await _repo.SelectByIdAsync<Customer>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);

            await _repo.DeleteAsync(customer, context, cancellationToken)
                .ConfigureAwait(false);

            return new CustomerPayload(customer);
        }
    }
}
