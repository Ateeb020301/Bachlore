namespace webstep.GraphQL
{
    using HotChocolate;
    using HotChocolate.Types;
    using webstep.Models;

    /// <summary>
    /// Includes subscriptions for all database entities
    /// </summary>
    public class Subscription
    { 
        [Subscribe, Topic]
        public Seller OnSellerAdded([EventMessage] Seller seller) => seller;
        [Subscribe, Topic]
        public Seller OnSellerEdited([EventMessage] Seller seller) => seller;
        [Subscribe, Topic]
        public Seller OnSellerDeleted([EventMessage] Seller seller) => seller;

        [Subscribe, Topic]
        public Prospect OnProspectAdded([EventMessage] Prospect prospect) => prospect;
        [Subscribe, Topic]
        public Prospect OnProspectEdited([EventMessage] Prospect prospect) => prospect;
        [Subscribe, Topic]
        public Prospect OnProspectDeleted([EventMessage] Prospect prospect) => prospect;

        [Subscribe, Topic]
        public SubProspect OnSubProspectAdded([EventMessage] SubProspect subProspect) => subProspect;
        [Subscribe, Topic]
        public SubProspect OnSubProspectEdited([EventMessage] SubProspect subProspect) => subProspect;
        [Subscribe, Topic]
        public SubProspect OnSubProspectDeleted([EventMessage] SubProspect subProspect) => subProspect;

        [Subscribe, Topic]
        public Consultant OnConsultantAdded([EventMessage] Consultant consultant) => consultant;
        [Subscribe, Topic]
        public Consultant OnConsultantEdited([EventMessage] Consultant consultant) => consultant;
        [Subscribe, Topic]
        public Consultant OnConsultantDeleted([EventMessage] Consultant consultant) => consultant;

        [Subscribe, Topic]
        public Contract OnContractAdded([EventMessage] Contract contract) => contract;
        [Subscribe, Topic]
        public Contract OnContractEdited([EventMessage] Contract contract) => contract;
        [Subscribe, Topic]
        public Contract OnContractDeleted([EventMessage] Contract contract) => contract;
        
        [Subscribe, Topic]
        public Financial OnFinancialAdded([EventMessage] Financial financial) => financial;
        [Subscribe, Topic]
        public Financial OnFinancialEdited([EventMessage] Financial financial) => financial;
        [Subscribe, Topic]
        public Financial OnFinancialDeleted([EventMessage] Financial financial) => financial;

    }
}
