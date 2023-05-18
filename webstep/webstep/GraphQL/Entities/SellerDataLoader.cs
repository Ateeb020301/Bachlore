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
        private readonly WebstepContext _dbContext;

        public SellerDataLoader(
            IBatchScheduler batchScheduler,
            WebstepContext dbContext)
            : base(batchScheduler)
        {
            _dbContext = dbContext;
        }

        protected override async Task<IReadOnlyDictionary<int, Seller>> LoadBatchAsync(IReadOnlyList<int> keys, CancellationToken cancellationToken)
        {
            return await _dbContext.Sellers
                .Where(s => keys.Contains(s.Id))
                .ToDictionaryAsync(t => t.Id, cancellationToken);
        }
    }
}
