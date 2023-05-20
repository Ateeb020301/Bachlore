import React, { useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { useMutation } from "@apollo/client";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GET_CONSULTANTS_INFO } from "../../api/contract/queries";
import {
  EDIT_CUSTOMER,
  EditCustomerPayload,
  GET_CUSTOMER,
} from "../../api/customer";
import { GET_ACTIVITYLOG } from "../../api/activitylog";

interface DefaultCustomer {
  id: number;
  firstName: string;
  lastName: string;
  adresse: string;
  email: string;
  tlf: string;
}

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

interface ModalEditCustomerProps {
  onClose: () => void;
  customer: DefaultCustomer;
}

export const EditForm: React.FC<ModalEditCustomerProps> = ({
  onClose,
  customer,
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

  let newCustomer: DefaultCustomer = {
    id: 0,
    firstName: "",
    lastName: "",
    adresse: "",
    email: "",
    tlf: "",
  };

  const outsideRef = React.useRef(null);
  const navigate = useNavigate();

  const [currentCustomer, setCurrentCustomer] =
    useState<DefaultCustomer>(customer);
  const [displayValidation, setDisplayValidation] = useState<string>("");
  const [editCustomer] = useMutation<
    EditCustomerPayload,
    { input: DefaultCustomer }
  >(EDIT_CUSTOMER, {
    refetchQueries: [
      {
        query: GET_CONSULTANTS_INFO,
      },
      {
        query: GET_ACTIVITYLOG,
      },
      {
        query: GET_CUSTOMER,
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCurrentCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };
  let decodedId: number;
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(currentCustomer);
    if (isValidConsultant()) {
      decodedId = parseInt(
        new TextDecoder()
          .decode(
            Uint8Array.from(atob(currentCustomer.id.toString()), (c) =>
              c.charCodeAt(0)
            )
          )
          .replace(/[^0-9]/g, "")
      );
      newCustomer.id = decodedId;
      newCustomer.firstName = currentCustomer.firstName;
      newCustomer.lastName = currentCustomer.lastName;
      newCustomer.adresse = currentCustomer.adresse;
      newCustomer.email = currentCustomer.email;
      newCustomer.tlf = currentCustomer.tlf;

      editCustomer({ variables: { input: newCustomer } })
        .then((res) => {
          toast.success("Customer ble redigert", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          onClose();
        })
        .catch((e) => {
          toast.error("Noe gikk galt ved redigering av Customer", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          console.log(e);
        });
    }
  };

  const isValidText = (s: string) => {
    return s !== "";
  };

  const isValidConsultant = (): boolean => {
    let hasTruthyValues =
      currentCustomer.firstName &&
      currentCustomer.adresse &&
      currentCustomer.lastName &&
      currentCustomer.email &&
      currentCustomer.tlf;

    if (hasTruthyValues) {
      return true;
    }
    return false;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <form>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ p: 1 }}>
            <FormGroup>
              <TextField
                type="text"
                id="firstName"
                label="Firstname (Required)"
                color={
                  isValidText(currentCustomer.firstName) ? "success" : "error"
                }
                placeholder="Firstname (Required)"
                value={currentCustomer.firstName}
                onChange={handleChange}
                name="firstName"
              />
            </FormGroup>
          </Box>
          <Box sx={{ p: 1 }}>
            <FormGroup>
              <TextField
                type="text"
                id="lastName"
                label="Lastname (Required)"
                color={
                  isValidText(currentCustomer.lastName) ? "success" : "error"
                }
                placeholder="Firstname (Required)"
                value={currentCustomer.lastName}
                onChange={handleChange}
                name="lastName"
              />
            </FormGroup>
          </Box>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Box sx={{ p: 1, flex: 2 }}>
            <FormGroup>
              <TextField
                type="text"
                id="addresse"
                label="Address (Required)"
                color={
                  isValidText(currentCustomer.adresse) ? "success" : "error"
                }
                placeholder="Adress (Required)"
                value={currentCustomer.adresse}
                onChange={handleChange}
                name="addresse"
                fullWidth
              />
            </FormGroup>
          </Box>

          <Box sx={{ p: 1, flex: 1 }}>
            <FormGroup>
              <TextField
                type="text"
                id="inpTlf"
                label="Phone number (Required)"
                color={isValidText(currentCustomer.tlf) ? "success" : "error"}
                placeholder="Phone number (Required)"
                value={currentCustomer.tlf}
                onChange={handleChange}
                name="tlf"
              />
            </FormGroup>
          </Box>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Box sx={{ p: 1, flex: 1 }}>
            <FormGroup>
              <TextField
                type="text"
                id="inpEmail"
                label="Email (Required)"
                color={isValidText(currentCustomer.email) ? "success" : "error"}
                placeholder="Adress (Required)"
                value={currentCustomer.email}
                onChange={handleChange}
                name="email"
                fullWidth
              />
            </FormGroup>
          </Box>
          <Box sx={{ p: 1, flex: 1 }}>
            <Button
              color="primary"
              variant="contained"
              onClick={handleSubmit}
              disabled={!isValidConsultant()}
              sx={{ height: "100%" }}
              fullWidth
            >
              Legg til
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};
