import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useQuery } from '@apollo/client';
import { GET_REVENUE } from '../../../api/financials/queries';
import { Doughnut } from 'react-chartjs-2';
import { Financial } from '../../../components/ChartLogic/chartlogic';
import { getMonthName } from '../../../logic/getMonth';


ChartJS.register(ArcElement, Tooltip, Legend);

interface GetRevenuePayload {
  financial: Financial[];
}

let labels: string[] = [];
let actRev: number[] = [];
let estRev: number[] = [];
let sum = 0;
let estSum = 0;
export let targetPercentage = 0;

export function SumAnually(yearOut: React.Key | null | undefined) {
  labels = [];
  actRev = [];
  estRev = [];
  sum = 0;
  estSum = 0;

  const { data } = useQuery<GetRevenuePayload>(GET_REVENUE, { variables: { input: yearOut } });
  data?.financial.forEach((data) => {
    labels.push(getMonthName(data.month) + " " + yearOut);
    actRev.push(data.actualRevenue)
    estRev.push(data.revenue)
  })

  for (let i = 0; i < actRev.length; i++) {
    sum += actRev[i];
    estSum += estRev[i];
  }
  targetPercentage = (sum/estSum)*100;

  return sum.toLocaleString();
}


function DoughnutChart(yearOut: React.Key | null | undefined) {
  labels = [];
  actRev = [];
  estRev = [];
  const { data } = useQuery<GetRevenuePayload>(GET_REVENUE, { variables: { input: yearOut } });
  data?.financial.forEach((data) => {
    labels.push(getMonthName(data.month) + " " + yearOut);
    actRev.push(data.actualRevenue)
    estRev.push(data.revenue)
  })

  const dataDoughnut = {
    labels,
    datasets: [
      {
        label: 'Actual revenue',
        data: actRev,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  

  const optionsDoughnut = {
    type: 'doughnut',
    data: dataDoughnut,
    plugins: { 
      legend: { 
        display: false, 
      },
    },
    options: {
        responsive: true,
    }
  }
  
  const element = (
    <Doughnut data={dataDoughnut} options={optionsDoughnut}/>
  )
  return element
}

export default DoughnutChart;