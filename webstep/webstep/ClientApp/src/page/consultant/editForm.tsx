import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { useMutation } from "@apollo/client";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {
  AddConsultantPayload,
  EditConsultantPayload,
  EDIT_CONSULTANT,
} from "../../api/consultants";
import { Box, TextField } from "@mui/material";
import {
  GET_CONSULTANTS_INFO,
  GET_CONSULTANT_CAPACITY,
} from "../../api/contract/queries";
import { constants } from "../../logic/constants";

interface ConsultantNoId {
  id: number;
  firstName: string;
  lastName: string;
  employmentDate: string;
  resignationDate?: any;
  workdays: number;
}

interface ModalEditConsultantProps {
  onClose: () => void;
  consultant: ConsultantNoId;
}

export const EditForm: React.FC<ModalEditConsultantProps> = ({
  onClose,
  consultant,
}) => {
  //Date shenanigans
  let d = new Date();
  //Get todays date
  let today =
    d.getFullYear() +
    "-" +
    (d.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    d.getDate().toString().padStart(2, "0");

  let newConsultant: ConsultantNoId = {
    id: 0,
    firstName: "",
    lastName: "",
    employmentDate: today,
    resignationDate: null,
    workdays: 0,
  };

  const [currentConsultant, setCurrentConsultant] =
    useState<ConsultantNoId>(consultant);
  const [displayValidation, setDisplayValidation] = useState<string>("");
  const [editConsultant] = useMutation<
    EditConsultantPayload,
    { input: ConsultantNoId }
  >(EDIT_CONSULTANT, {
    refetchQueries: [
      {
        query: GET_CONSULTANT_CAPACITY,
        variables: {
          startYear: constants.currentYear,
          endYear: constants.currentYear + 2,
          id: consultant.id,
        },
      },
      {
        query: GET_CONSULTANTS_INFO,
      },
    ],
    awaitRefetchQueries: true,
  });

  //Adds or removes validation field on resignationDate depending on if its empty or not
  useEffect(() => {
    resignationDateValidationToggle();
  });

  const resignationDateValidationToggle = () => {
    let isValidatedStr = "";

    //returns true if its a valid end date, false if its not
    let isValidResignationDate = isValidEndDate(
      currentConsultant.resignationDate ? currentConsultant.resignationDate : ""
    );

    //Checks if date is not empty and is a valid endDate
    if (
      currentConsultant.resignationDate &&
      currentConsultant.resignationDate !== "" &&
      isValidResignationDate
    ) {
      isValidatedStr = "is-valid";
    } else if (
      currentConsultant.resignationDate &&
      currentConsultant.resignationDate !== "" &&
      !isValidResignationDate
    ) {
      isValidatedStr = "is-invalid";
    }

    setDisplayValidation(isValidatedStr);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCurrentConsultant((prevConsultant) => ({
      ...prevConsultant,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(currentConsultant);
    if (isValidConsultant()) {
      newConsultant.id = currentConsultant.id;
      newConsultant.firstName = currentConsultant.firstName;
      newConsultant.lastName = currentConsultant.lastName;
      newConsultant.employmentDate = currentConsultant.employmentDate;
      newConsultant.resignationDate = currentConsultant.resignationDate;
      newConsultant.workdays = parseInt(currentConsultant.workdays.toString());

      editConsultant({ variables: { input: newConsultant } })
        .then((res) => {
          toast.success("Konsulenten ble redigert", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          onClose();
        })
        .catch((e) => {
          toast.error("Noe gikk galt ved redigering av Konsulenten", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          console.log(e);
        });
    }
  };

  const isValidText = (s: string) => {
    return s !== "";
  };

  //checks only if the start date is empty
  const isValidStartDate = (s: string) => {
    if (s === "") {
      return false;
    }
    return true;
  };

  const isValidEndDate = (s: string) => {
    if (s === "") {
      return true;
    }

    // If the startdate doesnt exist, any valid date is a valid start date
    if (currentConsultant.employmentDate === "") {
      //change to date when its ready
      return isValidText(s);
    } else {
      // assumes startdate is formatted correctly
      let tempSD = new Date(currentConsultant.employmentDate);
      // assumes enddate is formatted correctly
      let tempED = new Date(s);
      return tempED > tempSD;
    }
  };

  const isValidWorkdays = (days: number) => {
    if (days <= 5 || days >= 0) {
      return true;
    }
    return false;
  };

  const isValidConsultant = (): boolean => {
    let hasTruthyValues =
      currentConsultant.firstName &&
      currentConsultant.workdays &&
      currentConsultant.lastName &&
      isValidStartDate(currentConsultant.employmentDate);

    let resignDate = currentConsultant.resignationDate?.toString();
    if (hasTruthyValues) {
      if (resignDate !== "") {
        return (
          isValidText(currentConsultant.employmentDate) &&
          isValidEndDate(
            currentConsultant.resignationDate
              ? currentConsultant.resignationDate
              : ""
          )
        );
      } else {
        return isValidText(currentConsultant.employmentDate);
      }
    }
    return false;
  };

  return (
    <Box sx={{ height: "100%" }}>
      <Box sx={{ m: 2 }}>
        <form>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              py: 1,
            }}
          >
            <Box sx={{ px: 1, flex: 2 }}>
              <FormGroup>
                <TextField
                  type="text"
                  id="firstName"
                  label="Firstname (Required)"
                  color={
                    isValidText(currentConsultant.firstName)
                      ? "success"
                      : "error"
                  }
                  placeholder="Firstname (Required)"
                  value={currentConsultant.firstName}
                  onChange={handleChange}
                  name="firstName"
                />
              </FormGroup>
            </Box>
            <Box sx={{ px: 1, flex: 2 }}>
              <FormGroup>
                <TextField
                  type="text"
                  id="lastName"
                  label="Lastname (Required)"
                  color={
                    isValidText(currentConsultant.lastName)
                      ? "success"
                      : "error"
                  }
                  placeholder="Lastname (Required)"
                  value={currentConsultant.lastName}
                  onChange={handleChange}
                  name="lastName"
                />
              </FormGroup>
            </Box>
            <Box sx={{ px: 1, flex: 1 }}>
              <FormGroup>
                <TextField
                  type="number"
                  id="workdays"
                  label="Workdays(Required)"
                  color={
                    isValidWorkdays(currentConsultant.workdays)
                      ? "success"
                      : "error"
                  }
                  placeholder="Lastname (Required)"
                  value={currentConsultant.workdays}
                  onChange={handleChange}
                  name="workdays"
                />
              </FormGroup>
            </Box>
          </Box>
          <Box sx={{ display: "flex", p: 1 }}>
            <Box sx={{ display: "flex", flex: 1 }}>
              <FormGroup sx={{ display: "flex" }}>
                <Box sx={{ display: "flex" }}>
                  <Label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "5px",
                      borderTopLeftRadius: "5px",
                      borderBottomLeftRadius: "5px",
                      color: "white",
                      background: "#064bd7",
                      fontSize: "14px",
                    }}
                    for="employmentDate"
                  >
                    Start dato:
                  </Label>
                  <Input
                    style={{
                      display: "flex",
                      padding: "10px",
                      border: "1px solid #064bd7",
                    }}
                    type="date"
                    id="inpEmploymentDate"
                    valid={isValidStartDate(currentConsultant.employmentDate)}
                    invalid={
                      !isValidStartDate(currentConsultant.employmentDate)
                    }
                    value={currentConsultant.employmentDate}
                    onChange={handleChange}
                    name="employmentDate"
                  />
                </Box>
              </FormGroup>
            </Box>
            <Box sx={{ display: "flex", flex: 1 }}>
              <FormGroup>
                <Box sx={{ display: "flex" }}>
                  <Label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "5px",
                      borderTopLeftRadius: "5px",
                      borderBottomLeftRadius: "5px",
                      color: "white",
                      background: "#064bd7",
                      fontSize: "14px",
                    }}
                    for="resignationDate"
                  >
                    Slutt dato:
                  </Label>
                  <Input
                    style={{
                      display: "flex",
                      padding: "10px",
                      border: "1px solid #064bd7",
                    }}
                    type="date"
                    id="inpResignationDate"
                    className={displayValidation}
                    value={
                      currentConsultant.resignationDate
                        ? currentConsultant.resignationDate
                        : ""
                    }
                    onChange={handleChange}
                    name="resignationDate"
                  />
                </Box>
              </FormGroup>
            </Box>
          </Box>
          <Box sx={{ p: 1 }}>
            <Button
              color={!isValidConsultant() ? "error" : "success"}
              onClick={handleSubmit}
              disabled={!isValidConsultant()}
            >
              Legg til
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
