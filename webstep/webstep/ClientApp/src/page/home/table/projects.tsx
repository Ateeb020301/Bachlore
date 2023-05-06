import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ProjectConsultant, ProjectWithoutContract } from '../../../logic/interfaces';


interface TableProps {
  project: ProjectWithoutContract[];
}

export const CollapsibleTable: React.FC<TableProps> = ({project}) => {


  function createData(
    id: number,
    projectName: string,
    customerName: string,
    projectConsultants: ProjectConsultant[],
  ) {
    return {
      id,
      projectName,
      customerName,
      projectConsultants
    };
  }

  const rows : any[] = [];
  console.log(project)
  if (project != undefined) {
    project.map((projects) => {
      rows.push(createData(projects.id, projects.projectName, projects.customerName, projects.projectConsultants))
    })
  }

  
  function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">{row.id}</TableCell>
          <TableCell align='center'>{row.projectName}</TableCell>
          <TableCell align='center'>{row.customerName}</TableCell>
          <TableCell align='center'>{row.projectConsultants.length}</TableCell>
          <TableCell />
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Team of consultants
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell align="right">Employment Date</TableCell>
                      <TableCell align="right">Workdays</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{border: 'none'}}>
                    {row.projectConsultants.map((pConsultant) => (
                      <TableRow key={pConsultant.consultant.id}>
                        <TableCell component="th" scope="row">
                          {pConsultant.consultant.firstName}
                        </TableCell>
                        <TableCell>{pConsultant.consultant.lastName}</TableCell>
                        <TableCell align="right">{pConsultant.consultant.employmentDate}</TableCell>
                        <TableCell align="right">
                          {pConsultant.consultant.workdays}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
  
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead sx={{background: '#f8f9f9'}}>
          <TableRow>
            <TableCell />
            <TableCell >#</TableCell>
            <TableCell align='center'>Project Name</TableCell>
            <TableCell align='center'>Customer Name</TableCell>
            <TableCell align='center'>Team Members</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody sx={{border: 'none'}}>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}