using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webstep.GraphQL.NodaTime.Helpers
{
    using System.Diagnostics.CodeAnalysis;

    using HotChocolate.Language;
    using HotChocolate.Types;

    public abstract class StringToStructBaseType<TRuntimeType> : ScalarType<TRuntimeType, StringValueNode>
        where TRuntimeType : struct
    {
        protected StringToStructBaseType(string name) : base(name, bind: BindingBehavior.Implicit)
        {
        }

#nullable enable
        public override IValueNode ParseResult(object? resultValue)
        {
            switch (resultValue)
            {
                case null:
                    return NullValueNode.Default;
                case string s:
                    return new StringValueNode(s);
                case TRuntimeType v:
                    return this.ParseValue(v);
                default:
                    throw new SerializationException(
                        $"Unable to deserialize string to {this.Name}",
                        this);
            }
        }
#nullable enable
        public override bool TrySerialize(object? runtimeValue, out object? resultValue)
        {
            switch (runtimeValue)
            {
                case null:
                    resultValue = null;
                    return true;
                case TRuntimeType dt:
                    resultValue = this.Serialize(dt);
                    return true;
                default:
                    resultValue = null;
                    return false;
            }
        }

        public override bool TryDeserialize(object? resultValue, out object? runtimeValue)
        {
            switch (resultValue)
            {
                case null:
                    runtimeValue = null;
                    return true;
                case string str when this.TryDeserialize(str, out TRuntimeType? val):
                    runtimeValue = val;
                    return true;
                default:
                    runtimeValue = null;
                    return false;
            }
        }

        protected abstract string Serialize(TRuntimeType baseValue);

        protected abstract bool TryDeserialize(string str, [NotNullWhen(true)] out TRuntimeType? output);

        protected override TRuntimeType ParseLiteral(StringValueNode literal)
        {
            if (TryDeserialize(literal.Value, out TRuntimeType? value))
            {
                return value.Value;
            }

            return new TRuntimeType();

            throw new SerializationException(
                $"Unable to deserialize string to {this.Name}",
                this);
        }

        protected override StringValueNode ParseValue(TRuntimeType value)
        {
            return new(Serialize(value));
        }
    }
}
