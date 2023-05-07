import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { useMutation } from "@apollo/client";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import {
  AddConsultantPayload,
  ADD_CONSULTANT,
  EditConsultantPayload,
  EDIT_CONSULTANT,
} from "../../api/consultants";
import { Box } from "@mui/material";
import { Form, useNavigate } from "react-router-dom";
import {
  GET_CONSULTANTS_INFO,
  GET_CONSULTANT_CAPACITY,
  GET_TEAMCONS_CONTRACTS,
} from "../../api/contract/queries";
import { constants } from "../../logic/constants";
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

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(currentCustomer);
    if (isValidConsultant()) {
      newCustomer.id = currentCustomer.id;
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
    <Box>
      <Box>
        <form>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <br />
            <Input
              type="text"
              id="firstName"
              valid={isValidText(currentCustomer.firstName)}
              invalid={!isValidText(currentCustomer.firstName)}
              value={currentCustomer.firstName}
              onChange={handleChange}
              name="firstName"
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <br />
            <Input
              type="text"
              id="lastName"
              valid={isValidText(currentCustomer.lastName)}
              invalid={!isValidText(currentCustomer.lastName)}
              value={currentCustomer.lastName}
              onChange={handleChange}
              name="lastName"
            />
          </FormGroup>

          <FormGroup>
            <Label for="addresse">Address</Label>
            <br />
            <Input
              type="text"
              id="addresse"
              min={0}
              max={5}
              valid={isValidText(currentCustomer.adresse)}
              invalid={!isValidText(currentCustomer.adresse)}
              value={currentCustomer.adresse}
              onChange={handleChange}
              name="adresse"
            />
          </FormGroup>

          <FormGroup>
            <Label for="email">Email</Label>
            <br />
            <Input
              type="text"
              id="inpEmail"
              valid={isValidText(currentCustomer.email)}
              invalid={!isValidText(currentCustomer.email)}
              value={currentCustomer.email}
              onChange={handleChange}
              name="email"
            />
          </FormGroup>

          <FormGroup>
            <Label for="tlf">Phone Number:</Label>
            <br />
            <Input
              type="text"
              id="inpTlf"
              className={displayValidation}
              value={currentCustomer.tlf ? currentCustomer.tlf : ""}
              onChange={handleChange}
              name="tlf"
            />
          </FormGroup>

          <Button
            color="primary"
            onClick={handleSubmit}
            disabled={!isValidConsultant()}
          >
            Legg til
          </Button>
        </form>
      </Box>
    </Box>
  );
};
