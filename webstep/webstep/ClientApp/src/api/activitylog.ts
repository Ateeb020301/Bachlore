import { gql } from '@apollo/client';

export interface ActivityLog {
    id: number,
    type:string, 
    method: string,
    oldValues: string,
    newValues: string,
    date: any;
}
export interface GetActivityLogPayload {
    activitylog: { items: ActivityLog[] }
}



export const GET_ACTIVITYLOG = gql`
    query {
        activitylog {
            items {
                id
                type
                method
                oldValues
                newValues
                date
            }
        }
    }
`;
