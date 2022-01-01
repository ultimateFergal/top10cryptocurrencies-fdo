import React from "react";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Table from "./index";
import { cryptosDataMock, bitcoinSelectedMock } from '../../common/mockData'

describe('Table', () => {
  test('calls function to display modal when clickin on a row', async () => {

    const setModalFn = jest.fn();

    render(<Table
      cryptosList={cryptosDataMock}
      isloading={false}
      setModalFn={setModalFn}
      selectedCoin={bitcoinSelectedMock}
      />);
  
      await userEvent.click(screen.getByText('Bitcoin'));
      expect(setModalFn).toHaveBeenCalledTimes(1);
  });
});

