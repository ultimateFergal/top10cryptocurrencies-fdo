import React, { useState, useEffect } from "react";
import Chart from '../Chart'
import { fetchCoindData } from '../../common/apiService'

function Modal({ openModal, coin }) {
    const [isloading, setIsloading] = useState(false);
    const [coinData, setCoinData] = useState(null);

    useEffect( () => {
      setIsloading(true)
      // if (!coinData) {
        fetchCoindData(coin.id).then((coinData => {
          console.log('coindata called fdo')
            setCoinData(coinData)
            setIsloading(false)
        }))
      // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coin.id])
    return (
      <>
         (
          <>
            <div
              onClick={() => {
                openModal(false)
              }}
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div 
                onClick={e => {
                  // do not close modal if anything inside modal content is clicked
                  e.stopPropagation();
                }}
                className="relative w-auto my-6 mx-auto w-11/12">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t text-orange-500">
                    <h3 className="text-3xl font-semibold">
                      {coin.name} price over the last 12 months
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => openModal(false)}
                    >
                      <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-3 flex-auto">
                    {isloading && (
                      <div className="flex items-center justify-center ">
                          <div className="w-40 h-40 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
                      </div>
                    )}
                    {coinData && <Chart coinPrices={coinData.prices} ath={coin.ath}/>}
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )
      </>
    );
}

export default Modal
