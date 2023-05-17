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
    using webstep.Interfaces;

    [ExtendObjectType(Name = nameof(Mutation))]
    public class SellerMutation
    {
        private readonly IRepository _repo;

        public SellerMutation(IRepository repo)
        {
            this._repo = repo;
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<SellerPayload> AddSellerAsync(
            AddSellerInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var seller = new Seller
            {
                FullName = input.FullName,
                Email = input.Email,
                EmploymentDate = input.EmploymentDate,
                ResignationDate = input.ResignationDate
            };


            seller.Validate();
            
            await this._repo
                .CreateAsync<Seller>(seller, context, cancellationToken)
                .ConfigureAwait(false);

            return new SellerPayload(seller);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<SellerPayload> EditSellerAsync(
            EditSellerInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var seller = await this._repo
                             .SelectByIdAsync<Seller>(input.Id, context, cancellationToken)
                             .ConfigureAwait(false);

            seller.FullName = input.FullName ?? seller.FullName;
            seller.Email = input.Email ?? seller.Email;
            seller.EmploymentDate = input.EmploymentDate ?? seller.EmploymentDate;
            
            if (input.ResignationDate.HasValue)
            {
                seller.ResignationDate = input.ResignationDate;
            }

            seller.Validate();

            await this._repo
                .UpdateAsync(seller, context, cancellationToken)
                .ConfigureAwait(false);

            return new SellerPayload(seller);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<SellerPayload> DeleteSellerAsync(
            DeleteSellerInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var seller = await this._repo.SelectByIdAsync<Seller>(input.Id, context, cancellationToken)
                             .ConfigureAwait(false);

            await this._repo
                 .DeleteAsync(seller, context, cancellationToken)
                 .ConfigureAwait(false);

            return new SellerPayload(seller);
        }
    }
}
