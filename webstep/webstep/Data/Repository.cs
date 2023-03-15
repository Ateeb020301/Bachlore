namespace webstep.Data
{
    using System;
    using System.Collections.Generic;
    using System.Threading;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using HotChocolate.Subscriptions;

    using Microsoft.EntityFrameworkCore;

    using webstep.GraphQL;
    using webstep.Interfaces;
    using webstep.Models;

    public class Repository : IRepository
    {
        private readonly ITopicEventSender _eventSender;
        private readonly IDbContextFactory<WebstepContext> _contextFactory;

        public Repository(ITopicEventSender eventSender, IDbContextFactory<WebstepContext> contextFactory)
        {
            _eventSender = eventSender;
            _contextFactory = contextFactory;
        }

        public IQueryable<T> SelectAll<T>() where T : class
        {
            var context = _contextFactory.CreateDbContext();
            return context.Set<T>();
        }

        public IQueryable<T> SelectSingle<T>(int id)
            where T : BaseModel
        {
            var context = _contextFactory.CreateDbContext();
            try
            {
                var entity = context.Set<T>().Where(x => x.Id == id);
                return entity;
            }
            catch (InvalidOperationException)
            {
                throw new NotFoundException() { Entity = typeof(T).Name, Id = id };
            }
        }

        public async Task<T> SelectByIdAsync<T>(int id, WebstepContext context, CancellationToken cancellationToken) where T : BaseModel
        {
            try
            {
                var entity = await context.Set<T>().FirstAsync(x => x.Id == id, cancellationToken)
                                 .ConfigureAwait(false);
                return entity;
            }
            catch (InvalidOperationException)
            {
                throw new NotFoundException() { Entity = typeof(T).Name, Id = id };
            }
        }

        public async Task CreateAsync<T>(T entity, WebstepContext context, CancellationToken cancellationToken) where T : class
        {
            await context.Set<T>().AddAsync(entity, cancellationToken).ConfigureAwait(false);
            try
            {
                await context.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
            }
            catch (DbUpdateException)
            {
                throw new InsertFailedException() { Entity = typeof(T).Name };
            }

            await _eventSender.SendAsync($"On{typeof(T).Name}Added", entity, cancellationToken).ConfigureAwait(false);
        }

        public async Task UpdateAsync<T>(T entity, WebstepContext context, CancellationToken cancellationToken) where T : BaseModel
        {
            context.Set<T>().Update(entity);
            try
            {
                await context.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
            }
            catch (DbUpdateException)
            {
                throw new UpdateFailedException() { Entity = typeof(T).Name, Id = entity.Id };
            }
            
            await _eventSender.SendAsync($"On{typeof(T).Name}Edited", entity, cancellationToken).ConfigureAwait(false);
        }

        public async Task DeleteAsync<T>(T entity, WebstepContext context, CancellationToken cancellationToken) where T : BaseModel
        {
            context.Set<T>().Remove(entity);

            try
            {
                await context.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
            }
            catch (DbUpdateException)
            {
                throw new DeleteFailedException() { Entity = typeof(T).Name, Id = entity.Id};
            }

            await _eventSender.SendAsync($"On{typeof(T).Name}Deleted", entity, cancellationToken).ConfigureAwait(false);
        }

        public Task SelectByIdAsync<T>(string customerId, WebstepContext context, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
