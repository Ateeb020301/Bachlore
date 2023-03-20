import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { setLabels } from 'react-chartjs-2/dist/utils';


ChartJS.register(ArcElement, Tooltip, Legend);

interface MonthlyPayload {
    month: string;
    salary: number;
}

interface ChartDoughnutProps {
    dataSalary: MonthlyPayload[];
}

export const ChartDoughnut: React.FC<ChartDoughnutProps> = ({dataSalary}) => {
    console.log(dataSalary);
    let arraySalary: any[] = [];
    let labels: any[] = [];
    for (let i = 0; i < dataSalary.length; i++) {
        arraySalary.push(dataSalary[i].salary);
        labels.push(dataSalary[i].month);
    }
    const data = {
        labels,
        datasets: [
          {
            label: "Salary",
            data: arraySalary,
            backgroundColor: [
              "#336699",
              "#99CCFF",
              "#999933",
              "#666699",
              "#CC9933",
              "#006666",
              "#3399FF",
              "#993300",
              "#CCCC99",
              "#666666",
              "#666666",
              "#666666",
            ],
            display: true,
            borderColor: "#D1D6DC"
          }
        ]
      };
      
      return (
          <Doughnut
            data={data}
            height={50}
            width={50}
            options={{
              plugins: {
                legend: {
                  display: false
                },

              },
              rotation: -90,
              circumference: 180,
              cutout: "60%",
              maintainAspectRatio: true,
              responsive: true
            }}
          />
      );
}

export default ChartDoughnut;