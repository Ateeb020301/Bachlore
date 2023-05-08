import * as C from "./styles";
import { useNavigate, useLocation } from "react-router-dom";
import { Theme } from "../../components/Theme/intex";
import { useForm, FormActions } from "../../context/FormContext";
import { useState } from "react";
import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_PROJECTCONSULTANT,
  GetProjectItemsPayload,
  GET_CONSULTANTS_INFO,
  GET_PROJECTS,
  GET_PROJECTCONSULTANTS,
  DELETE_PROJECTCONSULTANT,
  ADD_CONTRACT,
  GET_TEAMCONS_CONTRACTS,
  GET_CONSULTANT_CAPACITY,
} from "../../../../api/contract/queries";
import {
  AddProjectConsultantPayload,
  GetConsultantItemsContractsPayload,
  GetProjectConsultantPayload2,
  GetProjectConsultantPayload,
  AddContractPayload,
} from "../../../../api/contract/payloads";
import {
  Box,
  FormGroup,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { toast } from "react-toastify";
import "./index.css";
import { ProjectConsultantContainer } from "./ProjectConsultantContainer";
import { GET_ACTIVITYLOG } from "../../../../api/activitylog";
import DeleteIcon from "@mui/icons-material/Delete";
import { getDefaultNewContract } from "../../../../api/contract/logic";
import { AddContractInput } from "../../../../api/contract/inputs";

//GQL pagination skip const
const skipAmount = 0;
//GQL pagination take const
const takeAmount = 20;
const currentYear = new Date().getFullYear();

export interface ProjectConsultants {
  id: number;
  projectId: number;
  consultantId: string;
}
interface ProjectConsultantsNoId {
  projectId: number;
  consultantId: number;
}
export const FormStep2 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data } = useQuery<GetProjectItemsPayload>(GET_PROJECTS, {
    pollInterval: 500,
    variables: { skipAmount: skipAmount, takeAmount: takeAmount },
  });

  const { data: dataC } =
    useQuery<GetConsultantItemsContractsPayload>(GET_CONSULTANTS_INFO);

  const [deletePC] = useMutation<number, { input: { id: number } }>(
    DELETE_PROJECTCONSULTANT,
    {
      refetchQueries: [
        {
          query: GET_CONSULTANTS_INFO,
        },
      ],
    }
  );

  const handleNextStep = () => {
    navigate("../step3");
  };

  const { state, dispatch } = useForm();

  let defaultProjectConsultants: ProjectConsultantsNoId = {
    consultantId: 0,
    projectId: location.state.id,
  };

  const [currenProject, setCurrentProject] = useState<ProjectConsultantsNoId>(
    defaultProjectConsultants
  );
  //const [displayValidation, setDisplayValidation] = useState<string>(' ');
  const [addProjectConsultant] = useMutation<
    AddProjectConsultantPayload,
    { input: ProjectConsultantsNoId }
  >(ADD_PROJECTCONSULTANT, {
    refetchQueries: [
      {
        query: GET_ACTIVITYLOG,
      },
    ],
    awaitRefetchQueries: true,
  });
  const [addContract] = useMutation<
    AddContractPayload,
    { input: AddContractInput }
  >(ADD_CONTRACT, {
    refetchQueries: [
      {
        query: GET_TEAMCONS_CONTRACTS,
        variables: { id: currenProject.consultantId },
      },
      {
        query: GET_ACTIVITYLOG,
      },
      {
        query: GET_CONSULTANT_CAPACITY,
        variables: {
          startYear: currentYear,
          endYear: currentYear + 2,
          id: currenProject.consultantId,
        },
      },
      {
        query: GET_CONSULTANTS_INFO,
      },
    ],
    awaitRefetchQueries: true,
  });

  let [changed, setChanged] = useState(false);
  let [active, setActive] = useState(false);
  const handleSelect = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setChanged(true);
    console.log(changed);
    setCurrentProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  let change = 0;
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(state.name);
    console.log(state.projectName);

    data?.projects.items.map((aProject) => {
      if (
        aProject.projectName == state.projectName &&
        aProject.customerName === state.name
      ) {
        defaultProjectConsultants.projectId = aProject.id;
        dispatch({
          type: FormActions.setProjectId,
          payload: aProject.id,
        });
      }
    });
    let tempName = "";
    dataC?.consultants.items.map((aConsultant) => {
      if (aConsultant.id === currenProject.consultantId) {
        tempName = aConsultant.firstName + " " + aConsultant.lastName;
      }
    });
    defaultProjectConsultants.consultantId = currenProject.consultantId;
    let defaultContract = getDefaultNewContract(
      location.state.id,
      currenProject.consultantId
    );
    addProjectConsultant({
      variables: {
        input: defaultProjectConsultants,
      },
    })
      .then((res) => {
        setEmployees((current) => [
          ...current,
          {
            id: currenProject.consultantId,
            name: tempName,
            projectConsid:
              res.data?.addProjectConsultant.projectconsultant.id ?? 0,
          },
        ]);
        setActive(true);
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
        change++;
        toast.success(" Project og consultant lagt til", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch((e) => {
        toast.error("Noe gikk galt ved legging av Project og Consultant", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        console.log(e);
      });
  };

  const sendDeleteRequest = (id: number) => {
    console.log(id);

    deletePC({ variables: { input: { id: id } } })
      .then((res) => {
        toast.success("Consultant fra Project slettet", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        employees.pop();
      })
      .catch((e) => {
        toast.error("Noe gikk galt ved sletting av Consultant fra Projects", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        console.log(e);
      });
  };

  const initialState: any[] = [];
  const [employees, setEmployees] = useState(initialState);

  return (
    <Theme>
      <C.Container>
        <p className="passo">Step 2 of 3</p>
        <h4>Hello {state.name}, </h4>
        <p style={{ color: "black", paddingTop: "5px" }}>
          Choose Webstep Consultants
        </p>

        <FormGroup>
          <Select
            id="ddc"
            name="consultantId"
            defaultValue="0"
            value={currenProject.consultantId.toString()}
            onChange={handleSelect}
          >
            <MenuItem value="0" disabled>
              Choose a Customer
            </MenuItem>
            {dataC?.consultants.items.map((aConsultant) => (
              <MenuItem key={aConsultant.id} value={aConsultant.id}>
                {aConsultant.firstName} {aConsultant.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormGroup>

        {employees.map((element, index) => {
          return (
            <div key={index}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  my: 2,
                  borderBottom: "1px dotted gray",
                }}
              >
                <Box sx={{}}>
                  <h2 style={{ fontSize: "16px" }}>{element.name}</h2>
                </Box>
                <Box sx={{}}>
                  <IconButton
                    sx={{}}
                    onClick={() => sendDeleteRequest(element.projectConsid)}
                    disableRipple
                    disableTouchRipple
                    disableFocusRipple
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </div>
          );
        })}
        <ProjectConsultantContainer />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* <Link to='/step2'>Voltar</Link> */}
          <button
            id="buttonClick"
            style={{ marginRight: "5px" }}
            disabled={!changed}
            onClick={handleSubmit}
          >
            Add Consultant
          </button>
          <button id="buttonClick" onClick={handleNextStep} disabled={!active}>
            Next
          </button>
        </div>
      </C.Container>
    </Theme>
  );
};
