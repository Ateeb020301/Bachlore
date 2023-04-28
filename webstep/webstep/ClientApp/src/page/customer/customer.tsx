import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import { AddCustomerPayload, ADD_CUSTOMER, GET_CUSTOMER, CustomerPayload, DELETE_CUSTOMER, Customer, GET_CUSTOMERS } from '../../api/customer';
import { useMutation, useQuery } from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { Box, Breadcrumbs, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, FormControl, FormControlLabel, FormHelperText, IconButton, InputLabel, Link, MenuItem, Select, SelectChangeEvent, Switch, TableHead, TextField, useTheme } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { CustomerContainer } from './CustomerContainer';
import GetInfo from './CustomerInfo';
import { Prospects } from '../prospect/Prospects/ProspectDescription';
import { Loading } from '../Utils/Loading';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { ModalEditCustomer } from './ModalEditCustomer';
import { DELETE_PROSPECT, DELETE_SUBPROSPECT, EDIT_PROSPECT } from '../../api/prospects/queries';
import { Prospect } from '../../logic/interfaces';
import { EditProspectCustomerInput, EditProspectInput } from '../../api/prospects/inputs';
import { EditProspectPayload } from '../../api/prospects/payloads';
import CheckIcon from '@mui/icons-material/Check';
import { ADD_ACTION, Action, AddActionPayload, GET_ACTION } from '../../api/action';

  interface TablePaginationActionsProps {
      count: number;
      page: number;
      rowsPerPage: number;
      onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
      ) => void;
  }

  interface DefaultCustomer {
    id: number;
    firstName: string;
    lastName: string;
    adresse: string;
    email: string;
    tlf: string;
    prospects: Prospect[];
  }

  interface ActionInterface {
    comment: string;
    customerId: number;
  }

  let customerEdit: DefaultCustomer = {
    id: 0,
    firstName: '',
    lastName: '',
    adresse: '',
    email:'',
    tlf: '',
    prospects: []
  };
  let defaultAction: ActionInterface = {
    comment: '',
    customerId: 0
  };
  let inpCustomer : Customer;

