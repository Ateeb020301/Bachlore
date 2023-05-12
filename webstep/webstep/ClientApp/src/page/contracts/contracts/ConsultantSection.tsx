import React from "react";
import { ConsultantCapacityRow } from "./ConsultantCapacityRow";
import { ConsultantContractRowList } from "./ConsultantContractRowList";

interface ConsultantSectionProps {
  consultantId: number;
  showContracts: boolean;
}

// A section consists of both sidebar elements and timeline elements
export const ConsultantSection: React.FC<ConsultantSectionProps> = ({
  consultantId,
  showContracts,
}) => {
  return (
    <>
      <ConsultantCapacityRow consultantId={consultantId} />
      {showContracts && (
        <ConsultantContractRowList consultantId={consultantId} />
      )}
    </>
  );
};
