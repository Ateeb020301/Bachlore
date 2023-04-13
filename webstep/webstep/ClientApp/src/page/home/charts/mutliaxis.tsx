import React from 'react';
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



function MultiAxis(yearOut: React.Key | null | undefined) {
  actRevenue = [];
  estRevenue = [];
  labels = [];

  const { data } = useQuery<GetRevenuePayload>(GET_REVENUE, { variables: { input: yearOut } });
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
