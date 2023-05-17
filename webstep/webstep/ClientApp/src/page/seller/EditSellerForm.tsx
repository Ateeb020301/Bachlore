import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { useMutation } from "@apollo/client";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import {
  EditSellerInput,
  EditSellerPayload,
  EDIT_SELLER,
  GET_SELLER,
  GET_SELLERS,
} from "../../api/sellers";
import "../consultant/AddModal.css";
import { GET_ACTIVITYLOG } from "../../api/activitylog";
import { Box, TextField } from "@mui/material";

interface ModalEditProps {
  onClose: () => void;
  seller: EditSellerInput;
}
const skipAmount = 0;
//GQL pagination take const
const takeAmount = 50;

export const EditSellerForm: React.FC<ModalEditProps> = ({
  onClose,
  seller,
}) => {
  const outsideRef = React.useRef(null);

  const [currentSeller, setCurrentSeller] = useState<EditSellerInput>(seller);
  const [displayValidation, setDisplayValidation] = useState<string>("");
  const [editSeller] = useMutation<
    EditSellerPayload,
    { input: EditSellerInput }
  >(EDIT_SELLER, {
    refetchQueries: [
      {
        query: GET_SELLERS,
        variables: { skipAmount: skipAmount, takeAmount: takeAmount },
      },
      {
        query: GET_ACTIVITYLOG,
      },
    ],
    awaitRefetchQueries: true,
  });

  useEffect(() => {
    resignationDateValidationToggle();
  });

  const resignationDateValidationToggle = () => {
    let isValidatedStr = "";

    //returns true if its a valid end date, false if its not
    let isValidResignationDate = isValidEndDate(
      currentSeller.resignationDate ? currentSeller.resignationDate : ""
    );

    //Checks if date is not empty and is a valid endDate
    if (
      currentSeller.resignationDate &&
      currentSeller.resignationDate !== "" &&
      isValidResignationDate
    ) {
      isValidatedStr = "is-valid";
    } else if (
      currentSeller.resignationDate &&
      currentSeller.resignationDate !== "" &&
      !isValidResignationDate
    ) {
      isValidatedStr = "is-invalid";
    }

    setDisplayValidation(isValidatedStr);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCurrentSeller((prevSeller) => ({
      ...prevSeller,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(currentSeller);
    if (isValidSeller()) {
      let newSeller: EditSellerInput = {
        id: currentSeller.id,
        fullName: currentSeller.fullName,
        email: currentSeller.email,
        employmentDate: currentSeller.employmentDate,
        resignationDate: currentSeller.resignationDate,
      };
      editSeller({ variables: { input: newSeller } })
        .then((res) => {
          toast.success("Seller ble redigert", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          onClose();
        })
        .catch((e) => {
          toast.error("Noe gikk galt ved redigering av Seller", {
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
    if (currentSeller.employmentDate === "") {
      //change to date when its ready
      return isValidText(s);
    } else {
      // assumes startdate is formatted correctly
      let tempSD = new Date(currentSeller.employmentDate);
      // assumes enddate is formatted correctly
      let tempED = new Date(s);
      return tempED > tempSD;
    }
  };

  const isValidSeller = (): boolean => {
    let hasTruthyValues =
      currentSeller.fullName &&
      currentSeller.email &&
      isValidStartDate(currentSeller.employmentDate);

    let resignDate = currentSeller.resignationDate?.toString();
    if (hasTruthyValues) {
      if (resignDate !== "") {
        return (
          isValidText(currentSeller.employmentDate) &&
          isValidEndDate(
            currentSeller.resignationDate ? currentSeller.resignationDate : ""
          )
        );
      } else {
        return isValidText(currentSeller.employmentDate);
      }
    }
    return false;
  };

  const isValidConsultant = (): boolean => {
    let hasTruthyValues =
      currentSeller.fullName &&
      currentSeller.email &&
      isValidStartDate(currentSeller.employmentDate);

    let resignDate = currentSeller.resignationDate?.toString();
    if (hasTruthyValues) {
      if (resignDate !== "") {
        return (
          isValidText(currentSeller.employmentDate) &&
          isValidEndDate(
            currentSeller.resignationDate ? currentSeller.resignationDate : ""
          )
        );
      } else {
        return isValidText(currentSeller.employmentDate);
      }
    }
    return false;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center", p: 2, mt: 2 }}>
        <form>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-betweens",
              width: "100%",
              py: 1,
            }}
          >
            <Box sx={{ px: 1 }}>
              <FormGroup>
                <TextField
                  type="text"
                  id="fullName"
                  label="Full Name (Required)"
                  color={
                    isValidText(currentSeller.fullName) ? "success" : "error"
                  }
                  placeholder="Full Name (Required)"
                  value={currentSeller.fullName}
                  onChange={handleChange}
                  name="fullName"
                />
              </FormGroup>
            </Box>
            <Box sx={{ px: 1 }}>
              <FormGroup>
                <TextField
                  type="text"
                  id="email"
                  label="Email (Required)"
                  color={isValidText(currentSeller.email) ? "success" : "error"}
                  placeholder="Lastname (Required)"
                  value={currentSeller.email}
                  onChange={handleChange}
                  name="email"
                />
              </FormGroup>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              py: 1,
              flexDirection: "column",
            }}
          >
            <Box sx={{ p: 1, flex: 1 }}>
              <FormGroup>
                <Box sx={{ display: "flex", flex: 1 }}>
                  <Label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "15px",
                      borderTopLeftRadius: "5px",
                      borderBottomLeftRadius: "5px",
                      color: "white",
                      background: "#064bd7",
                      fontSize: "14px",
                      flex: 1,
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
                      flex: 2,
                    }}
                    type="date"
                    id="inpEmploymentDate"
                    valid={isValidStartDate(currentSeller.employmentDate)}
                    invalid={!isValidStartDate(currentSeller.employmentDate)}
                    value={currentSeller.employmentDate}
                    onChange={handleChange}
                    name="employmentDate"
                  />
                </Box>
              </FormGroup>
            </Box>

            <Box sx={{ px: 1, flex: 1 }}>
              <FormGroup>
                <Box sx={{ display: "flex" }}>
                  <Label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "15px",
                      borderTopLeftRadius: "5px",
                      borderBottomLeftRadius: "5px",
                      color: "white",
                      background: "#064bd7",
                      fontSize: "14px",
                      flex: 1,
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
                      flex: 2,
                    }}
                    type="date"
                    id="inpResignationDate"
                    className={displayValidation}
                    value={
                      currentSeller.resignationDate
                        ? currentSeller.resignationDate
                        : ""
                    }
                    onChange={handleChange}
                    name="resignationDate"
                  />
                </Box>
              </FormGroup>
            </Box>
          </Box>
          <Box sx={{ display: "flex", py: 1 }}>
            <Box sx={{ px: 1, width: "100%" }}>
              <Button
                color="primary"
                variant="outlined"
                onClick={handleSubmit}
                disabled={!isValidConsultant()}
              >
                Legg til
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
