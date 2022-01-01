import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart, Area
} from 'recharts'
import InfoTooltip from "../InfoTooltip";
import {
    dateFormat,
    getDatesBetweenDates,
    buildChartData,
    getLowestPrice
} from '../../common/utils'

const Chart = ({ coinPrices, ath }) => {
    const [chartData, setchartData ] = useState([]);
    const [lowestPrice, setLowestPrice] = useState([])
    
    useEffect(() => {
        const dateToday = new Date();
        const dateAYearAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 1))
        const lastYearDates = getDatesBetweenDates(dateAYearAgo, dateToday)
        const chartDataArray = buildChartData(lastYearDates, coinPrices)
        const minPrice = getLowestPrice(chartDataArray)
        setLowestPrice(minPrice)
        setchartData(chartDataArray)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
    <ResponsiveContainer height={450} width='100%'>        
        <AreaChart
            data={chartData}
            margin={{
                top: 10,
                right: 40,
                left: 0,
                bottom: 50
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
                name='Date' 
                fontSize={15}
                dataKey="date"
                tickSize={25}
                tickFormatter={dateFormat}
                interval={30} angle={30} dx={35} dy={15}
                />
            <YAxis
                dataKey='price'
                name='Price'
                fontSize={15}
                domain={[lowestPrice, ath]}
                />
            <Tooltip content={<InfoTooltip />}/>
            <Area type="monotone" dataKey="price" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
    </ResponsiveContainer>
    )
}

export default Chart
