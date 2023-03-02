using HotChocolate.Types;
using System.Web;
using webstep.Models;

namespace webstep.GraphQL.Entities
{
    public class TeamType : ObjectType<Team>
    {
        
    }

    public record AddTeamInput(int Id, string TeamName);
    #nullable enable
    public record EditTeamInput(int Id, string TeamName);
    public record DeleteTeamInput(int Id);

    public record TeamPayload(Team Team);


}