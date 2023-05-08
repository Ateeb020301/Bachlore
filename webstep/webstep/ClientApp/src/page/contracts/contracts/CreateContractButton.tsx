import { useMutation } from "@apollo/client";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "reactstrap";
import {
  AddContractInput,
  AddProjectConsultantInput,
  AddProjectInput,
} from "../../../api/contract/inputs";
import { getDefaultNewContract } from "../../../api/contract/logic";
import {
  AddContractPayload,
  AddProjectConsultantPayload,
  AddProjectPayload,
} from "../../../api/contract/payloads";
import {
  ADD_CONTRACT,
  ADD_PROJECT,
  GET_CONSULTANT_CAPACITY,
  GET_TEAMCONS_CONTRACTS,
  GET_CONSULTANTS_INFO,
  ADD_PROJECTCONSULTANT,
} from "../../../api/contract/queries";
import { defaultMessagePlacement } from "../../../logic/toast";
import { Modal } from "../../Utils/ModalComponent";
import { GET_ACTIVITYLOG } from "../../../api/activitylog";
import { FormStep1 } from "../../../components/FormInfo/pages/FormStep1/intex";
import { FormStep2 } from "../../../components/FormInfo/pages/FormStep2";
import { FormStep3 } from "../../../components/FormInfo/pages/FormStep3";
import { FormProvider } from "../../../components/FormInfo/context/FormContext";
import CheckIcon from "@mui/icons-material/Check";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
} from "@mui/material";
import GlobalStyled from "../../../components/FormInfo/components/styles/GlobalStyledComponents/GlobalStyled";
import { Route, Routes, useNavigate } from "react-router-dom";

interface CreateContractButtonProps {
  consultantId: number;
}

const currentYear = new Date().getFullYear();
// Adds a default contract with a default project to a consultant
export const CreateContractButton: React.FC<CreateContractButtonProps> = ({
  consultantId,
}) => {
  const [isModalOpen, setModalState] = React.useState(false);
  const toggleModal = () => setModalState(!isModalOpen);
  const navigate = useNavigate();

  const [addProjectConsultant] = useMutation<
    AddProjectConsultantPayload,
    { input: AddProjectConsultantInput }
  >(ADD_PROJECTCONSULTANT, {
    refetchQueries: [
      {
        query: GET_ACTIVITYLOG,
      },
    ],
  });
  const [addProject] = useMutation<
    AddProjectPayload,
    { input: AddProjectInput }
  >(ADD_PROJECT, {
    refetchQueries: [
      {
        query: GET_ACTIVITYLOG,
      },
    ],
  });
  const [addContract] = useMutation<
    AddContractPayload,
    { input: AddContractInput }
  >(ADD_CONTRACT, {
    refetchQueries: [
      {
        query: GET_TEAMCONS_CONTRACTS,
        variables: { id: consultantId },
      },
      {
        query: GET_ACTIVITYLOG,
      },
      {
        query: GET_CONSULTANT_CAPACITY,
        variables: {
          startYear: currentYear,
          endYear: currentYear + 2,
          id: consultantId,
        },
      },
      {
        query: GET_CONSULTANTS_INFO,
      },
    ],
    awaitRefetchQueries: true,
  });

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    navigate("/belegg");
    setOpen(false);
  };

  const handleClick = () => {
    addProject({
      variables: { input: { customerName: "Kunde", projectName: "Prosjekt" } },
    })
      .then((res) => {
        if (!res.data) throw Error;
        let projectId = res.data.addProject.project.id;
        console.log(projectId);
        let defaultContract = getDefaultNewContract(projectId, consultantId);
        addProjectConsultant({
          variables: {
            input: { consultantId: consultantId, projectId: projectId },
          },
        })
          .then((res) => {
            if (!res.data) throw Error;
            addContract({ variables: { input: defaultContract } })
              .then((res) => {
                toast.success("Kontrakten ble opprettet", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                });
              })
              .catch((e) => {
                console.log(e);
                toast.error("Noe gikk galt ved oppretting av kontrakten", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                });
              });
          })
          .catch((e) => {
            console.log(e);
            toast.error(
              "Noe gikk galt ved inlegging av konsulent til prosjekt",
              {
                position: toast.POSITION.BOTTOM_RIGHT,
              }
            );
          });
      })
      .catch((e) => {
        console.log(e);
        toast.error(
          "Noe gikk galt med oppretting av prosjekt til den nye kontrakten.",
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
      });
  };
  // <Button onClick={handleClick} size='sm' color='primary'>
  //     + kontrakt
  // </Button>

  return (
    <div className="modalContainer">
      <Button onClick={() => setOpen(true)} size="sm" color="primary">
        + kontrakt
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        aria-labelledby="responsive-dialog-title"
      >
        <FormProvider>
          <Routes>
            <Route path="/" element={<FormStep1 />} />
            <Route path="/step2" element={<FormStep2 />} />
            <Route path="/step3" element={<FormStep3 />} />
          </Routes>
          <GlobalStyled />
        </FormProvider>
      </Dialog>
    </div>
  );
};
