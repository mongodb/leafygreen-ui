import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import MongoMenu from '.';

afterAll(cleanup);

describe('packages/MongoMenu', () => {
  const user = { name: 'Leafy', email: 'leafy@mongodb.com' };
  const onLogout = jest.fn();
  const onProductChange = jest.fn();

  const renderedComponent = render(
    <MongoMenu
      user={user}
      activeProduct={'atlas'}
      onLogout={onLogout}
      onProductChange={onProductChange}
    />,
  );

  const { getByText } = renderedComponent;
  const trigger = getByText('Leafy');
  fireEvent.click(trigger);

  const assertHrefByText = (expectedText: string, expectedHref: string) => {
    const { href } = getByText(expectedText).parentElement as HTMLAnchorElement;
    expect(href).toBe(expectedHref);
  };

  test('Account button links to the default account app', () => {
    assertHrefByText(
      'MongoDB Account',
      'https://cloud.mongodb.com/v2#/account',
    );
  });

  test('Atlas menu item links to cloud.mongodb.com', () => {
    assertHrefByText('Atlas', 'https://cloud.mongodb.com/');
  });

  test('University menu item links to university.mongodb.com', () => {
    assertHrefByText('University', 'https://university.mongodb.com/');
  });

  test('Support menu item links to support.mongodb.com', () => {
    assertHrefByText('Cloud Support', 'https://support.mongodb.com/');
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
    renderedComponent.rerender(<MongoMenu user={user} accountURL={''} />);

    const accountButton = getByText('MongoDB Account')
      .parentElement as HTMLButtonElement;
    expect(accountButton.tagName.toLowerCase()).toBe('button');
    expect(accountButton.disabled).toBe(true);
    expect(accountButton.getAttribute('aria-disabled')).toBe('true');
  });
});
