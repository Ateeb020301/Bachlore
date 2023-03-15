namespace webstep.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;


    using webstep.Data;
    using webstep.Models;

    public interface IRepository
    {
        IQueryable<T> SelectAll<T>() 
            where T : class;

        Task<T> SelectByIdAsync<T>(int id, WebstepContext context, CancellationToken cancellationToken) 
            where T : BaseModel;

        public IQueryable<T> SelectSingle<T>(int id)
            where T : BaseModel;

        Task CreateAsync<T>(T entity, WebstepContext context, CancellationToken cancellationToken)
            where T : class;

        Task UpdateAsync<T>(T entity, WebstepContext context, CancellationToken cancellationToken)
            where T : BaseModel;

        Task DeleteAsync<T>(T entity, WebstepContext context, CancellationToken cancellationToken)
            where T : BaseModel;
        Task SelectByIdAsync<T>(string customerId, WebstepContext context, CancellationToken cancellationToken);
    }
}