//GQL pagination skip const
const skipAmount = 0;
//GQL pagination take const
const takeAmount = 50;

  export const Customers = () => {

    const breadcrumbs = [
        <Link underline="none" fontSize="12px" key="1" color="inherit" href="/">
            Home
        </Link>,
        <Link
            underline="none"
            fontSize="12px"
            key="3"
            color="inherit">
            Customer
        </Link>,
    ];
    const { loading, error, data } = useQuery<CustomerPayload>(GET_CUSTOMER);
    if (inpCustomer == undefined && data) {
      inpCustomer = data?.customers.items[0];
    }

    const [deleteProspect] = useMutation<number, { input: { id: number } }>(DELETE_PROSPECT, {
      refetchQueries: [
          {
              query: GET_CUSTOMER
          },
          {
              query: GET_CUSTOMERS,
              pollInterval: 500,
              variables: { skipAmount: skipAmount, takeAmount: takeAmount }
          }
      ],
      awaitRefetchQueries: true,
  });

  const [deleteSubProspect] = useMutation<number, { input: { id: number } }>(DELETE_SUBPROSPECT, {
      refetchQueries: [
          {
              query: GET_CUSTOMER
          },
          {
            query: GET_CUSTOMERS,
            pollInterval: 500,
            variables: { skipAmount: skipAmount, takeAmount: takeAmount }
          }
      ],
      awaitRefetchQueries: true,
  });

  const [deleteCustomer] = useMutation<number, { input: { id: number } }>(DELETE_CUSTOMER, {
    refetchQueries: [
        {
            query: GET_CUSTOMER
        },
        {
          query: GET_CUSTOMERS,
          pollInterval: 500,
          variables: { skipAmount: skipAmount, takeAmount: takeAmount }
        }
    ],
    awaitRefetchQueries: true,
  });

  const [addAction] = useMutation<AddActionPayload, { input: ActionInterface }>(
    ADD_ACTION, {
        refetchQueries: [
            {
                query: GET_ACTION,
            },
        ],
        awaitRefetchQueries: true,
    }
);

  const deleteWrapper = (customer: Customer) => {
    deleteCustomer({ variables: { input: { id:  customer.id } } })
        .then((res) => {;
          console.log(customer);
            (data?.customers.items.length == 1 ?? (
              customer.prospects.forEach((prospects) => {
                deleteProspect({ variables: { input: { id: prospects.id } } })
                    .then((res) => {
                      prospects.subProspects.forEach((subProspects) => {
                        deleteSubProspect({ variables: { input: { id: subProspects.id } } })
                            .then((res) => {
        
                            })
                            .catch((e) => {
        
                                toast.error('Noe gikk galt ved sletting av Subprospects fra Prospects', {
                                    position: toast.POSITION.BOTTOM_RIGHT
                                })
                                console.log(e);
                            });
                    })
                    })
                    .catch((e) => {
                        toast.error('Noe gikk galt ved sletting av Prospect fra Kunden', {
                            position: toast.POSITION.BOTTOM_RIGHT
                        })
                        console.log(e);
                    });
            })
            ));

            toast.success('Customer og deres prospects ble slettet', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
        .catch((e) => {

            toast.error('Noe gikk galt ved sletting av Customer', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            console.log(e);
        });
};
    
  const [customers, setCustomer] = React.useState(inpCustomer);
    


  function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
    
  function createData(id: number, firstName: string, lastName: string, adresse:string, email: string, tlf: string, prospects: any[]) {
    return { id, firstName, lastName, adresse, email, tlf, prospects };
  }

  const rows: any[] = [];

  data?.customers.items.map((customer) => {
      rows.push(createData(customer.id, customer.firstName, customer.lastName,customer.adresse, customer.email, customer.tlf, customer.prospects))
  })


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function CustomerInform(customer: Customer) {
    inpCustomer = customer;
    setCustomer(customer)
    return (
      <GetInfo customer={customer} onClose={test}/>
    );
  } 

  const [isMessageOpen, setMessageOpen] = React.useState(false);

  const toggleMessageModal = () => setMessageOpen(!isMessageOpen);
  function test() {
      toggleMessageModal();
  }

  const [isModalOpen, setModalState] = React.useState(false);

  const toggleModal = () => setModalState(!isModalOpen);
  const openModal = (customer: Customer) => {
    customerEdit = customer;
    toggleModal();
  }

  const [open, setOpen] = React.useState(false);
  const [customerDel, setCustomerDel] = React.useState(customerEdit)
  const [customerID, setCustomerID] = React.useState('');
  let input: EditProspectCustomerInput;
  let [accept, setAccept] = React.useState(false);

  const handleClickOpen = (customer: Customer) => {
    setCustomerDel(customer)
    console.log(data?.customers.items.length)
    setOpen(true);
    (data?.customers.items.length == 1 ? (
        setAccept(true)
    ) : (
        setAccept(false)
    ))
  };

  const handleClose = () => {
    setOpen(false);
    setMessageOpen(false);
    setCustomerID('');
  };

  const [currentAction, setCurrentAction] = useState<ActionInterface>(defaultAction);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let { name, value } : any = e.target;

      defaultAction.comment = value;
      defaultAction.customerId = inpCustomer.id;

      setCurrentAction((prevAction) => ({
          ...prevAction,
          [name]: value,
      }));

      console.log(defaultAction)
  };

  const handleCloseMessage = () => {
    handleClose();
    console.log(defaultAction)
    addAction({ variables: { input: defaultAction } })
        .then((res) => {
            toast.success('Kommentar lagt til', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
        .catch((err) => {
            toast.error('Noe gikk galt med innlegging av en kommentar.', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            console.log(err)
        });
  }

  const handleCloseButton = () => {
    handleClose();
    customerDel.prospects.map((prospects) => {
      input = { id: prospects.id, projectName: prospects.projectName, customerId: parseInt(customerID)};
      editProspect({ variables: { input: input } })
      .then((res) => {
      })
      .catch((e) => {
          toast.error('Noe gikk galt ved redigering av prospektet', {
              position: toast.POSITION.BOTTOM_RIGHT
          })
      });
    })
    deleteWrapper(customerDel)
  };

  const [editProspect] = useMutation<EditProspectPayload, { input: EditProspectInput }>(EDIT_PROSPECT, {
    refetchQueries: [
        {
            query: GET_CUSTOMER,
        },
    ],
    awaitRefetchQueries: true,
  });
  

  const handleChange = (event: SelectChangeEvent) => {
    setCustomerID(event.target.value);
    setAccept(true);
  };

  return (
      <>
      {data?.customers.items ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2}}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between',flex: 1, mx: 1, mt:1, color: 'black', fontWeight: '950', letterSpacing: '.5px', fontSize: '14px' }}>
                  <Box>
                      CUSTOMERS
                  </Box>
                  <Box>
                      <Breadcrumbs separator={<KeyboardArrowRightIcon fontSize="inherit" />} aria-label="breadcrumb">
                          {breadcrumbs}
                      </Breadcrumbs>
                  </Box>
              </Box>
  
              <Box sx={{boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.1)', display: 'flex', m: 1, flexBasis: '100%', flexWrap:'wrap', background: "#ffffff", borderRadius: '5px', justifyContent: 'space-between', alignItems: 'center' }}>
                  <CustomerContainer />
              </Box>
  
              <Box sx={{display: 'flex', flexBasis: '100%', m: 1}}>
                  <Box className={'table'} sx={{flex: 3, mr: 1, boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.1)', borderRadius: '10px', alignSelf: 'self-start', background: '#ffffff'}}>
                      <TableContainer>
                          <Table aria-label="custom pagination table">
                          <TableHead>
                              <TableRow>
                                  <TableCell>Id</TableCell> 
                                  <TableCell>Full Name</TableCell>
                                  <TableCell>Address</TableCell>
                                  <TableCell>Email</TableCell>
                                  <TableCell style={{textAlign: 'right'}}>Phone Number</TableCell>
                                  <TableCell style={{textAlign: 'center'}}>Actions</TableCell>
                              
                              </TableRow>
                              </TableHead>
                              <TableBody sx={{border: 'none'}}>
                              {(rowsPerPage > 0
                                  ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                  : rows
                              ).map((row) => (
                                  <TableRow key={row.id}  hover>
                                  <TableCell onClick={() => CustomerInform(row)} style={{border: 'none', borderBottom: '1px solid #e0e0e0'}}>
                                      {row.id}
                                  </TableCell>
                                  <TableCell onClick={() => CustomerInform(row)} style={{border: 'none', borderBottom: '1px solid #e0e0e0'}}>
                                      {row.firstName + " " + row.lastName} 
                                  </TableCell>
                                  <TableCell onClick={() => CustomerInform(row)} style={{border: 'none', borderBottom: '1px solid #e0e0e0', borderRight: 'none'}}>
                                      {row.adresse}
                                  </TableCell>
                                  <TableCell onClick={() => CustomerInform(row)} style={{border: 'none', borderBottom: '1px solid #e0e0e0'}}>
                                      {row.email}
                                  </TableCell>
                                  <TableCell onClick={() => CustomerInform(row)} style={{textAlign: 'right', border: 'none', borderBottom: '1px solid #e0e0e0' }}>
                                      {`(+47) ${row.tlf.slice(0,3)} ${row.tlf.slice(3,5)} ${row.tlf.slice(5,8)} `}
                                  </TableCell>
                                  <TableCell style={{display: 'flex', justifyContent: 'center', border: 'none', borderBottom: '1px solid #e0e0e0' }}>
                                    <IconButton onClick={() => openModal(row)} aria-label="edit" disableTouchRipple>
                                      <EditOutlinedIcon />
                                    </IconButton>
                                    <IconButton onClick={() => {(row.prospects.length > 0 ? (handleClickOpen(row)) : (deleteWrapper(row)))}} aria-label="delete" disableTouchRipple>
                                      <DeleteOutlineOutlinedIcon />
                                    </IconButton>
                                  </TableCell>
                                  </TableRow>
                              ))}

                              </TableBody>
                              <TableFooter sx={{color: 'black'}}>
                              <TableRow>
                                  <TablePagination
                                  sx={{color: 'black'}}
                                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                  colSpan={5}
                                  count={rows.length}
                                  rowsPerPage={rowsPerPage}
                                  page={page}
                                  SelectProps={{
                                      inputProps: {
                                      'aria-label': 'rows per page',
                                      'className': 'pTable'
                                      },
                                      native: true,
                                  }}
                                  onPageChange={handleChangePage}
                                  onRowsPerPageChange={handleChangeRowsPerPage}
                                  ActionsComponent={TablePaginationActions}
                                  />
                              </TableRow>
                              </TableFooter>
                          </Table>
                      </TableContainer>
                  </Box>
  
                  <Box sx={{flex: 1, borderRadius: '10px', ml: 1, boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.1)', alignSelf: 'self-start', background: '#ffffff'}}>
                      <GetInfo customer={inpCustomer} onClose={test}/>
                  </Box>
              </Box>
              <ModalEditCustomer
                  title={'Edit Kontakt form'}
                  isOpen={isModalOpen}
                  onClose={toggleModal}
                  customer={customerEdit}
                />
              <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={'sm'}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title" sx={{borderBottom: '1px solid #e0e0e0'}}>
                  Are you sure you want to delete this customer?
                </DialogTitle>
                <DialogContent sx={{my: 2, borderBottom: '1px solid #e0e0e0' }}>
                  <DialogContentText sx={{mb: 1}}>
                    {`${customerDel.firstName} ${customerDel.lastName} has ongoing prospects. Before deleting this customer, moving the following prospects will be neccessary`}
                  </DialogContentText>
                  <Box sx={{display: 'flex'}}>
                    <Box sx={{flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'column', borderRight: '1px solid #e0e0e0'}}>
                      {customerDel.prospects.map((prospects) => 
                          <Box key={prospects.id} sx={{display: 'flex', alignItems: 'center'}}>
                            <Box sx={{flex: 1}}>{prospects.projectName}</Box>
                          </Box>

                      )}
                    </Box>
                    <Box sx={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <FormControl sx={{minWidth: '50%' }} size='small'>
                          <Select
                            value={customerID}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                          >
                            <MenuItem value="" disabled>
                              {customerDel.firstName}
                            </MenuItem>
                            {data?.customers.items.map((customers) => 
                              (customers.firstName != customerDel.firstName ? (<MenuItem key={`${customers.id}__${customers.firstName}`} value={customers.id}>{customers.firstName}</MenuItem>) : (null) )
                            )}
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                <IconButton onClick={handleCloseButton}  disabled={!accept} aria-label="delete" disableTouchRipple>
                    <CheckIcon />
                </IconButton>
                </DialogActions>
              </Dialog>
              <Dialog
                open={isMessageOpen}
                onClose={handleClose}
                maxWidth={'sm'}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title" sx={{ borderBottom: '1px solid #e0e0e0' }}>
                    Comment
                </DialogTitle>
                <DialogContent sx={{ my: 2, borderBottom: '1px solid #e0e0e0' }}>
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
                    <IconButton onClick={handleCloseMessage} aria-label="delete" disableTouchRipple>
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

}