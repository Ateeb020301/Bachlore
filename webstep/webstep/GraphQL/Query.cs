﻿using System;
using System.Collections;
using System.Collections.Generic;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ILogger = Microsoft.Extensions.Logging.ILogger;

namespace webstep.GraphQL
{
    using System.Linq;
    using System.Reflection.Metadata;
    using System.Security.Cryptography.X509Certificates;
    using global::NodaTime;
    using global::NodaTime.Calendars;

    using HotChocolate;
    using HotChocolate.Data;

    using webstep.Data;
    using webstep.Interfaces;
    using webstep.Models;

    public class Query
    {
        private readonly IRepository _repo;
        private readonly Forecast _forecast;
        private readonly ILogger _logger;


        public Query(IRepository repo, ILogger<Query> logger)
        {
            _repo = repo;
            _forecast = new Forecast(repo);
            _logger = logger;
        }

        /// <summary>
        /// Fetches all sellers
        /// </summary>
        /// <returns></returns>
        [UseOffsetPaging(MaxPageSize = 80), UseProjection, UseSorting]
        public IQueryable<Seller> GetSellers(LocalDate? date) => date == null ? _repo.SelectAll<Seller>() : _repo.SelectAll<Seller>().Where(x => x.EmploymentDate <= date && (x.ResignationDate >= date || x.ResignationDate == null));

        /// <summary>
        /// Fetches a single seller
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [UseProjection]
        public IQueryable<Seller> GetSeller(int id) => this._repo.SelectSingle<Seller>(id);

        /// <summary>
        /// Fetches all customer
        /// </summary>
        /// <returns></returns>
        [UseOffsetPaging(MaxPageSize = 50), UseProjection, UseSorting]
        public IQueryable<Customer> GetCustomers() => this._repo.SelectAll<Customer>();

        /// <summary>
        /// Fetches a single customer
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [UseProjection]
        public IQueryable<Customer> GetCustomer(
            int id) => this._repo.SelectSingle<Customer>(id);

        /// <summary>
        /// Fetches all consultants
        /// </summary>
        /// <returns></returns>
        [UseOffsetPaging(MaxPageSize = 50), UseProjection, UseSorting]
        public IQueryable<Consultant> GetConsultants(LocalDate? date) => 
            date == null ? _repo.SelectAll<Consultant>() : _repo.SelectAll<Consultant>().Where(x => x.EmploymentDate <= date && (x.ResignationDate >= date || x.ResignationDate == null));
        
        /// <summary>
        /// Fetches a single consultant
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [UseProjection]
        public IQueryable<Consultant> GetConsultant(int id) => this._repo.SelectSingle<Consultant>(id);

        /// <summary>
        /// Fetches all contracts
        /// </summary>
        /// <returns></returns>
        [UseOffsetPaging(MaxPageSize = 250), UseProjection, UseSorting]
        public IQueryable<Contract> GetContracts() => this._repo.SelectAll<Contract>();

        /// <summary>
        /// Fetches all action
        /// </summary>
        /// <returns></returns>
        [UseOffsetPaging(MaxPageSize = 250), UseProjection, UseSorting]
        public IQueryable<Action> GetActions() => this._repo.SelectAll<Action>();

        /// <summary>
        /// Fetches a single contract
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [UseProjection]
        public IQueryable<Contract> GetContract(
            int id) => this._repo.SelectSingle<Contract>(id);

        /// <summary>
        /// Fetches all financials,
        /// </summary>
        /// <returns></returns>
        [UseProjection, UseFiltering, UseSorting]
        public IEnumerable<Financial> GetAllFinancials() => _repo.SelectAll<Financial>();

        /// <summary>
        /// Fetches a single financial record
        /// </summary>
        /// <param name="year"></param>
        /// <returns></returns>
        [UseProjection, UseFiltering, UseSorting]
        public IEnumerable<Financial> GetFinancial(
            int year)
        {
            var financials =_repo.SelectAll<Financial>().Where(x => x.Year == year).ToList();

            return Financial.Accumulate(financials);
        } 

        /// <summary>
        /// Fetches all prospects
        /// </summary>
        /// <returns></returns>
        [UseOffsetPaging(MaxPageSize = 150), UseProjection, UseSorting]
        public IQueryable<Prospect> GetProspects() => this._repo.SelectAll<Prospect>();


        /// <summary>
        /// Fetche all activitylog
        /// </summary>
        /// <returns></returns>
        [UseOffsetPaging(MaxPageSize = 150), UseProjection, UseSorting]
        public IQueryable<ActivityLog> GetActivitylog() => this._repo.SelectAll<ActivityLog>();

