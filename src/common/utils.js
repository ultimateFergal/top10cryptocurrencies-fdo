import { format } from "date-fns";

export const dateFormat = (unixTime) => {
    return format(unixTime, 'MM/dd/yyyy')
}

export const getDatesBetweenDates = (startDate, endDate) => {
    let dates = []
    const theDate = new Date(startDate)
    while (theDate < new Date(endDate)) {
        dates = [...dates, new Date(theDate)]
        theDate.setDate(theDate.getDate() + 1)
    }
    dates = [...dates, new Date(endDate)]
    return dates
}

export const beautifyAmounts = n => ((Math.log10(n) / 3 | 0) === 0) ? n : Number((n / Math.pow(10, (Math.log10(n) / 3 | 0) * 3)).toFixed(1)) + ["", "K", "M", "B", "T", ][Math.log10(n) / 3 | 0];

export const buildChartData = (dateData, priceData) => {
    return dateData.map((coinPrice, i) => {
        return { price: priceData[i] ? priceData[i][1].toFixed(2) : '', date: coinPrice.getTime() }
    })
}

export const getLowestPrice = (prices) => {
    const sortedPrices = [...prices].sort((a, b) => (a.price - b.price))
    return parseInt(sortedPrices[0].price)
}