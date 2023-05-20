import React, { useState } from "react";
import {
  GET_CUSTOMER,
  CustomerPayload,
  DELETE_CUSTOMER,
  Customer,
  GET_CUSTOMERS,
} from "../../api/customer";
import { useMutation, useQuery } from "@apollo/client";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import {
  Box,
  Breadcrumbs,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TableHead,
  TextField,
  useTheme,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { CustomerContainer } from "./CustomerContainer";
import GetInfo from "./CustomerInfo";
import { Prospects } from "../prospect/Prospects/ProspectDescription";
import { Loading } from "../Utils/Loading";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ModalEditCustomer } from "./ModalEditCustomer";
import {
  DELETE_PROSPECT,
  DELETE_SUBPROSPECT,
  EDIT_PROSPECT,
} from "../../api/prospects/queries";
import { Prospect, Seller } from "../../logic/interfaces";
import {
  EditProspectCustomerInput,
  EditProspectInput,
} from "../../api/prospects/inputs";
import { EditProspectPayload } from "../../api/prospects/payloads";
import CheckIcon from "@mui/icons-material/Check";
import {
  ADD_ACTION,
  Action,
  AddActionPayload,
  DELETE_ACTION,
  GET_ACTION,
} from "../../api/action";
import VisibilityIcon from "@mui/icons-material/Visibility";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { GET_ACTIVITYLOG } from "../../api/activitylog";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

interface ActionInterface {
  comment: string;
  date: any;
  customerId: number;
}

let customerEdit: Customer = {
  id: 0,
  firstName: "",
  lastName: "",
  adresse: "",
  email: "",
  tlf: "",
  prospects: [],
  seller: {
    id: 0,
    fullName: "",
    email: "",
    employmentDate: "",
    resignationDate: "",
  },
  action: [],
};

const dateToday = new Date();

let defaultAction: ActionInterface = {
  comment: "",
  date: dateToday.toISOString().split("T")[0],
  customerId: 0,
};
let inpCustomer: Customer;

//GQL pagination skip const
const skipAmount = 0;
//GQL pagination take const
const takeAmount = 50;

