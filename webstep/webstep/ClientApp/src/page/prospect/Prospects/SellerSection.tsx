import { useQuery } from "@apollo/client";
import React from "react";
import { GetSellerProspectsPayload } from "../../../api/prospects/payloads";
import { GET_SELLER_PROSPECTS } from "../../../api/prospects/queries";
import { CalendarRow } from "../../CalendarSystem/CalendarRow";
import { CalendarSidebarHeader } from "../../CalendarSystem/CalendarSidebarHeader";
import { CalendarTimelineBlocker } from "../../CalendarSystem/CalendarTimelineBlocker";
import { CreateProspectButton } from "./CreateProspectButton";
import { ProspectDescription } from "./ProspectDescription";
import { SubProspectEvents } from "./SubProspectEvents";
import { v4 as uuidv4 } from "uuid";
import { Prospect } from "../../../logic/interfaces";

interface SellerSectionProps {
  id: number;
  name: string;
  showProspects: boolean;
}

export const SellerSection: React.FC<SellerSectionProps> = ({
  id,
  name,
  showProspects,
}) => {
  const { loading, error, data } = useQuery<GetSellerProspectsPayload>(
    GET_SELLER_PROSPECTS,
    {
      variables: { id: id },
      pollInterval: 3000,
    }
  );

  return (
    <>
      <CalendarRow
        sidebarContent={
          <CalendarSidebarHeader header={name}>
            <CreateProspectButton sellerId={id} customerId={id} />
          </CalendarSidebarHeader>
        }
        timelineContent={<CalendarTimelineBlocker />}
        key={uuidv4()}
      />
      {showProspects &&
        data &&
        data.seller[0].prospects.map(
          (prospect) =>
            prospect.subProspects.length > 0 && (
              <CalendarRow
                sidebarContent={
                  <ProspectDescription prospect={prospect} sellerId={id} />
                }
                timelineContent={
                  <SubProspectEvents
                    subProspects={prospect.subProspects}
                    sellerId={id}
                    prospectId={prospect.id}
                    key={uuidv4()}
                  />
                }
                key={uuidv4()}
              />
            )
        )}
    </>
  );
};
