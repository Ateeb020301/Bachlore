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
    public class FinancialMutation
    {
        private readonly IRepository _repo;

        public FinancialMutation(IRepository repo)
        {
            this._repo = repo;
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<FinancialPayload> AddFinancialAsync(
            AddFinancialInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var financial = new Financial
            {
                Year = input.Year,
                Month = input.Month,
                Revenue = input.Revenue,
                ActualRevenue = input.ActualRevenue,
                EBIT = input.EBIT,
                ActualEBIT = input.ActualEBIT,
                DefaultHourlyRate = input.DefaultHourlyRate,
                ActualHourlyRate = input.ActualHourlyRate
            };

            financial.Validate();

            await this._repo
                .CreateAsync(financial, context, cancellationToken)
                .ConfigureAwait(false);

            return new FinancialPayload(financial);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<FinancialPayload> EditFinancialAsync(
            EditFinancialInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var financial = await this._repo.SelectByIdAsync<Financial>(input.Id, context, cancellationToken)
                                .ConfigureAwait(false);

            financial.Year = input.Year ?? financial.Year;
            financial.Month = input.Month ?? financial.Month;
            financial.Revenue = input.Revenue ?? financial.Revenue;
            financial.ActualRevenue = input.ActualRevenue ?? financial.ActualRevenue;
            financial.EBIT = input.EBIT ?? financial.EBIT;
            financial.ActualEBIT = input.ActualEBIT ?? financial.ActualEBIT;
            financial.DefaultHourlyRate = input.DefaultHourlyRate ?? financial.DefaultHourlyRate;
            financial.ActualHourlyRate = input.ActualHourlyRate ?? financial.ActualHourlyRate;

            financial.Validate();
            await this._repo
                .UpdateAsync(financial, context, cancellationToken)
                .ConfigureAwait(false);

            return new FinancialPayload(financial);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<FinancialPayload> DeleteFinancialAsync(
            DeleteFinancialInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var financial = await this._repo.SelectByIdAsync<Financial>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);

            await this._repo
                .DeleteAsync(financial, context, cancellationToken)
                .ConfigureAwait(false);

            return new FinancialPayload(financial);
        }
    }
}
