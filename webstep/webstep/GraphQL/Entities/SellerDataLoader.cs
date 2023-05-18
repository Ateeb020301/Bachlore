using GreenDonut;
using HotChocolate.DataLoader;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Threading;
using webstep.Models;
using webstep.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace webstep.GraphQL.Entities
{
    public class SellerDataLoader : BatchDataLoader<int, Seller>
    {
        private readonly IDbContextFactory<WebstepContext> _dbContextFactory;

        public SellerDataLoader(
            IBatchScheduler batchScheduler,
            IDbContextFactory<WebstepContext> dbContextFactory)
            : base(batchScheduler)
        {
            _dbContextFactory = dbContextFactory;
        }

        protected override async Task<IReadOnlyDictionary<int, Seller>> LoadBatchAsync(IReadOnlyList<int> keys, CancellationToken cancellationToken)
        {
            await using WebstepContext dbContext = _dbContextFactory.CreateDbContext();

            return await dbContext.Sellers
                .Where(s => keys.Contains(s.Id))
                .ToDictionaryAsync(t => t.Id, cancellationToken);
        }
    }
}