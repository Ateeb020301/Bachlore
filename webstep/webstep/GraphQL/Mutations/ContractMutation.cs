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
    using global::NodaTime;
    using global::NodaTime.Calendars;
    using Microsoft.VisualBasic;
    using webstep.Interfaces;

    [ExtendObjectType(Name = nameof(Mutation))]
    public class ContractMutation
    {
        private readonly IRepository _repo;

        public ContractMutation(IRepository repo)
        {
            _repo = repo;
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<ContractPayload> AddContractAsync(
            AddContractInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var project = await _repo.SelectByIdAsync<Project>(input.ProjectId, context, cancellationToken)
                .ConfigureAwait(false);
            var consultant = await _repo.SelectByIdAsync<Consultant>(input.ConsultantId, context, cancellationToken)
                .ConfigureAwait(false);
            
            var rule = WeekYearRules.Iso;
            var contract = new Contract
            {
                Project = project,
                Consultant = consultant,
                DaysOfWeek = input.DaysOfWeek,
                HourlyRate = input.HourlyRate
            };

            var activitylog = new ActivityLog {
                Type = "Contract",
                Method = "Insert",
            };

            try
            {
                contract.StartDate = rule.GetLocalDate(input.Start.Year, input.Start.Week, IsoDayOfWeek.Monday);
                contract.EndDate = rule.GetLocalDate(input.End.Year, input.End.Week, IsoDayOfWeek.Friday);
                activitylog.NewValues = "[" + input.DaysOfWeek + ", " + input.HourlyRate + ", " + contract.StartDate + ", " + contract.EndDate + project.ProjectName + ", " + consultant.FirstName + " " + consultant.LastName +  "]";
            }
            catch (ArgumentOutOfRangeException)
            {
                throw new InvalidDateException();
            }

            contract.Validate();

            await _repo
                .CreateAsync(contract, context, cancellationToken)
                .ConfigureAwait(false);

            return new ContractPayload(contract);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<ContractPayload> EditContractAsync(
            EditContractInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var rule = WeekYearRules.Iso;
            var contract = await _repo
                .SelectByIdAsync<Contract>(input.Id, context, cancellationToken)
                .ConfigureAwait(false);
            var activitylog = new ActivityLog
            {
                Type = "Contract",
                Method = "Update",
                OldValues = "[" + contract.DaysOfWeek + ", " + contract.HourlyRate + ", " + contract.StartYear + "-" + rule.GetLocalDate(contract.StartYear, contract.StartWeek, IsoDayOfWeek.Monday).Month + "-" + rule.GetLocalDate(contract.StartYear, contract.StartWeek, IsoDayOfWeek.Monday).Day + ", " + contract.EndYear + "-" + rule.GetLocalDate(contract.EndYear, contract.EndWeek, IsoDayOfWeek.Friday).Month + "-" + rule.GetLocalDate(contract.EndYear, contract.EndWeek, IsoDayOfWeek.Friday).Day + "]"
            };

            contract.DaysOfWeek = input.DaysOfWeek ?? contract.DaysOfWeek;
            contract.HourlyRate = input.HourlyRate ?? contract.HourlyRate;

            try
            {
                if (input.Start != null)
                {
                    contract.StartDate = rule.GetLocalDate(input.Start.Year, input.Start.Week, IsoDayOfWeek.Monday);
                   
                }

                if (input.End != null)
                {
                    contract.EndDate = rule.GetLocalDate(input.End.Year, input.End.Week, IsoDayOfWeek.Friday);
                    
                }
                activitylog.NewValues = "[" + input.DaysOfWeek + ", " + input.HourlyRate + ", " + contract.StartDate + ", " + contract.EndDate + "]";

            }
            catch (ArgumentOutOfRangeException)
            {
                throw new InvalidDateException();
            }

            contract.Validate();

            await _repo.UpdateAsync(contract, context, cancellationToken).ConfigureAwait(false);
            await _repo.CreateAsync(activitylog, context, cancellationToken)
                    .ConfigureAwait(false);

            return new ContractPayload(contract);
        }

        [UseDbContext(typeof(WebstepContext))]
        public async Task<ContractPayload> DeleteContractAsync(
            DeleteContractInput input,
            [ScopedService] WebstepContext context,
            CancellationToken cancellationToken)
        {
            var contract = await _repo
                               .SelectByIdAsync<Contract>(input.Id, context, cancellationToken)
                               .ConfigureAwait(false);

            var activitylog = new ActivityLog
            {
                Type = "Contract",
                Method = "Delete",
                OldValues = "[" + contract.DaysOfWeek + ", " + contract.HourlyRate + ", " + contract.StartDate + ", " + contract.EndDate + "]"
            };

            await _repo.DeleteAsync(contract, context, cancellationToken)
                               .ConfigureAwait(false);
            await _repo.CreateAsync(activitylog, context, cancellationToken)
                .ConfigureAwait(false);

            return new ContractPayload(contract);
        }
    }
}
