import axios from 'axios'

/**
 * Fetches data of current top ten cryptocurrencies from https://www.coingecko.com/en/api 
 */
export const fetchCryptosData = () => {
    return axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.log(error)
        })
    }

/**
 * Fetches data of a specific cryptocurrency from https://www.coingecko.com/en/api 
 */
export const fetchCoindData = (id) => {
    return axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=365&interval=daily`)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.log(error)
        })
}