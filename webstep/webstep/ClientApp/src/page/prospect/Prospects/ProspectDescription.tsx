import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { EditProspectInput } from "../../../api/prospects/inputs";
import { EditProspectPayload } from "../../../api/prospects/payloads";
import {
  EDIT_PROSPECT,
  GET_SELLER_PROSPECTS,
} from "../../../api/prospects/queries";
import { Customer, Prospect, SubProspect } from "../../../logic/interfaces";
import { defaultMessagePlacement } from "../../../logic/toast";
import { EditableField } from "../../Utils/EditableField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GET_CUSTOMERS } from "../../../api/customer";
import { GET_ACTIVITYLOG } from "../../../api/activitylog";

interface ProspectDescriptionProps {
  prospect: Prospects;
  sellerId: number;
}
export interface Prospects {
  id: number;
  projectName: string;
  customer: Customer;
  subProspects: SubProspect[];
}

const contentStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderRight: "1px solid",
  padding: "0px 15px 0px 15px",
  height: "100%",
  fontSize: 12,
  backgroundImage: "linear-gradient(to right, white , #f8f9f9)",
  overflow: "hidden",
  boxsizing: "content-box",
};

const centeredSpan = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
};
//GQL pagination skip const
const skipAmount = 0;
//GQL pagination take const
const takeAmount = 50;

export const ProspectDescription: React.FC<ProspectDescriptionProps> = ({
  prospect,
  sellerId,
}) => {
  const [editProspect] = useMutation<
    EditProspectPayload,
    { input: EditProspectInput }
  >(EDIT_PROSPECT, {
    refetchQueries: [
      {
        query: GET_SELLER_PROSPECTS,
        variables: { id: sellerId },
      },
      {
        query: GET_ACTIVITYLOG,
      },
    ],
    awaitRefetchQueries: true,
  });

  const editFunctionWrapper = (p: Prospect) => {
    let input: EditProspectInput = { id: p.id, projectName: p.projectName };
    editProspect({ variables: { input: input } })
      .then((res) => {
        toast.success("Prospektet ble redigert", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch((e) => {
        toast.error("Noe gikk galt ved redigering av prospektet", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
  return (
    <div style={contentStyle}>
      <div>
        <span style={centeredSpan}>Kunde:</span>
        <span style={centeredSpan}>
          <EditableField
            objectToEdit={prospect.customer}
            fieldName={"firstName"}
            fieldToEdit={prospect.customer.firstName}
            editCallBack={editFunctionWrapper}
            width={70}
          />
        </span>
      </div>

      <div>
        <span style={centeredSpan}>Prosjekt:</span>
        <span style={{ display: "flex", width: "150px" }}>
          {" "}
          <EditableField
            objectToEdit={prospect}
            fieldName={"projectName"}
            fieldToEdit={prospect.projectName}
            editCallBack={editFunctionWrapper}
            width={70}
          />
        </span>
      </div>
    </div>
  );
};
