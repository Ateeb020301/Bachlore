import {gql} from '@apollo/client';

//Retrieves last x months of revenue data
export const GET_REVENUE = gql`
query($input: Int!) {
  financial(year: $input) {
    year
    month
    revenue
    actualRevenue
    accumulatedRevenue
    accumulatedActualRevenue
  }
}
`;

//Retrieves last x months of estimated Budget
export const GET_ESTIMATED_BUDGET = gql`
query($input: Int!) {
  financial(year: $input) {
    	year
      month
      eBIT
      actualEBIT
      accumulatedEBIT
      accumulatedActualEBIT
  }
} 
`;

//Retrieves last x months of estimated Budget
export const GET_EMPLOYEE_BUDGET = gql`
query($input: Int!) {
  consultants(order:[{employmentDate:DESC}] take:$input) {
    items {
      firstName
      employmentDate
      resignationDate
    }
  }
}
`;

/*date1: consultants(order:[{employmentDate:DESC}] take:$input date: $date1) {
    items {
      firstName
      employmentDate
      resignationDate
    }
  }$date1: LocalDate*/
  export const GET_CONSULTANTS = gql `
  query($input: Int! $date1: LocalDate $date2: LocalDate $date3: LocalDate $date4: LocalDate $date5: LocalDate $date6: LocalDate) {
    date1: consultants(order:[{employmentDate:DESC}] take:$input date: $date1) {
      items {
        firstName
        employmentDate
        resignationDate
      }
    }
    date2: consultants(order:[{employmentDate:DESC}] take:$input date: $date2) {
      items {
        firstName
        employmentDate
        resignationDate
      }
    }
    date3: consultants(order:[{employmentDate:DESC}] take:$input date: $date3) {
      items {
        firstName
        employmentDate
        resignationDate
      }
    }
    date4: consultants(order:[{employmentDate:DESC}] take:$input date: $date4) {
      items {
        firstName
        employmentDate
        resignationDate
      }
    }
    date5: consultants(order:[{employmentDate:DESC}] take:$input date: $date5) {
      items {
        firstName
        employmentDate
        resignationDate
      }
    }
    date6: consultants(order:[{employmentDate:DESC}] take:$input date: $date6) {
      items {
        firstName
        employmentDate
        resignationDate
      }
    }
  }`;
  

//Retrieve hourly rate
export const GET_HOURLY_RATE = gql `
query ($input: Int!){
  financial (year: $input){

      defaultHourlyRate
      actualHourlyRate
      month
      year

  }
}
`;

//Retrieve forecast
export const GET_FORECAST = gql `
query($week: Int! $year: Int! $week1: Int! $year1: Int! $week2: Int! $year2: Int! $week3: Int! $year3: Int! $week4: Int! $year4: Int!) {
  now: contractForecast( week: $week year: $year)
  plus4weeks: contractForecast( week: $week1 year: $year1)
  plus8weeks: contractForecast( week: $week2 year: $year2)
  plus3months: contractForecast( week: $week3 year: $year3)
  plus6months: contractForecast( week: $week4 year: $year4)
}
`;

//Retrieve onContract
export const GET_ON_CONTRACT = gql `
query($week: Int! $year: Int! $week1: Int! $year1: Int! $week2: Int! $year2: Int! $week3: Int! $year3: Int! $week4: Int! $year4: Int!) {
  now: contractBillable( week: $week year: $year)
  plus4weeks: contractBillable( week: $week1 year: $year1)
  plus8weeks: contractBillable( week: $week2 year: $year2)
  plus3months: contractBillable( week: $week3 year: $year3)
  plus6months: contractBillable( week: $week4 year: $year4)
}
`