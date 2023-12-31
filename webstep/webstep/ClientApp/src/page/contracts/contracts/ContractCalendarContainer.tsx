import { useQuery } from "@apollo/client";
import { Calendar } from "../../CalendarSystem/Calendar";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  GetConsultantIDsPayload,
  GetProjectConsultantIDS,
} from "../../../api/contract/payloads";
import {
  GET_CONSULTANT_IDS,
  GET_PROJECTCONSULTANT_IDS,
} from "../../../api/contract/queries";
import { ConsultantSection } from "./ConsultantSection";

export const ContractCalendarContainer = () => {
  const { loading, error, data } = useQuery<GetProjectConsultantIDS>(
    GET_PROJECTCONSULTANT_IDS
  );

  return (
    <Calendar
      title={"Consultants"}
      render={(b: boolean) =>
        data?.consInTeams.map((consultant: any) => {
          return (
            <ConsultantSection
              consultantId={consultant.id}
              showContracts={b}
              key={uuidv4()}
            />
          );
        })
      }
    ></Calendar>
  );
};
