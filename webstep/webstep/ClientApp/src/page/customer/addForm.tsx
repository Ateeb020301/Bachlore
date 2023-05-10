import React, { useEffect, useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import Button from '@mui/material/Button';
import { useMutation, useQuery } from "@apollo/client";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { Box, MenuItem, Select, TextField } from "@mui/material";
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
    <Box sx={{width: '100%'}}>
      <Box sx={{display: 'flex', justifyContent: 'center', p: 2, mt: 2}}>
        <form>
          <Box sx={{display: 'flex', justifyContent: 'space-betweens', width: '100%', py:1}}>
            <Box sx={{px: 1}}>
              <FormGroup>
                <TextField 
                  type="text"
                  id="firstName"
                  label="Firstname (Required)"
                  color={(isValidText(currentCustomer.firstName) ? 'success' : 'error')}
                  placeholder="Firstname (Required)"
                  value={currentCustomer.firstName}
                  onChange={handleChange}
                  name="firstName"
                  
                />
              </FormGroup>
            </Box>
            <Box sx={{px: 1}}>
              <FormGroup>
                <TextField 
                    type="text"
                    id="lastName"
                    label="Lastname (Required)"
                    color={(isValidText(currentCustomer.lastName) ? 'success' : 'error')}
                    placeholder="Lastname (Required)"
                    value={currentCustomer.lastName}
                    onChange={handleChange}
                    name="lastName"
                    
                  />
              </FormGroup>
            </Box>
          </Box>

          <Box sx={{display: 'flex', py: 1}}>
            <Box sx={{px: 1, width: '100%'}}>
              <FormGroup>
                <TextField 
                  type="text"
                  id="inpEmail"
                  label="Email (Required)"
                  color={(isValidText(currentCustomer.email) ? 'success' : 'error')}
                  placeholder="Email (Required)"
                  value={currentCustomer.email}
                  onChange={handleChange}
                  name="email"
                  fullWidth
                 />
              </FormGroup>
            </Box>
          </Box>

          <Box sx={{display: 'flex', width: '100%', py: 1}}>
            <Box sx={{px: 1, flex: 1}}>
              <FormGroup>
                <TextField 
                  type="text"
                  id="addresse"
                  label="Address (Required)"
                  color={(isValidText(currentCustomer.adresse) ? 'success' : 'error')}
                  placeholder="Address (Required)"
                  value={currentCustomer.adresse}
                  onChange={handleChange}
                  name="adresse"
                 />
              </FormGroup>
            </Box>
            
            <Box sx={{px: 1}}>
              <FormGroup>
                <TextField 
                  type="text"
                  id="inpTlf"
                  label="Phone number (Required)"
                  color={(isValidText(currentCustomer.tlf) ? 'success' : 'error')}
                  placeholder="Phone number (Required)"
                  value={currentCustomer.tlf}
                  onChange={handleChange}
                  name="tlf"
                 />
                </FormGroup>
            </Box>
          </Box>

          <Box sx={{display: 'flex', py: 1}}>
            <Box sx={{px: 1, width: '100%'}}>
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
                    fullWidth
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
            </Box>
          </Box>

          <Box sx={{display: 'flex', py: 1}}>
            <Box sx={{px: 1, width: '100%'}}>
              <Button
                color="success"
                variant="contained"
                onClick={handleSubmit}
                disabled={!isValidConsultant()}
                fullWidth
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
