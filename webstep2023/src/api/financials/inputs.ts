import { PageInfo } from "../../logic/interfaces";

export interface Data{
	financials: Financials;
	}
	
export 	interface Financials{
	items: Item[];
	}
	
export	interface Item{
    actualHourlyRate: any;
    defaultHourlyRate: any;
	year: number;
	month: number;
	revenue: number;
	actualRevenue: number;
    eBIT: number;
    actualEBIT: number;
	}
    
export interface Data{
	financials: Financials;
	}
	
export 	interface Financials{
	items: Item[];
	}
	
export	interface Item{
    actualHourlyRate: any;
    defaultHourlyRate: any;
	year: number;
	month: number;
	revenue: number;
	actualRevenue: number;
    eBIT: number;
    actualEBIT: number;
	}	

export interface ConsultantData {
        consultants: Consultants;
    }
    
export interface Consultants {
        items: Item[];
        pageInfo: PageInfo;
    }
    
export interface Item {
        firstName: string;
        employmentDate: string;
        resignationDate?: any;
    }

export interface EmployeeChartData{
        data: EmployeeData
}

export interface EmployeeData{
        titleText: string,
        dataLines: EmployeeDataLine[]
    }
    
export interface EmployeeDataLine{
        name: string,
        color?: string | undefined,
        data: {x:Date, y:number}[],
        lineDashType?: string,
        markerType?: string | undefined,
        xValueFormatString?: string,
        indexLabel?: string
    }

export interface HourlyRateChartData{
        data: HourlyRateData
}

export interface HourlyRateData{
    titleText: string,
    dataLines: HourlyRateDataLine[]
}

export interface HourlyRateDataLine{
        name: string,
        color?: string | undefined,
        data:  { x: Date, y:number}[],
        lineDashType?: string,
        markerType?: string | undefined,
        xValueFormatString?: string,
        indexLabel?: string
    }

export interface CurrentDate{
	currentYear:number;
	currentMonth:number;
    monthsToDisplay:number;
}