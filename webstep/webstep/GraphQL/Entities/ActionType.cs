namespace webstep.GraphQL.Entities
{
    using HotChocolate;
    using HotChocolate.Types;
    using System.ComponentModel.DataAnnotations;
    using global::NodaTime;
    using webstep.Models;

    public class ActionType : ObjectType<Action>
    {
        protected override void Configure(IObjectTypeDescriptor<Action> descriptor)
        {
          
        }
    }

    public record AddActionInput
    {
        [Required] public string Comment { get; set; }

        [Required] public int CustomerId { get; set; }

        [Required]
        public LocalDate Date { get; set; }

    }
#nullable enable
    public record EditActionInput(int Id, string? Comment, int? CustomerId);
    public record DeleteActionInput(int Id);
    public record ActionPayload(Action Action);
}
