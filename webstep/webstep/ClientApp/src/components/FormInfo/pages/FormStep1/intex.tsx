import * as C from "./styles";
import { useNavigate } from "react-router-dom";
import { useForm, FormActions } from "../../context/FormContext";
import { Theme } from "../../components/Theme/intex";
import { useState } from "react";
import React from "react";
import { Input, Label } from "reactstrap";
import { useMutation } from "@apollo/client";
import { AddProjectPayload } from "../../../../api/contract/payloads";
import { ADD_PROJECT } from "../../../../api/contract/queries";
import { GET_PROSPECTS } from "../../../../api/prospects/queries";
import { toast } from "react-toastify";

interface ProjectNoId {
  projectName: string;
  customerName: string;
}
export const FormStep1 = () => {
  let newProspectid = 0;
  let defaultProject: ProjectNoId = {
    projectName: "",
    customerName: "",
  };

  const navigate = useNavigate();
  const { state, dispatch } = useForm();

  const [currenProject, setCurrentProject] =
    useState<ProjectNoId>(defaultProject);
  //const [displayValidation, setDisplayValidation] = useState<string>(' ');
  const [addProject] = useMutation<AddProjectPayload, { input: ProjectNoId }>(
    ADD_PROJECT,
    {
      refetchQueries: [
        {
          query: GET_PROSPECTS,
        },
      ],
      awaitRefetchQueries: true,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: FormActions.setName,
      payload: e.target.value,
    });
    setCurrentProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  let error = false;
  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: FormActions.setProjectName,
      payload: e.target.value,
    });

    setCurrentProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    defaultProject.projectName = currenProject.projectName;
    defaultProject.customerName = currenProject.customerName;

    addProject({ variables: { input: defaultProject } })
      .then((res) => {
        if (state.name !== "") {
          let newProspectId = res.data?.addProject.project.id;
          newProspectid = newProspectId ?? 0;
          toast.success("Project er opprettet", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          currenProject.projectName = "";
          navigate(`./step2`, { state: { id: newProspectId } });
        } else {
          error = true;
        }
      })
      .catch((e) => {
        toast.error("Noe gikk galt ved oppretting av Project", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  const isValidText = (s: string) => {
    return s !== "";
  };

  return (
    <Theme>
      <C.Container>
        <p className="passo">Step 1 of 3</p>
        <Label for="projectName">Project Name</Label>
        <br />
        <Input
          type="text"
          id="projectName"
          valid={isValidText(currenProject.projectName)}
          invalid={!isValidText(currenProject.projectName)}
          value={currenProject.projectName}
          onChange={handleChange2}
          name="projectName"
        />
        {error ? (
          <p
            style={{
              color: "red",
              paddingTop: "5px",
            }}
          >
            Field required!
          </p>
        ) : (
          <p></p>
        )}

        <Label for="customerName">Customer Name</Label>
        <br />
        <Input
          type="text"
          id="customerName"
          valid={isValidText(currenProject.customerName)}
          invalid={!isValidText(currenProject.customerName)}
          value={currenProject.customerName}
          onChange={handleChange}
          name="customerName"
        />
        <button onClick={handleSubmit}>Next</button>
      </C.Container>
    </Theme>
  );
};
