import { useMutation } from "@apollo/client";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "reactstrap";
import { AddVacancyInput } from "../../../api/contract/inputs";
import { getDefaultAddVacancyInput } from "../../../api/contract/logic";
import { AddVacancyPayload } from "../../../api/contract/payloads";
import {
  ADD_VACANCY,
  GET_CONSULTANT_VACANCY,
} from "../../../api/contract/queries";

interface AddVacancyButtonProps {
  consultantId: number;
  planned: boolean;
}

export const AddVacancyButton: React.FC<AddVacancyButtonProps> = ({
  consultantId,
  planned,
}) => {
  const pointlessConsultantIdCopy = consultantId; //only god knows why this is necessary

  const [addVacancy] = useMutation<
    AddVacancyPayload,
    { input: AddVacancyInput }
  >(ADD_VACANCY, {
    refetchQueries: [
      {
        query: GET_CONSULTANT_VACANCY,
        variables: { id: pointlessConsultantIdCopy },
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleClick = () => {
    let newVacancy: AddVacancyInput = getDefaultAddVacancyInput(
      planned,
      consultantId
    );

    addVacancy({ variables: { input: newVacancy } })
      .then((res) => {
        toast.success("Fravær opprettet", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch((e) => {
        toast.error("Noe gikk galt ved oppretting av fravær", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
  return (
    <Button onClick={handleClick} size="sm" color="info">
      + {planned ? "fri" : "sykdom"}
    </Button>
  );
};
