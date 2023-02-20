import React, { useReducer, useState } from 'react';
import { getMonthName } from '../../../logic/getMonth';
import { useQuery } from '@apollo/client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { GET_REVENUE } from '../../../api/financials/queries';
import { Financial } from '../../../components/ChartLogic/chartlogic';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GetRevenuePayload {
  financial: Financial[];
}

export let yearOut = 2017;
let labels: any[] = [];
let estRevenue: any[] = [];
let actRevenue: any[] = [];


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


const MultiAxis = () => {
  actRevenue = [];
  estRevenue = [];
  labels = [];

  const { loading, error, data, refetch } = useQuery<GetRevenuePayload>(GET_REVENUE, { variables: { input: yearOut } });
  data?.financial.forEach((data) => {
    labels.push(getMonthName(data.month));
    actRevenue.push(data.actualRevenue);
    estRevenue.push(data.revenue);
  })

  const dataMulti = {
    labels,
    datasets: [
      {
        label: 'Actual Revenue',
        data: actRevenue,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Estimated Revenue',
        data: estRevenue,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',
      },
    ],
  };


  const element = (
    <Line 
          key={yearOut}
          height={95} 
          data={dataMulti} 
          options={{
            responsive: true,
            interaction: {
              mode: 'index',
              intersect: false,
            },
            plugins: {
              legend: {
                  display: false
              },
              title: {
                display: false,
                text: 'Revenue vs Actual Revenue',
              },
            },
            elements: {
              line: {
                  tension : 0.4 // smooth lines
              }
            },
            scales: {
              x: {
                  grid: {
                      display: false
                  },
              },
              y: {
                type: 'linear',
                display: true,
                suggestedMin: 600000,
                position: 'left',
                grid: {
                  display: false
                },
              },
              y1: {
                type: 'linear',
                display: false,
                position: 'right',
                grid: {
                  drawOnChartArea: false,
                },
              },
            },
        }}/>
  )

  return element
}

export default MultiAxis;
