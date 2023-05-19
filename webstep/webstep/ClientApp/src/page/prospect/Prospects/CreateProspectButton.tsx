import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import {
  ADD_PROSPECT,
  ADD_SUBPROSPECT,
  GET_PROSPECTS,
  GET_SELLER_PROSPECTS,
} from "../../../api/prospects/queries";
import { getCurrentWeek } from "../../../logic/dateFunctions";
import PlusIcon from "../../../components/images/plus-square.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AddProspectPayload,
  AddSubProspectPayload,
} from "../../../api/prospects/payloads";
import {
  AddProspectInput,
  AddSubProspectInput,
} from "../../../api/prospects/inputs";
import { ModalAddProspect } from "./ModalAddProspect";
import { Prospect } from "../../../logic/interfaces";
import { GET_SELLERS } from "../../../api/sellers";
import { GET_ACTIVITYLOG } from "../../../api/activitylog";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormGroup,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  GET_CUSTOMER,
  GET_CUSTOMERS,
  GetCustomerItemsContractsPayload,
} from "../../../api/customer";
import { Input, Label } from "reactstrap";

interface CreateProspectButtonProps {
  customerId: number;
  sellerId: number;
}

interface ProspectNoId {
  projectName: string;
  customerId: string;
  sellerId: number;
}

//GQL pagination skip const
const skipAmount = 0;
//GQL pagination take const
const takeAmount = 50;

export const CreateProspectButton: React.FC<CreateProspectButtonProps> = ({
  sellerId,
  customerId,
}) => {
  const [isModalProspectOpen, setState] = React.useState(false);
  const navigate = useNavigate();

  const toggleAddprospect = () => setState(!isModalProspectOpen);

  const { loading, error, data, refetch } =
    useQuery<GetCustomerItemsContractsPayload>(GET_CUSTOMERS, {
      pollInterval: 500,
      variables: { skipAmount: skipAmount, takeAmount: takeAmount },
    });

  let defaultProspect: ProspectNoId = {
    projectName: "",
    customerId: "0",
    sellerId: 0,
  };

  const [currentProspect, setCurrentProspect] =
    useState<ProspectNoId>(defaultProspect);
  //const [displayValidation, setDisplayValidation] = useState<string>(' ');
  const [addProspect] = useMutation<
    AddProspectPayload,
    { input: ProspectNoId }
  >(ADD_PROSPECT, {
    refetchQueries: [
      {
        query: GET_PROSPECTS,
      },
      {
        query: GET_ACTIVITYLOG,
      },
      {
        query: GET_SELLERS,
        variables: { skipAmount: skipAmount, takeAmount: takeAmount },
      },
      {
        query: GET_CUSTOMER,
      },
    ],
    awaitRefetchQueries: true,
  });
  const [addSubProspect] = useMutation<
    AddSubProspectPayload,
    { input: AddSubProspectInput }
  >(ADD_SUBPROSPECT, {
    refetchQueries: [
      {
        query: GET_SELLER_PROSPECTS,
        variables: { id: sellerId },
      },
      {
        query: GET_ACTIVITYLOG,
      },
      {
        query: GET_PROSPECTS,
      },
      {
        query: GET_CUSTOMER,
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleSelect = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setCurrentProspect((prevProspect) => ({
      ...prevProspect,
      [name]: value,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCurrentProspect((prevProspect) => ({
      ...prevProspect,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    defaultProspect.projectName = currentProspect.projectName;
    defaultProspect.customerId = currentProspect.customerId;
    defaultProspect.sellerId = sellerId;

    addProspect({ variables: { input: defaultProspect } })
      .then((res) => {
        let newProspectId = res.data?.addProspect.prospect.id;

        if (newProspectId !== undefined) {
          let defaultSubProspect = getDefaultSubProspect(newProspectId);
          addSubProspect({ variables: { input: defaultSubProspect } })
            .then((res) => {
              toast.success("Prospekt opprettet", {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
              currentProspect.projectName = "";
            })
            .catch((e) => {
              toast.error("Noe gikk galt ved oppretting av sub-prospektet", {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            });
        }
      })
      .catch((e) => {
        toast.error("Noe gikk galt ved oppretting av prospektet", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  const isValidText = (s: string) => {
    return s !== "";
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    navigate("/prospect");
    setOpen(false);
  };
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        size="small"
        variant="text"
        color="primary"
      >
        + prospect
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle>Add a new Prospect</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
        </DialogContent>
        <form>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ m: 1, flex: 1 }}>
              <FormGroup>
                <TextField
                  type="text"
                  id="projectName"
                  label="Project Name (Required)"
                  color={
                    isValidText(currentProspect.projectName)
                      ? "success"
                      : "error"
                  }
                  placeholder="Project Name (Required)"
                  value={currentProspect.projectName}
                  onChange={handleChange}
                  name="projectName"
                />
              </FormGroup>
            </Box>

            <Box sx={{ m: 1, flex: 1 }}>
              <FormGroup>
                <Select
                  id="ddc"
                  name="customerId"
                  value={currentProspect.customerId}
                  onChange={handleSelect}
                  error={parseInt(currentProspect.customerId) < 0}
                >
                  <MenuItem value="0" disabled>
                    Choose a customer
                  </MenuItem>
                  {data?.customers.items.map((aCustomer) => (
                    <MenuItem key={aCustomer.id} value={aCustomer.id}>
                      {aCustomer.firstName}
                    </MenuItem>
                  ))}
                </Select>
              </FormGroup>
            </Box>
          </Box>
          <Box sx={{ m: 1 }}>
            <Button color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </form>
      </Dialog>
    </>
  );
};

const getDefaultSubProspect = (prospectId: number) => {
  let currentDate: any = new Date();
  let startDate: any = new Date(currentDate.getFullYear(), 0, 1);
  var days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

  var weekNumber = Math.ceil(days / 7);

  let currentWeek = getCurrentWeek();
  let currentYear = new Date().getFullYear();
  let prospectDurationInWeeks = 3;

  let probability = 30;
  let workdays = 5;

  let defaultSubProspect: AddSubProspectInput = {
    prospectId: prospectId,
    probability: probability,
    numOfConsultants: workdays,
    start: { year: currentYear, week: weekNumber },
    end: { year: currentYear, week: weekNumber + prospectDurationInWeeks },
  };

  return defaultSubProspect;
};
