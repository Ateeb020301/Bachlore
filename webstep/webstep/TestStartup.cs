using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using webstep.Data;
using webstep.Interfaces;
using EntityFrameworkCore.SqlServer.NodaTime.Extensions;
using webstep.GraphQL.NodaTime.Extensions;

namespace webstep
{
    public class TestStartup : Startup
    {
        public TestStartup(IConfiguration configuration) : base(configuration)
        {
        }

        protected override void ConfigureDatabase(IServiceCollection services)
        {
            services.AddTransient<IRepository, Repository>();

            services.AddPooledDbContextFactory<WebstepContext>(options =>
            {
                options.UseInMemoryDatabase("TestDb");
            });
        }
    }

}
