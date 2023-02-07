using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webstep.GraphQL.NodaTime.Extensions
{
    using global::NodaTime.Text;

    internal static class PatternExtensions
    {
        public static bool TryParse<NodaTimeType>(this IPattern<NodaTimeType> pattern, string text, out NodaTimeType? output)
            where NodaTimeType : struct
        {
            var result = pattern.Parse(text);
            if (result.Success)
            {
                output = result.Value;
                return true;
            }
            else
            {
                output = null;
                return false;
            }
        }
    }
}
