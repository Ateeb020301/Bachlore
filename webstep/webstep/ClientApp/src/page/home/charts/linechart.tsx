import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from 'chart.js';
import { faker } from '@faker-js/faker';
import { Line } from 'react-chartjs-2';
import React from 'react';
import { yearOut } from './mutliaxis';
import { getMonthName } from '../../../logic/getMonth';
import { Financial } from '../../../components/ChartLogic/chartlogic';
import { GET_REVENUE } from '../../../api/financials/queries';
import { useQuery } from '@apollo/client';

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
  
let labels: string[] = [];
let profit: number[] = [];
let sum = 0;

export function SumProfit() {
  labels = [];
  profit = [];
  sum = 0;

  const { loading, error, data, refetch } = useQuery<GetRevenuePayload>(GET_REVENUE, { variables: { input: yearOut } });
  data?.financial.forEach((data) => {
    labels.push(getMonthName(data.month) + " " + yearOut);
    profit.push((data.actualRevenue-data.revenue));
  })

  for (let i = 0; i < profit.length; i++) {
    sum += profit[i];
  }

  return sum.toLocaleString();
}

  export const ProfitLine = () => {
    const optionsLine = {
      type: 'line',
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
      },
      elements: {
          line: {
              tension : 0.4  // smooth lines
          }
      },
      scales: {
        x: {
          display: false,
          grid: {
            display: false
          }
        },
        y: {
          display: false,
          grid: {
            display: false
          }
        }
      }
    };

    const dataLine = {
      labels,
      datasets: [
        {
          data: profit,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          innerHeight: '50px',
          outerHeight: '50px',
        },
      ],
    };
    const element = (
      <Line options={optionsLine} data={dataLine} />
    )
    return element;
  }