import React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import SSOMenu, { ActiveProductOptions } from '.';

afterAll(cleanup);

describe('packages/SSOMenu', () => {
  const onLogout = jest.fn();
  const onProductChange = jest.fn();

  const { getByText } = render(
    <SSOMenu
      user={{ name: 'Leafy', email: 'leafy@mongodb.com' }}
      activeProduct={ActiveProductOptions.Atlas}
      onLogout={onLogout}
      onProductChange={onProductChange}
    />,
  );

  test('Atlas menu item links to cloud.mongodb.com', () => {
    const atlasItem = getByText('Atlas').parentElement;
    expect((atlasItem as HTMLAnchorElement).href).toBe(
      'https://cloud.mongodb.com/',
    );
  });

  test('University menu item links to university.mongodb.com', () => {
    const universityItem = getByText('University').parentElement;
    expect((universityItem as HTMLAnchorElement).href).toBe(
      'https://university.mongodb.com/',
    );
  });

  test('Support menu item links to support.mongodb.com', () => {
    const supportItem = getByText('Cloud Support').parentElement;
    expect((supportItem as HTMLAnchorElement).href).toBe(
      'https://support.mongodb.com/',
    );
  });

  test('onProductChange fires when a product is clicked', () => {
    const supportItem = getByText('Cloud Support');

    fireEvent.click(supportItem);

    expect(onProductChange).toHaveBeenCalledTimes(1);
  });

  test('onLogout fires when logout is clicked', () => {
    const logout = getByText('Logout');

    fireEvent.click(logout);

    expect(onLogout).toHaveBeenCalledTimes(1);
  });
});
