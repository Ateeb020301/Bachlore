import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useQuery } from '@apollo/client';
import { GET__FINANCIAL_YEARS } from '../../api/financials/queries';
import { Financial, GetData, GetDisplayData, YearCalculation } from '../../components/ChartLogic/chartlogic';

export let yearOut = 2017;



export const SelectYear = () => {
  const [year, setYear] = React.useState(2017);

  const handleChange = (event: SelectChangeEvent) => {
    setYear(parseInt(event.target.value));
    yearOut = parseInt(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 100, height: 50 }}>
      <FormControl fullWidth sx={{}}>
        <InputLabel id="demo-simple-select-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="yearSelect"
          value={year.toString()}
          label="year"
          onChange={handleChange}>
          <MenuItem value={2017}>2017</MenuItem>
          <MenuItem value={2018}>2018</MenuItem>
          <MenuItem value={2019}>2019</MenuItem>
          <MenuItem value={2020}>2020</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}