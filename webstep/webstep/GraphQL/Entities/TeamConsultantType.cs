using HotChocolate.Types;
using System.Web;
using webstep.Models;

namespace webstep.GraphQL.Entities
{
    public class TeamConsultantType : ObjectType<Team>
    {
        
    }

    public record AddTeamConsultantInput(int Id, Team team, Consultant consultant);
    #nullable enable
    public record EditTeamConsultantInput(int Id, Team team, Consultant consultant);
    public record DeleteTeamConsultantInput(int Id);

    public record TeamConsultantPayload(TeamConsultant TeamConsultant);


}