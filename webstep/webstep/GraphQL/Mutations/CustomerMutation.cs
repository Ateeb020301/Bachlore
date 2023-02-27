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
        public async Task<ConsultantPayload> AddConsultantAsync(
            AddConsultantInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var customer = new Customer
            {
                FirstName = input.FirstName,
                LastName = input.LastName,
                Adresse = input.Adresse,
                Email = input.Email,
                Tlf = input.Tlf
            };

            customer.Validate();

            await _repo.CreateAsync(Customer, context, cancellationToken)
                .ConfigureAwait(false);

            return new ConsultantPayload(customer);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<ConsultantPayload> EditConsultantAsync(
            EditConsultantInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var consultant = await _repo.SelectByIdAsync<Consultant>(input.Id, context, cancellationToken)
                                 .ConfigureAwait(false);

            customer.FirstName = input.FirstName ?? customer.FirstName;
            customer.LastName = input.LastName ?? customer.LastName;
            customer.Adresse = input.Adresse ?? customer.Adresse;
            customer.Email = input.Email ?? customer.Email;
            
            customer.Validate();

            await _repo
                .UpdateAsync(customer, context, cancellationToken)
                .ConfigureAwait(false);

            return new ConsultantPayload(customer);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<ConsultantPayload> DeleteConsultantAsync(
            DeleteConsultantInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var customer = await _repo.SelectByIdAsync<Customer>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);

            await _repo.DeleteAsync(customer, context, cancellationToken)
                .ConfigureAwait(false);

            return new ConsultantPayload(customer);
        }
    }
}
