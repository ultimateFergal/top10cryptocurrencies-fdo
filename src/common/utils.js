import { format } from "date-fns";

/**
 * Converts datetime data into 'MM/dd/yyyy' datetime format
 */
export const dateFormat = (unixTime) => {
    return format(unixTime, 'MM/dd/yyyy')
}

/**
 * Generates an array of daily dates between a provided starting and ending date
 */
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

/**
 * Changes the looks of numeric data
 */
export const beautifyAmounts = n => ((Math.log10(n) / 3 | 0) === 0) ? n : Number((n / Math.pow(10, (Math.log10(n) / 3 | 0) * 3)).toFixed(1)) + ["", "K", "M", "B", "T", ][Math.log10(n) / 3 | 0];

/**
 * Generates an combined array of objects with price and date values
 */
export const buildChartData = (dateData, priceData) => {
    return dateData.map((coinPrice, i) => {
        return { price: priceData[i] ? priceData[i][1].toFixed(2) : '', date: coinPrice.getTime() }
    })
}

/**
 * Gets the lowest value of an array of objects based on the price data
 */
export const getLowestPrice = (prices) => {
    const sortedPrices = [...prices].sort((a, b) => (a.price - b.price))
    return parseInt(sortedPrices[0].price)
}