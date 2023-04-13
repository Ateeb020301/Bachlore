import React from 'react';
import {  GET_CUSTOMER, CustomerPayload, DELETE_CUSTOMER, Customer } from '../../api/customer';
import { useMutation, useQuery } from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { Box, Breadcrumbs, IconButton, Link, TableHead, useTheme } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { CustomerContainer } from './CustomerContainer';
import GetInfo from './CustomerInfo';
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
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { ModalEditCustomer } from './ModalEditCustomer';
import { DELETE_PROSPECT, DELETE_SUBPROSPECT } from '../../api/prospects/queries';

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
  }

  let customerEdit: DefaultCustomer = {
    id: 0,
    firstName: '',
    lastName: '',
    adresse: '',
    email:'',
    tlf: ''
};
  let inpCustomer : Customer;
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
    const { data } = useQuery<CustomerPayload>(GET_CUSTOMER);
    if (inpCustomer == undefined && data) {
      inpCustomer = data?.customers.items[0];
    }

    const [deleteProspect] = useMutation<number, { input: { id: number } }>(DELETE_PROSPECT, {
      refetchQueries: [
          {
              query: GET_CUSTOMER
          },
      ],
      awaitRefetchQueries: true,
  });

  const [deleteSubProspect] = useMutation<number, { input: { id: number } }>(DELETE_SUBPROSPECT, {
      refetchQueries: [
          {
              query: GET_CUSTOMER
          },
      ],
      awaitRefetchQueries: true,
  });

  const [deleteCustomer] = useMutation<number, { input: { id: number } }>(DELETE_CUSTOMER, {
    refetchQueries: [
        {
            query: GET_CUSTOMER
        },
    ],
    awaitRefetchQueries: true,
  });

  const deleteWrapper = (customer: Customer) => {
    deleteCustomer({ variables: { input: { id:  customer.id } } })
        .then((res) => {;
          console.log(customer);
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
    return GetInfo(inpCustomer);
  } 

  const [isModalOpen, setModalState] = React.useState(false);

  const toggleModal = () => setModalState(!isModalOpen);

  const openModal = (customer: Customer) => {
    customerEdit = customer;
    toggleModal();
  }



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
                                    <IconButton onClick={() => deleteWrapper(row)} aria-label="delete" disableRipple>
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
                      {GetInfo(inpCustomer)}
                  </Box>
              </Box>
              <ModalEditCustomer
                  title={'Edit Kontakt form'}
                  isOpen={isModalOpen}
                  onClose={toggleModal}
                  customer={customerEdit}
                />
              <ToastContainer />
          </Box>
      ) : (
          <Loading />
      )}
      </>
  );

}