export const Customers = () => {
  const breadcrumbs = [
    <Link underline="none" fontSize="12px" key="1" color="inherit" href="/">
      Home
    </Link>,
    <Link underline="none" fontSize="12px" key="3" color="inherit">
      Customer
    </Link>,
  ];
  const { loading, error, data } = useQuery<CustomerPayload>(GET_CUSTOMER);
  if (inpCustomer == undefined && data) {
    inpCustomer = data?.customers.items[0];
  }

  const [deleteProspect] = useMutation<number, { input: { id: number } }>(
    DELETE_PROSPECT,
    {
      refetchQueries: [
        {
          query: GET_CUSTOMER,
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
    }
  );

  const [deleteSubProspect] = useMutation<number, { input: { id: number } }>(
    DELETE_SUBPROSPECT,
    {
      refetchQueries: [
        {
          query: GET_CUSTOMER,
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
    }
  );

  const [deleteCustomer] = useMutation<number, { input: { id: number } }>(
    DELETE_CUSTOMER,
    {
      refetchQueries: [
        {
          query: GET_CUSTOMER,
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
    }
  );

  const [deleteAction] = useMutation<number, { input: { id: number } }>(
    DELETE_ACTION,
    {
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
    }
  );

  const [addAction] = useMutation<AddActionPayload, { input: ActionInterface }>(
    ADD_ACTION,
    {
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
    }
  );
  let decodedId: number;
  const deleteWrapper = (customer: Customer) => {
    console.log(customer);
    decodedId = parseInt(
      new TextDecoder()
        .decode(
          Uint8Array.from(atob(customer.id.toString()), (c) => c.charCodeAt(0))
        )
        .replace(/[^0-9]/g, "")
    );
    deleteCustomer({ variables: { input: { id: decodedId } } })
      .then((res) => {
        if (data?.customers.items.length == 1) {
          customer.prospects.forEach((prospects) => {
            deleteProspect({ variables: { input: { id: prospects.id } } })
              .then((res) => {
                prospects.subProspects.forEach((subProspects) => {
                  deleteSubProspect({
                    variables: { input: { id: subProspects.id } },
                  })
                    .then((res) => {})
                    .catch((e) => {
                      toast.error(
                        "Noe gikk galt ved sletting av Subprospects fra Prospects",
                        {
                          position: toast.POSITION.BOTTOM_RIGHT,
                        }
                      );
                      console.log(e);
                    });
                });
              })
              .catch((e) => {
                toast.error(
                  "Noe gikk galt ved sletting av Prospect fra Kunden",
                  {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  }
                );
                console.log(e);
              });
          });
        }
        customer.action.forEach((action) => {
          deleteAction({ variables: { input: { id: action.id } } })
            .then((res) => {})
            .catch((e) => {
              toast.error(
                "Noe gikk galt ved sletting av kommentarer til kunde",
                {
                  position: toast.POSITION.BOTTOM_RIGHT,
                }
              );
              console.log(e);
            });
        });

        toast.success("Customer og deres prospects ble slettet", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch((e) => {
        toast.error("Noe gikk galt ved sletting av Customer", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        console.log(e);
      });
  };

  const [customers, setCustomer] = React.useState(inpCustomer);

  function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  function createData(
    id: number,
    firstName: string,
    lastName: string,
    adresse: string,
    email: string,
    tlf: string,
    prospects: any[],
    seller: Seller,
    action: any[]
  ) {
    return {
      id,
      firstName,
      lastName,
      adresse,
      email,
      tlf,
      prospects,
      seller,
      action,
    };
  }

  const rows: any[] = [];

  data?.customers.items.map((customer) => {
    rows.push(
      createData(
        customer.id,
        customer.firstName,
        customer.lastName,
        customer.adresse,
        customer.email,
        customer.tlf,
        customer.prospects,
        customer.seller,
        customer.action
      )
    );
  });

  function CustomerInform(customer: Customer) {
    inpCustomer = customer;
    setCustomer(customer);
    return <GetInfo customer={customer} onClose={toggleMsgModal} />;
  }

  const [isMessageOpen, setMessageOpen] = React.useState(false);

  const toggleMessageModal = () => setMessageOpen(!isMessageOpen);
  function toggleMsgModal() {
    toggleMessageModal();
  }

  const [isModalOpen, setModalState] = React.useState(false);

  const toggleModal = () => setModalState(!isModalOpen);
  const openModal = (customer: Customer) => {
    customerEdit = customer;
    toggleModal();
  };

  const [open, setOpen] = React.useState(false);
  const [customerDel, setCustomerDel] = React.useState(customerEdit);
  const [customerID, setCustomerID] = React.useState("");
  let input: EditProspectCustomerInput;
  let [accept, setAccept] = React.useState(false);

  const handleClickOpen = (customer: Customer) => {
    setCustomerDel(customer);
    setOpen(true);
    data?.customers.items.length == 1 ? setAccept(true) : setAccept(false);
  };

  const handleClose = () => {
    setOpen(false);
    setMessageOpen(false);
    setCustomerID("");
  };

  const [currentAction, setCurrentAction] =
    useState<ActionInterface>(defaultAction);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value }: any = e.target;

    defaultAction.comment = value;
    let decodedId = parseInt(
      new TextDecoder()
        .decode(
          Uint8Array.from(atob(inpCustomer.id.toString()), (c) =>
            c.charCodeAt(0)
          )
        )
        .replace(/[^0-9]/g, "")
    );
    defaultAction.customerId = decodedId;

    setCurrentAction((prevAction) => ({
      ...prevAction,
      [name]: value,
    }));
  };

  const handleCloseMessage = () => {
    handleClose();
    addAction({ variables: { input: defaultAction } })
      .then((res) => {
        toast.success("Kommentar lagt til", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch((err) => {
        toast.error("Noe gikk galt med innlegging av en kommentar.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        console.log(err);
      });
  };

  const handleCloseButton = () => {
    handleClose();
    customerDel.prospects.map((prospects) => {
      input = {
        id: prospects.id,
        projectName: prospects.projectName,
        customerId: parseInt(customerID),
      };
      editProspect({ variables: { input: input } })
        .then((res) => {})
        .catch((e) => {
          toast.error("Noe gikk galt ved redigering av prospektet", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        });
    });
    deleteWrapper(customerDel);
  };

  const [editProspect] = useMutation<
    EditProspectPayload,
    { input: EditProspectInput }
  >(EDIT_PROSPECT, {
    refetchQueries: [
      {
        query: GET_CUSTOMER,
      },
      {
        query: GET_ACTIVITYLOG,
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleChange = (event: SelectChangeEvent) => {
    setCustomerID(event.target.value);
    setAccept(true);
  };

  let [filter, setFilter] = useState<string>("");
  function customerFilter(val: string) {
    setFilter(val);
  }

  function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [openCollapse, setOpenCollapse] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow key={row.id} hover>
          <TableCell style={{ border: "none" }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() =>
                row.action.length > 0 ? setOpenCollapse(!openCollapse) : null
              }
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell style={{ border: "none" }}>
            {row.firstName + " " + row.lastName}
          </TableCell>
          <TableCell style={{ border: "none", borderRight: "none" }}>
            {row.adresse}
          </TableCell>
          <TableCell style={{ border: "none" }}>{row.email}</TableCell>
          <TableCell style={{ border: "none" }}></TableCell>
          <TableCell style={{ textAlign: "right", border: "none" }}>
            {`(+47) ${row.tlf.slice(0, 3)} ${row.tlf.slice(
              3,
              5
            )} ${row.tlf.slice(5, 8)} `}
          </TableCell>
          <TableCell
            style={{
              display: "flex",
              justifyContent: "center",
              border: "none",
            }}
          >
            <IconButton
              onClick={() => openModal(row)}
              aria-label="edit"
              disableTouchRipple
            >
              <EditOutlinedIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                row.prospects.length > 0
                  ? handleClickOpen(row)
                  : deleteWrapper(row);
              }}
              aria-label="delete"
              disableTouchRipple
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
            <IconButton
              onClick={() => CustomerInform(row)}
              aria-label="delete"
              disableTouchRipple
            >
              <VisibilityIcon />
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
            <Collapse in={openCollapse} timeout="auto" unmountOnExit>
              <Box sx={{ display: "flex", flexDirection: "column", margin: 1 }}>
                <h2>Comment</h2>
                {row.action.map((rows) => (
                  <Box
                    key={rows.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid #e0e0e0",
                      flex: 1,
                    }}
                  >
                    <Box sx={{ flex: 1, margin: 0, p: 0 }}>
                      <p
                        style={{
                          color: "black",
                          fontSize: 16,
                          borderRight: "1px solid #e0e0e0",
                          marginBlockStart: 0,
                          marginBlockEnd: 0,
                          paddingBottom: "5px",
                          paddingTop: "10px",
                        }}
                      >
                        {rows.comment}
                      </p>
                    </Box>
                    <Box sx={{ flex: 1, textAlign: "right" }}>
                      <p
                        style={{
                          color: "black",
                          fontSize: 16,
                          marginBlockStart: 0,
                          marginBlockEnd: 0,
                          paddingBottom: "5px",
                          height: "100%",
                          paddingTop: "10px",
                        }}
                      >
                        {rows.date}
                      </p>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <>
      {data?.customers.items ? (
        <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flex: 1,
              mx: 1,
              mt: 1,
              color: "black",
              fontWeight: "950",
              letterSpacing: ".5px",
              fontSize: "14px",
            }}
          >
            <Box>CUSTOMERS</Box>
            <Box>
              <Breadcrumbs
                separator={<KeyboardArrowRightIcon fontSize="inherit" />}
                aria-label="breadcrumb"
              >
                {breadcrumbs}
              </Breadcrumbs>
            </Box>
          </Box>

          <Box
            sx={{
              boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.1)",
              display: "flex",
              m: 1,
              flexBasis: "100%",
              flexWrap: "wrap",
              background: "#ffffff",
              borderRadius: "5px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CustomerContainer
              onClose={(value: string) => customerFilter(value)}
            />
          </Box>

          <Box sx={{ display: "flex", flexBasis: "100%", m: 1 }}>
            <Box
              className={"table"}
              sx={{
                flex: 3,
                mr: 1,
                boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.1)",
                borderRadius: "10px",
                alignSelf: "self-start",
                background: "#ffffff",
              }}
            >
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead sx={{ background: "#f8f9f9" }}>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Full Name</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        Email
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell style={{ textAlign: "right" }}>
                        Phone Number
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ border: "none" }}>
                    {rows
                      .filter((cstm) =>
                        (cstm.firstName + " " + cstm.lastName)
                          .toLowerCase()
                          .includes(filter.toLowerCase())
                      )
                      .map((row) => (
                        <Row key={row.id} row={row} />
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box
              sx={{
                flex: 1,
                borderRadius: "10px",
                ml: 1,
                boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.1)",
                alignSelf: "self-start",
                background: "#ffffff",
              }}
            >
              <GetInfo customer={inpCustomer} onClose={toggleMsgModal} />
            </Box>
          </Box>
          <ModalEditCustomer
            title={"Edit Kontakt form"}
            isOpen={isModalOpen}
            onClose={toggleModal}
            customer={customerEdit}
          />
          <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={"sm"}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle
              id="responsive-dialog-title"
              sx={{ borderBottom: "1px solid #e0e0e0" }}
            >
              Are you sure you want to delete this customer?
            </DialogTitle>
            <DialogContent sx={{ my: 2, borderBottom: "1px solid #e0e0e0" }}>
              <DialogContentText sx={{ mb: 1 }}>
                {`${customerDel.firstName} ${customerDel.lastName} has ongoing prospects. Before deleting this customer, moving the following prospects will be neccessary`}
              </DialogContentText>
              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    borderRight: "1px solid #e0e0e0",
                  }}
                >
                  {customerDel.prospects.map((prospects) => (
                    <Box
                      key={prospects.id}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Box sx={{ flex: 1 }}>{prospects.projectName}</Box>
                    </Box>
                  ))}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FormControl sx={{ minWidth: "50%" }} size="small">
                    <Select
                      value={customerID}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="" disabled>
                        {customerDel.firstName}
                      </MenuItem>
                      {data?.customers.items.map((customers) =>
                        customers.firstName != customerDel.firstName ? (
                          <MenuItem
                            key={`${customers.id}__${customers.firstName}`}
                            value={customers.id}
                          >
                            {customers.firstName}
                          </MenuItem>
                        ) : null
                      )}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <IconButton
                onClick={handleCloseButton}
                disabled={!accept}
                aria-label="delete"
                disableTouchRipple
              >
                <CheckIcon />
              </IconButton>
            </DialogActions>
          </Dialog>
          <Dialog
            open={isMessageOpen}
            onClose={handleClose}
            maxWidth={"sm"}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle
              id="responsive-dialog-title"
              sx={{ borderBottom: "1px solid #e0e0e0" }}
            >
              Comment
            </DialogTitle>
            <DialogContent sx={{ my: 2, borderBottom: "1px solid #e0e0e0" }}>
              <DialogContentText sx={{ mb: 1 }}>
                {`Leave a comment for ${inpCustomer.firstName} ${inpCustomer.lastName}`}
              </DialogContentText>
              <TextField
                id="comment"
                name="comment"
                label="Comment"
                placeholder="Write a comment"
                multiline
                fullWidth
                onChange={handleMessageChange}
              />
            </DialogContent>
            <DialogActions>
              <IconButton
                onClick={handleCloseMessage}
                aria-label="delete"
                disableTouchRipple
              >
                <CheckIcon />
              </IconButton>
            </DialogActions>
          </Dialog>

          <ToastContainer />
        </Box>
      ) : (
        <Loading />
      )}
    </>
  );
};
