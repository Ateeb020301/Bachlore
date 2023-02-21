import { Financial } from "../../../components/ChartLogic/chartlogic";
import { useQuery } from "@apollo/client";
import { GET_REVENUE, GET__FINANCIAL_YEARS } from "../../../api/financials/queries";
import { faker } from '@faker-js/faker';

interface GetRevenuePayload {
    allFinancials: Financial[];
}

export const yearFinances: Financial[] = [];
export const getFinances: Financial[] = [];

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July',];


export const dataMulti = {
  labels,
  datasets: [
    {
      label: 'Revenue',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      yAxisID: 'y',
    },
    {
      label: 'Actual Revenue',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      yAxisID: 'y1',
    },
  ],
};