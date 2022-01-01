import React from 'react'

function Table({cryptosList, setModalFn }) {
    const handleOnClick = (coin) => {
      setModalFn(coin)
    }

    return (
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-white border-b">
                    <tr>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Coin Name
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Logo
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        24 hour USD volume
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Circulating supply
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Total supply
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Market cap
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                      {cryptosList.map((coin) => {
                          return (
                            <tr 
                              onClick={() => handleOnClick(coin)} 
                              className="bg-white border-b transition duration-300 hover:bg-gray-100 cursor-pointer "
                              key={coin.name} >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {coin.name}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  <img className="h-10 w-10 rounded-full" src={coin.image} alt={coin.id}/>
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {coin.market_cap_change_24h.toFixed(2)}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {coin.circulating_supply}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {coin.total_supply || 'Not provided'}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {coin.market_cap_rank}
                              </td>                                    
                            </tr>  
                          )
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>   
    )
}

export default Table
