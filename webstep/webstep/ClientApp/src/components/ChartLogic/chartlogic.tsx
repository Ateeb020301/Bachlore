export interface Financial {
    actualHourlyRate: any;
    defaultHourlyRate: any;
    year: number;
    month: number;
    revenue: number;
    actualRevenue: number;
    accumulatedRevenue: number;
    accumulatedActualRevenue: number;
    eBIT: number;
    actualEBIT: number;
    accumulatedEBIT: number;
    accumulatedActualEBIT: number;
}

interface StructuredData {
    date: string;
    accumulated: number;
    accumulatedActual: number;
    accumulatedDeviation: number;
}

export const GetLatestMonths = (items: {}[], monthsToDisplay: number) => {
    //The month array is reversed, so last month is first
    if (items && items !== undefined && items.length > 0 && monthsToDisplay > 0) {
        var s = items.length > monthsToDisplay ? items.slice(0, monthsToDisplay) : items;
        return s;
    }
    return [];
};

export const SliceMonthsToDisplayNumber = (items: { x: Date; y: number }[], monthsToDisplay: number) => {
    //The month array is reversed, so last month is first
    var s = items.length > monthsToDisplay ? items.slice(0, monthsToDisplay) : items;
    return s;
};

//Sorts data input, so that first month it 0th in the list
export const SortFinanacial = (financials: Financial[]) => {
    let tempList = financials.map((item) => {
        return item;
    });
    tempList.sort((a, b) => (a.month < b.month ? 1 : -1));
    return tempList;
};

export const GetDisplayData = (financials: Financial[], monthsToDisplay: number, year: number, month: number) => {
    let tempDat = SortFinanacial(financials);
    let displayData: StructuredData[] = structureData(tempDat, year, month);

    let fullData = displayData.map((item) => {
        let tempDate = new Date(item.date);
        let tempData = {
            x: tempDate,
            y: [item.accumulated, item.accumulatedActual],
            z: item.accumulatedDeviation,
            markerColor: 'green',
        };
        for (var i = 0; i < tempData.y.length; i++) {
            if (tempData.z <= 0) {
                tempData.markerColor = 'red';
            }
        }
        return tempData;
    });
    let latestData = GetLatestMonths(fullData, monthsToDisplay);
    return latestData;
};

const structureData = (dataToStructure: Financial[], year: number, month: number) => {
    let displayData: StructuredData[] = [];
    dataToStructure.forEach((item) => {
        if (item.year === year && item.month < month) {
            let itemDate = item.year.toString() + '-' + item.month.toString().padStart(2, '0');
            let accumulated =
                item.accumulatedEBIT !== undefined && item.accumulatedEBIT
                    ? item.accumulatedEBIT
                    : item.accumulatedRevenue;
            let accumulatedActual =
                item.accumulatedActualEBIT !== undefined && item.accumulatedActualEBIT
                    ? item.accumulatedActualEBIT
                    : item.accumulatedActualRevenue;

            let dData: StructuredData = {
                date: itemDate,
                accumulated: accumulated,
                accumulatedActual: accumulatedActual,
                accumulatedDeviation: accumulatedActual - accumulated,
            };
            displayData.push(dData);
        }
    });

    return displayData;
};

export const GetData = (financials: Financial[], monthsToDisplay: number, year: number, month: number) => {
    let dataToDisplay: {}[] = [];
    let tempDat = SortFinanacial(financials);
    tempDat.forEach((item) => {
        if (item.year === year && item.month < month) {
            let budget = item.eBIT !== undefined && item.eBIT ? item.eBIT : item.revenue;
            let actual = item.actualEBIT !== undefined && item.actualEBIT ? item.actualEBIT : item.actualRevenue;
            let temp = {
                x: new Date(item.year.toString() + '-' + item.month.toString().padStart(2, '0')),
                y: [budget, actual],
                z: [actual - budget],
                markerColor: 'green',
            };
            dataToDisplay.push(temp);
            for (var i = 0; i < temp.y.length; i++) {
                if (temp.z[i] <= 0) {
                    temp.markerColor = 'red';
                }
            }
        }
    });
    let latestMonths = GetLatestMonths(dataToDisplay, monthsToDisplay);

    return latestMonths;
};

export const YearCalculation = (year: number, month: number) => {
    //If current month == 1, then get data for last year
    //Set month to 12 and year to current year -1
    if (month === 1) {
        year--; //Show previous year, as there is no data for the current year
        month = 13; //Needs to be 13, as months displayed are < month
    }
    return { year, month };
};
