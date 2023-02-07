using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webstep.GraphQL.NodaTime.Extensions
{
    using HotChocolate;

    using webstep.GraphQL.NodaTime.Types;

    public static class SchemaBuilderExtensions
    {
        public static ISchemaBuilder AddNodaTime(this ISchemaBuilder schemaBuilder)
        {
            return schemaBuilder
                .AddType<LocalDateType>();
        }
    }
}
