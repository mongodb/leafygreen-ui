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

  test('renders correct product as activeProduct', () => {
    const atlas = ((getByText('Atlas').parentElement as HTMLElement)
      .parentElement as HTMLElement).parentElement;
    expect(atlas).toHaveAttribute('aria-checked');
  });

  test('Atlas menu item links to cloud.mongodb.com', () => {
    const atlasItem = (getByText('Atlas').parentElement as HTMLElement)
      .parentElement;
    expect((atlasItem as HTMLAnchorElement).href).toBe(
      'https://cloud.mongodb.com/',
    );
  });

  test('University menu item links to university.mongodb.com', () => {
    const universityItem = (getByText('University')
      .parentElement as HTMLElement).parentElement;
    expect((universityItem as HTMLAnchorElement).href).toBe(
      'https://university.mongodb.com/',
    );
  });

  test('Support menu item links to support.mongodb.com', () => {
    const supportItem = (getByText('Cloud Support')
      .parentElement as HTMLElement).parentElement;
    expect((supportItem as HTMLAnchorElement).href).toBe(
      'https://support.mongodb.com/',
    );
  });

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
