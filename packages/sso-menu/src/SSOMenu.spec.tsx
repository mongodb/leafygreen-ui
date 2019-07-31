import React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import SSOMenu from '.';

afterAll(cleanup);

describe('packages/SSOMenu', () => {
  const onLogout = jest.fn();
  const onAccountClick = jest.fn();
  const onProductChange = jest.fn();

  const { getByText } = render(
    <SSOMenu
      userInfo={{ name: 'Leafy', email: 'leafy@mongodb.com' }}
      activeProduct="atlas"
      onLogout={onLogout}
      onProductChange={onProductChange}
      onAccountClick={onAccountClick}
    />,
  );

  test('onAccountClick fires when button is pressed', () => {
    const button = getByText('MongoDB Account');

    fireEvent.click(button);

    expect(onAccountClick).toHaveBeenCalledTimes(1);
  });

  test('onLogout fires when logout is pressed', () => {
    const logout = getByText('Logout');

    fireEvent.click(logout);

    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  test('onProductChange fires when new product is selected', () => {
    const university = getByText('University');

    fireEvent.click(university);

    expect(onProductChange).toHaveBeenCalledTimes(1);
  });
});
