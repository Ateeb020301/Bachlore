namespace webstep.GraphQL
{
    using System;
    using System.Diagnostics.CodeAnalysis;

    using HotChocolate;

    using Microsoft.CodeAnalysis;
    using Microsoft.VisualBasic;

    /// <summary>
    /// The graphQL error filter.
    /// </summary>
    public class GraphQlErrorFilter : IErrorFilter
    {
        public IError OnError(IError error)
        {
            return error.Exception switch
            {
                NotFoundException notFound => error.WithMessage($"{notFound.Entity} with id {notFound.Id} not found"),

                ProbabilityOutOfBoundsException probabilityException => error.WithMessage(
                    $"Invalid value for probability, valid values are {String.Join(", ", probabilityException.Probability)}"),

                StartDateGreaterThanEndDateException => error.WithMessage("Start date can't be greater than end date"),
                
                EmploymentDateGreaterThanResignationDateException => error.WithMessage("Employment date can't be greater than resignation date"),
                
                InsertFailedException insertFailed => error.WithMessage($"Failed to insert {insertFailed.Entity}"),

                UpdateFailedException updateFailed => error.WithMessage($"Failed to update {updateFailed.Entity} with ID: {updateFailed.Id}"),

                DeleteFailedException deleteFailed => error.WithMessage($"Failed to delete {deleteFailed.Entity} with ID: {deleteFailed.Id}"),

                ParentObjectNullException parentNull => error.WithMessage($"Object's parent of type {parentNull.Entity} is required and cannot be null"),

                NegativeNumberException negativeNumber => error.WithMessage($"{negativeNumber.Field} cannot be less than 0"),

                RequiredFieldNullException requiredFieldNull => error.WithMessage($"{requiredFieldNull.Field} is a required field and can't be null"),

                InvalidDateException => error.WithMessage("Invalid week or year argument"),

                _ => error.WithMessage("Something went wrong")
            };
        }
    }

    public class GraphQlException : Exception
    {
        public string Entity { get; internal set; }
        public int Id { get; internal set; }
    }

    public class NotFoundException : GraphQlException { }

    public class InsertFailedException : Exception { public string Entity { get; internal set; } }
    public class UpdateFailedException : GraphQlException { }

    public class DeleteFailedException : GraphQlException { }

    public class StartDateGreaterThanEndDateException : Exception { }
    public class EmploymentDateGreaterThanResignationDateException : Exception { }

    public class ProbabilityOutOfBoundsException : Exception { public int[] Probability { get; internal set; } }

    public class ParentObjectNullException : Exception { public string Entity { get; internal set; } }

    public class NegativeNumberException : Exception { public string Field { get; internal set; } }

    public class RequiredFieldNullException : Exception { public string Field { get; internal set; } }

    public class InvalidDateException : Exception { }

}
