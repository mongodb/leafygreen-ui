import React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import MongoMenu, { Product } from '.';

afterAll(cleanup);

describe('packages/MongoMenu', () => {
  const onLogout = jest.fn();
  const onProductChange = jest.fn();

  const renderedComponent = render(
    <MongoMenu
      user={{ name: 'Leafy', email: 'leafy@mongodb.com' }}
      activeProduct={Product.Atlas}
      onLogout={onLogout}
      onProductChange={onProductChange}
    />,
  );

  const { getByText } = renderedComponent;
  const trigger = getByText('Leafy');
  fireEvent.click(trigger);

  test('Account button links to the default account app', () => {
    const accountItem = getByText('MongoDB Account').parentElement;
    expect((accountItem as HTMLAnchorElement).href).toBe(
      'https://cloud.mongodb.com/v2#/account',
    );
  });

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

  test('renders the account link as a disabled button when set to the empty string', () => {
    renderedComponent.rerender(
      <MongoMenu
        user={{ name: 'Leafy', email: 'leafy@mongodb.com' }}
        activeProduct={Product.Atlas}
        onLogout={onLogout}
        onProductChange={onProductChange}
        accountURL={''}
      />,
    );

    const accountItem = getByText('MongoDB Account').parentElement;
    const accountButton = accountItem as HTMLButtonElement;
    expect((accountButton as HTMLButtonElement).tagName.toLowerCase()).toBe(
      'button',
    );
    expect(accountButton.disabled).toBe(true);
    expect(accountButton.getAttribute('aria-disabled')).toBe('true');
  });
});