        /// <summary>
        /// Fetches a single prospect
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [UseProjection]
        public IQueryable<Prospect> GetProspect(int id) => this._repo.SelectSingle<Prospect>(id);

        /// <summary>
        /// Fetches all subprospects
        /// </summary>
        /// <returns></returns>
        [UseOffsetPaging(MaxPageSize = 250), UseProjection, UseSorting]
        public IQueryable<SubProspect> GetSubProspects() => _repo.SelectAll<SubProspect>();

        /// <summary>
        /// Fetches a single subprospect
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [UseProjection]
        public IQueryable<SubProspect> GetSubProspect(int id) => this._repo.SelectSingle<SubProspect>(id);

        /// <summary>
        /// Fetches a single Project
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [UseProjection]                                                                  
        public IQueryable<Project> GetProject(int id)
        {
            return this._repo.SelectSingle<Project>(id);
        }

        /// <summary>
        /// Fetches a single ProjectConsultant
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [UseProjection]
        public IQueryable<ProjectConsultant> GetProjectConsultant(int id) => this._repo.SelectSingle<ProjectConsultant>(id);

        /// <summary>
        /// Fetches all ProjectConsultant
        /// </summary>
        /// <returns></returns>
        [UseProjection]
        public IQueryable<Project> GetProjectConsultants(int id)
        {
            var contracts = _repo.SelectAll<Contract>().Where(x => x.Consultant.Id == id);
            var project = _repo.SelectAll<Project>();
            var values = contracts.Select(x => x.Project).ToList();

            return project.Select(x => x).Where(p => values.Contains(p)).Include("Contracts");
        }

        /// <summary>
        /// Fetches all Projects
        /// </summary>
        /// <returns></returns>
        [UseOffsetPaging(MaxPageSize = 20), UseProjection]
        public IQueryable<Project> GetProjects() => _repo.SelectAll<Project>();
        
        /// <summary>
        /// Fetches all vacancies
        /// </summary>
        /// <returns></returns>
        [UseOffsetPaging(MaxPageSize = 250), UseProjection, UseSorting]
        public IQueryable<Vacancy> GetVacancies() => this._repo.SelectAll<Vacancy>();

        /// <summary>
        /// Fetches a single vacancy
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [UseProjection]
        public IQueryable<Vacancy> GetVacancy(int id) => this._repo.SelectSingle<Vacancy>(id);

        [UseProjection]
        public IQueryable<Consultant> GetConsInTeams()
        {
            var consultant = _repo.SelectAll<Consultant>();

            var projectConsultants = _repo.SelectAll<ProjectConsultant>();
            var values = projectConsultants.Select(z => z.Consultant).ToList();

            return consultant.Select(x => x).Where(p => values.Contains(p));
        }

        /// <summary>
        /// Fetches one or more consultants and calculates their free time
        /// </summary>
        /// <param name="endYear"></param>
        /// <param name="startYear"></param>
        /// <param name="consultantId"></param>
        /// <returns></returns>
        [GraphQLDescription("Fetches a consultant and calculates their contract time, returned as days per week busy")]
        [UseOffsetPaging(MaxPageSize = 20), UseProjection]
        public IQueryable<ConsultantCapacity> GetConsultantsCapacity(int startYear, int? endYear, int? consultantId)
        {
            endYear ??= startYear;
            var consultants = consultantId.HasValue ? _repo.SelectSingle<Consultant>((int)consultantId).Include(x => x.Contracts).ToList() : _repo.SelectAll<Consultant>().Include(x => x.Contracts).ToList();
            
            return consultants.Select(consultant => consultant.CalculateCapacity(startYear, endYear)).AsQueryable();
        }

        public decimal GetContractBillable(int week, int year)
        {
            var contracts = _forecast.GetContracts(year, week);
            var consultants = _forecast.GetConsultants(year, week);
            try
            {
                return Forecast.CalculateContracts(contracts, consultants);
            }
            catch (Exception)
            {
                _logger.LogCritical($"MSG-0001 Calculate contracts function failed in Query.cs #{DateTime.Now.ToString()}");
                throw;
            }
        }

        public decimal GetContractForecast(int week, int year)
        {
            var subProspects = _forecast.GetSubProspects(year, week);
            var contracts = _forecast.GetContracts(year, week);
            var consultants = _forecast.GetConsultants(year, week);
            
            try
            {
                return Forecast.CalculateForecast(contracts, consultants, subProspects);
            }
            catch (Exception)
            {
                _logger.LogCritical($"MSG-0002 Calculate forecast function failed in Query.cs #{DateTime.Now.ToString()}");
                throw;
            }
        }
    }
}