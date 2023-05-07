using System.Collections.Immutable;
using Microsoft.EntityFrameworkCore;
using webstep.Models;

namespace webstep.Data
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Security.Cryptography.X509Certificates;
    using System.Threading;
    using System.Threading.Tasks;

    using NodaTime;
    using NodaTime.Extensions;

    public class WebstepContext : DbContext
    {
        public WebstepContext(DbContextOptions<WebstepContext> options)
            : base(options)
        {
        }

        public DbSet<Consultant> Consultants { get; set; }
        
        public DbSet<Project> Projects { get; set; }

        public DbSet<Contract> Contracts { get; set; }

        public DbSet<Prospect> Prospects { get; set; }
    
        public DbSet<SubProspect> SubProspects { get; set; }

        public DbSet<Seller> Sellers { get; set; }

        public DbSet<Financial> Financials { get; set; }
        
        public DbSet<Vacancy> Vacancies { get; set; }

        public DbSet<Customer> Customers { get; set; }

        public DbSet<ProjectConsultant> ProjectConsultants { get; set; }

        public DbSet<Models.Action> Actions { get; set; }

        public DbSet<ActivityLog> ActivityLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            ProjectTable(modelBuilder);
            SellerTable(modelBuilder);
            ConsultantTable(modelBuilder);
            ContractTable(modelBuilder);
            ProspectTable(modelBuilder);
            SubProspectTable(modelBuilder);
            FinancialTable(modelBuilder);
            VacancyTable(modelBuilder);
            CustomerTable(modelBuilder);
            ProjectConsultantTable(modelBuilder);
            ActionTable(modelBuilder);
            ActivityLog(modelBuilder);
        }


        private void FinancialTable(ModelBuilder builder)
        {
            builder.Entity<Financial>()
               .HasIndex(i => new { i.Year, i.Month })
               .IsUnique(true);

            builder.Entity<Financial>().Property<bool>("isDeleted");
            builder.Entity<Financial>().HasQueryFilter(m => EF.Property<bool>(m, "isDeleted") == false);

        }
        
        private void CustomerTable(ModelBuilder builder)
        {
            builder.Entity<Customer>().ToTable("Customers");
            builder.Entity<Customer>().Property<bool>("isDeleted");
            builder.Entity<Customer>().HasQueryFilter(m => EF.Property<bool>(m, "isDeleted") == false);
        }

        private void ProjectConsultantTable(ModelBuilder builder)
        {
            builder.Entity<ProjectConsultant>().ToTable("ProjectConsultants");
            builder.Entity<ProjectConsultant>().Property<bool>("isDeleted");
            builder.Entity<ProjectConsultant>().HasQueryFilter(m => EF.Property<bool>(m, "isDeleted") == false);
        }

        private void ProjectTable(ModelBuilder builder) 
        {
            builder.Entity<Project>().ToTable("Project");
            builder.Entity<Project>().Property<bool>("isDeleted");
            builder.Entity<Project>().HasQueryFilter(m => EF.Property<bool>(m, "isDeleted") == false);
        } 

        private void ProspectTable(ModelBuilder builder) 
        {
            builder.Entity<Prospect>().ToTable("Prospect");
            builder.Entity<Prospect>().Property<bool>("isDeleted");
        }

        private void SubProspectTable(ModelBuilder builder)
        {
            DateTimeZone zone = DateTimeZoneProviders.Tzdb["Europe/London"];
            ZonedClock clock = SystemClock.Instance.InZone(zone);
            builder.Entity<SubProspect>().ToTable("SubProspect");
            builder.Entity<SubProspect>().Property<bool>("isDeleted");

            builder.Entity<SubProspect>().Property<int>(x => x.StartWeek).HasComputedColumnSql("Datepart(isowk, [StartDate])");
            builder.Entity<SubProspect>().Property<int>(x => x.StartYear).HasComputedColumnSql("Datepart(YEAR, [StartDate])");
            builder.Entity<SubProspect>().Property<int>(x => x.EndWeek).HasComputedColumnSql("Datepart(isowk, [EndDate])");
            builder.Entity<SubProspect>().Property<int>(x => x.EndYear).HasComputedColumnSql("Datepart(YEAR, [EndDate])");

            builder.Entity<SubProspect>().Property(x => x.NumOfConsultants).HasColumnType("decimal(18,2)");
            
            builder.Entity<SubProspect>()
                .HasQueryFilter(m => EF.Property<bool>(m, "isDeleted") == false &&
                                     m.EndDate >= clock.GetCurrentDate());
        }

        private void ContractTable(ModelBuilder builder)
        {
            DateTimeZone zone = DateTimeZoneProviders.Tzdb["Europe/London"];
            ZonedClock clock = SystemClock.Instance.InZone(zone);
            Period period = Period.FromMonths(1);
            
            builder.Entity<Contract>().ToTable("Contract");

            builder.Entity<Contract>().Property<int>(x => x.StartWeek).HasComputedColumnSql("Datepart(isowk, [StartDate])");
            builder.Entity<Contract>().Property<int>(x => x.StartYear).HasComputedColumnSql("Datepart(YEAR, [StartDate])");
            builder.Entity<Contract>().Property<int>(x => x.EndWeek).HasComputedColumnSql("Datepart(isowk, [EndDate])");
            builder.Entity<Contract>().Property<int>(x => x.EndYear).HasComputedColumnSql("Datepart(YEAR, [EndDate])");

            builder.Entity<Contract>().Property<bool>("isDeleted");
            builder.Entity<Contract>()
                .HasQueryFilter(m => EF.Property<bool>(m, "isDeleted") == false && 
                                     m.EndDate >= clock.GetCurrentDate().Minus(period));
            builder.Entity<Contract>().Property(x => x.DaysOfWeek).HasColumnType("decimal(18,2)");
        }

        private void ConsultantTable(ModelBuilder builder)
        {
            DateTimeZone zone = DateTimeZoneProviders.Tzdb["Europe/London"];
            ZonedClock clock = SystemClock.Instance.InZone(zone);
            
            builder.Entity<Consultant>()
                .ToTable("Consultant");
            builder.Entity<Consultant>().Property<bool>("isDeleted");
            builder.Entity<Consultant>().HasQueryFilter(m => EF.Property<bool>(m, "isDeleted") == false && m.EmploymentDate <= clock.GetCurrentDate() && (m.ResignationDate >= clock.GetCurrentDate() || m.ResignationDate == null));
        }

        private void SellerTable(ModelBuilder builder)
        {
            builder.Entity<Seller>()
                .HasIndex(i => i.NameIdentifier)
                .IsUnique(true);

            builder.Entity<Seller>()
                .ToTable("Seller");
            
            DateTimeZone zone = DateTimeZoneProviders.Tzdb["Europe/London"];
            ZonedClock clock = SystemClock.Instance.InZone(zone);
            
            builder.Entity<Seller>().Property<bool>("isDeleted");
            builder.Entity<Seller>().HasQueryFilter(m => EF.Property<bool>(m, "isDeleted") == false && m.EmploymentDate <= clock.GetCurrentDate() && (m.ResignationDate >= clock.GetCurrentDate() || m.ResignationDate == null));

        }

        public void VacancyTable(ModelBuilder builder)
        {
            DateTimeZone zone = DateTimeZoneProviders.Tzdb["Europe/London"];
            ZonedClock clock = SystemClock.Instance.InZone(zone);
            builder.Entity<Vacancy>().ToTable("Vacancy");

            builder.Entity<Vacancy>().Property<int>(x => x.StartWeek).HasComputedColumnSql("Datepart(isowk, [StartDate])");
            builder.Entity<Vacancy>().Property<int>(x => x.StartYear).HasComputedColumnSql("Datepart(YEAR, [StartDate])");
            builder.Entity<Vacancy>().Property<int>(x => x.EndWeek).HasComputedColumnSql("Datepart(isowk, [EndDate])");
            builder.Entity<Vacancy>().Property<int>(x => x.EndYear).HasComputedColumnSql("Datepart(YEAR, [EndDate])");

            
            builder.Entity<Vacancy>().Property(x => x.DaysOfWeek).HasColumnType("decimal(18,2)");
            builder.Entity<Vacancy>().Property<bool>("isDeleted");
            builder.Entity<Vacancy>()
                .HasQueryFilter(m => EF.Property<bool>(m, "isDeleted") == false &&
                                     m.EndDate >= clock.GetCurrentDate());
        }

        private void ActionTable(ModelBuilder builder)
        {
            builder.Entity<Models.Action>().ToTable("Actions");
            builder.Entity<Models.Action>().Property<bool>("isDeleted");
            builder.Entity<Models.Action>().HasQueryFilter(m => EF.Property<bool>(m, "isDeleted") == false);
        }
        private void ActivityLog(ModelBuilder builder)
        {
            builder.Entity<ActivityLog>().ToTable("ActivityLogs");
            builder.Entity<ActivityLog>().Property<bool>("isDeleted");
            builder.Entity<ActivityLog>().HasQueryFilter(m => EF.Property<bool>(m, "isDeleted") == false);
        }

        public override int SaveChanges()
        {
            this.UpdateSoftDeleteStatuses();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
        {
            this.UpdateSoftDeleteStatuses();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        private void UpdateSoftDeleteStatuses()
        {
            foreach (var entry in this.ChangeTracker.Entries())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.CurrentValues["isDeleted"] = false;
                        break;
                    case EntityState.Deleted:
                        entry.State = EntityState.Modified;
                        entry.CurrentValues["isDeleted"] = true;
                        break;
                }
            }
        }

    }
}
