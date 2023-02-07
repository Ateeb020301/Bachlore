namespace webstep.GraphQL.NodaTime.Types
{
    using System.Diagnostics.CodeAnalysis;
    using System.Globalization;

    using global::NodaTime;
    using global::NodaTime.Text;

    using webstep.GraphQL.NodaTime.Extensions;
    using webstep.GraphQL.NodaTime.Helpers;

    public class LocalDateType : StringToStructBaseType<LocalDate>
    {
        public LocalDateType() : base("LocalDate")
        {
        }

        protected override string Serialize(LocalDate baseValue)
            => LocalDatePattern.Iso
                .WithCulture(CultureInfo.InvariantCulture)
                .Format(baseValue);

        protected override bool TryDeserialize(string str, [NotNullWhen(true)] out LocalDate? output)
            => LocalDatePattern.Iso
                .WithCulture(CultureInfo.InvariantCulture)
                .TryParse(str, out output);
    }
}
