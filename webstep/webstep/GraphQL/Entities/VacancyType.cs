using HotChocolate.Types;
using webstep.Models;

namespace webstep.GraphQL.Entities
{
    public class VacancyType : ObjectType<Vacancy>
    {
        protected override void Configure(IObjectTypeDescriptor<Vacancy> descriptor)
        {
            descriptor.Field(x => x.StartDate).Ignore();
            descriptor.Field(x => x.EndDate).Ignore();
        }
    }

    public record AddVacancyInput(bool Planned, decimal DaysOfWeek, WeekYear Start, WeekYear End, int ConsultantId);

#nullable enable
    public record EditVacancyInput(int Id, decimal? DaysOfWeek, bool? Planned, WeekYear? Start, WeekYear? End);

    public record DeleteVacancyInput(int Id);

    public record VacancyPayload(Vacancy Vacancy);
}