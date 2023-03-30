import * as React from 'react';
import { useQuery } from '@apollo/client';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useParams } from 'react-router-dom';
import { GET_CONSULTANT, GET_SINGLECONSULTANTS } from '../../../api/consultants';
import { GetConsultantContractsPayload } from '../../../api/contract/payloads';
import { TableHead } from '@mui/material';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

export default function CustomPaginationActionsTable() {
    const getId = useParams();

    const { loading, error, data } = useQuery<GetConsultantContractsPayload>(
        GET_SINGLECONSULTANTS,
        {
            variables: { id: Number(getId.id) },
        }
    );

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
      
      function createData(customerName: string, projectName: string, id: number, contracts: any[]) {
        return { customerName, projectName, id, contracts };
      }
      
      const rows: any[] = [];
      console.log(rows)

      data?.consultant[0].projectConsultants.map((projectConsultants) => {
        rows.push(createData(projectConsultants.project.projectName, projectConsultants.project.customerName, projectConsultants.project.id, projectConsultants.project.contracts));
      })


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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


  let dataP;
  dataP = data?.consultant[0].projectConsultants.length ?? 0;
  return (
    <TableContainer component={Paper} sx={{borderCollapse: 'none'}}>
      <Table sx={{ minWidth: 100, borderCollapse: 'unset'}} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <TableCell>Id</TableCell> 
            <TableCell>Project Name</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Total Contracts</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell style={{ width: 160 }}>
                {row.customerName}
              </TableCell>
              <TableCell style={{ width: 160 }}>
                {row.projectName}
              </TableCell>
              <TableCell style={{ width: 160 }}>
                {row.contracts.length}
              </TableCell>

            </TableRow>
          ))}

        </TableBody>
        <TableFooter sx={{color: 'black'}}>
          <TableRow>
            <TablePagination
              sx={{color: 'black'}}
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
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
  );
}