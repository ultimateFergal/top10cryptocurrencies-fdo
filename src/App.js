import React, { useEffect, useState } from "react";

import { Body, Button, Header, Image } from "./components";
import Table from "./components/Table";
import Modal from "./components/Modal";
import { fetchCryptosData } from './common/apiService'
import logo from "./ethereumLogo.png";
import useWeb3Modal from "./hooks/useWeb3Modal";

function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {
  const [account, setAccount] = useState("");
  const [rendered, setRendered] = useState("");

  useEffect(() => {
    async function fetchAccount() {
      try {
        if (!provider) {
          return;
        }

        // Load the user's accounts.
        const accounts = await provider.listAccounts();
        setAccount(accounts[0]);

        // Resolve the ENS name for the first account.
        const name = await provider.lookupAddress(accounts[0]);

        // Render either the ENS name or the shortened account address.
        if (name) {
          setRendered(name);
        } else {
          setRendered(account.substring(0, 6) + "..." + account.substring(36));
        }
      } catch (err) {
        setAccount("");
        setRendered("");
        console.error(err);
      }
    }
    fetchAccount();
    
  }, [account, provider, setAccount, setRendered]);

  return (
    <Button
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {rendered === "" && "Connect Wallet"}
      {rendered !== "" && rendered}
    </Button>
  );
}

function App() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

  const [cryptosList, setCryptosList] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null)
  const setSelectedCoinFn = (coin) => setSelectedCoin(coin)

  useEffect(() => {
    setIsloading(true)
    fetchCryptosData().then((cryptosData) => {
      setIsloading(false)
      setCryptosList(cryptosData || [])
    })
  }, []);

  const setModalFn = (coin) => {
    setSelectedCoinFn(coin)
    setIsModalOpen(true)
  }

  return (
    <div>
      <Header>
        <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
      </Header>
      <Body>
        <Image src={logo} alt="react-logo" />
        <div className="flex items-start justify-between p-5 border border-solid border-blueGray-200 rounded-t text-orange-500">
          <h3 className="text-3xl font-semibold">
            TOP TEN CRYPTOCURRENCIES
          </h3>
        </div>
        {isModalOpen &&
          <Modal
            openModal={setIsModalOpen} 
            coin={selectedCoin}
          />}
        {isloading ? (
          <div className="flex items-center justify-center ">
              <div className="w-40 h-40 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
          </div>
        ) : (
          <Table
            cryptosList={cryptosList}
            isloading={isloading}
            setModalFn={setModalFn}
            selectedCoin={selectedCoin}
          />
        )}
      </Body>
    </div>
  );
}

export default App;
