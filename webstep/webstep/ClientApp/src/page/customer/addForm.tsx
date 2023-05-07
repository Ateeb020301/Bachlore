import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { useMutation, useQuery } from "@apollo/client";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { Box, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  ADD_CUSTOMER,
  AddCustomerPayload,
  GET_CUSTOMER,
  GET_CUSTOMERS,
} from "../../api/customer";
import { GetSellerPayload } from "../../api/prospects/payloads";
import { GET_SELLERS } from "../../api/sellers";
import { GetSellersPayload } from "../seller/SellerContainer";
import Menu from "@mui/material/Menu/Menu";
import { GET_ACTION } from "../../api/action";
import { GET_ACTIVITYLOG } from "../../api/activitylog";

interface DefaultCustomer {
  firstName: string;
  lastName: string;
  adresse: string;
  email: string;
  tlf: string;
  sellerId: number;
}

interface ModalConsultantProps {
  onClose: () => void;
}

//GQL pagination skip const
const skipAmount = 0;
//GQL pagination take const
const takeAmount = 10;

export const AddForm: React.FC<ModalConsultantProps> = ({ onClose }) => {
  let defaultCustomer: DefaultCustomer = {
    firstName: "",
    lastName: "",
    adresse: "",
    email: "",
    tlf: "",
    sellerId: 0,
  };

  const outsideRef = React.useRef(null);
  const navigate = useNavigate();

  const [currentCustomer, setCurrentCustomer] =
    useState<DefaultCustomer>(defaultCustomer);
  const [displayValidation, setDisplayValidation] = useState<string>("");

  const { loading, error, data } = useQuery<GetSellersPayload>(GET_SELLERS, {
    pollInterval: 500,
    variables: { skipAmount: skipAmount, takeAmount: takeAmount },
  });

  const [addCustomer] = useMutation<
    AddCustomerPayload,
    { input: DefaultCustomer }
  >(ADD_CUSTOMER, {
    refetchQueries: [
      {
        query: GET_CUSTOMER,
      },
      {
        query: GET_ACTION,
      },
      {
        query: GET_ACTIVITYLOG,
      },
      {
        query: GET_CUSTOMERS,
        pollInterval: 500,
        variables: { skipAmount: skipAmount, takeAmount: takeAmount },
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value }: any = e.target;

    setCurrentCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(currentCustomer);

    addCustomer({ variables: { input: currentCustomer } })
      .then((res) => {
        toast.success("Customer opprettet", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        onClose();
      })
      .catch((err) => {
        toast.error("Noe gikk galt med oppretting av en customer.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        console.log(err);
      });
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
      currentCustomer.tlf &&
      currentCustomer.sellerId;

    if (hasTruthyValues) {
      return true;
    }
    return false;
  };

  const [state, setState] = React.useState({
    id: 0,
    fullName: "",
  });

  const handleSelectChange = (event: any) => {
    const name = event.target.name;
    currentCustomer.sellerId = event.target.value;

    setState({
      ...state,
      [name]: event.target.value,
    });
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
          <FormGroup>
            <Select
              value={state.id}
              onChange={handleSelectChange}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              displayEmpty
              inputProps={{
                name: "id",
                id: "age-native-simple",
              }}
            >
              <MenuItem value="0" disabled>
                Select seller
              </MenuItem>
              {data?.sellers.items.map((sellers) => (
                <MenuItem key={sellers.id} value={sellers.id}>
                  {sellers.fullName}
                </MenuItem>
              ))}
            </Select>
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
