import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { cryptosDataMock, lastYearBitcoinDatamock } from './common/mockData'
import App from "./App";

jest.mock('axios');

describe('App', () => {
  test(`fetches coins data from an API and displays them in table`, async () => {

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: cryptosDataMock })
    );

    render(<App />);

    const Bitcoin = await screen.findByText('Bitcoin');
    const Ethereum = await screen.findByText('Ethereum');
    const BinanceCoin = await screen.findByText(/Binance coin/i);

    expect(Bitcoin).toBeInTheDocument();
    expect(Ethereum).toBeInTheDocument();
    expect(BinanceCoin).toBeInTheDocument();
  });
});

describe('Modal', () => {
  test('calls function to display modal when clickin on a row of the table', async () => {

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: cryptosDataMock })
    );

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: lastYearBitcoinDatamock })
    );

    render(<App />);

    await waitFor(() => {
      userEvent.click(screen.getByText('Bitcoin'));
      const BinanceCoinHeadModal = screen.getByText(/Bitcoin price over the last 12 months/i);
      expect(BinanceCoinHeadModal).toBeInTheDocument();
    });
  });
});