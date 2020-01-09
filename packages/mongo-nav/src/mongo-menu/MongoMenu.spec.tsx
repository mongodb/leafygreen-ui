import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render,
  fireEvent,
  cleanup,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import MongoMenu from '.';

afterAll(cleanup);

describe('packages/MongoMenu', () => {
  const account = {
    firstName: 'Leafy',
    lastName: 'Green',
    email: 'leafy@mongodb.com',
  };
  const onLogout = jest.fn();
  const onProductChange = jest.fn();

  const renderedComponent = render(
    <MongoMenu
      account={account}
      activeProduct={'cloud'}
      onLogout={onLogout}
      onProductChange={onProductChange}
      overrides={{
        hosts: { cloud: 'https://cloud-dev.com' },
        urls: {
          mongoMenu: {
            university: {
              videoPreferences: 'https://university.mongodb.com/override-test',
            },
          },
        },
      }}
    />,
  );

  const { getByText } = renderedComponent;
  test('renders closed MongoMenu with users name in button by default', () => {
    const leafy = getByText('Leafy');
    expect(leafy).toBeInTheDocument();
  });

  test('opens when trigger is clicked', () => {
    const trigger = getByText('Leafy');
    fireEvent.click(trigger);
  });

  test('renders atlas MenuItems when atlas is the active product', () => {
    const userPreferences = getByText('User Preferences');
    const invitations = getByText('Invitations');
    const organizations = getByText('Organizations');
    const tfa = getByText('Two-Factor Authorization');

    expect(userPreferences).toBeInTheDocument();
    expect(invitations).toBeInTheDocument();
    expect(organizations).toBeInTheDocument();
    expect(tfa).toBeInTheDocument();
  });

  test('renders university MenuItems when university dropdown is clicked and closes other SubMenus', () => {
    const userPreferences = getByText('User Preferences');
    const university = document.querySelectorAll(
      '[data-leafygreen-ui="sub-menu-container"]',
    )[1];

    const universityArrowButton = university?.parentNode?.querySelector(
      'button',
    );
    fireEvent.click(universityArrowButton as HTMLElement);

    const universityMenuItem = getByText('Video Preferences');
    expect(universityMenuItem).toBeInTheDocument();
    waitForElementToBeRemoved(() => userPreferences).then(() =>
      expect(userPreferences).not.toBeVisible(),
    );
  });

  test('atlas MenuItem links to cloud.mongodb.com', () => {
    const atlasItem = document.querySelectorAll(
      '[data-leafygreen-ui="sub-menu-container"]',
    )[0];
    expect((atlasItem as HTMLAnchorElement).href).toBe(
      'https://cloud.mongodb.com/',
    );
  });

  test('university MenuItem links to university.mongodb.com', () => {
    const universityItem = document.querySelectorAll(
      '[data-leafygreen-ui="sub-menu-container"]',
    )[1];
    expect((universityItem as HTMLAnchorElement).href).toBe(
      'https://university.mongodb.com/',
    );
  });

  test('support MenuItem links to support.mongodb.com', () => {
    const supportItem = document.querySelectorAll(
      '[data-leafygreen-ui="sub-menu-container"]',
    )[2];
    expect((supportItem as HTMLAnchorElement).href).toBe(
      'https://support.mongodb.com/',
    );
  });

  test('onLogout fires when logout is clicked', () => {
    const logout = getByText('Logout');

    fireEvent.click(logout);

    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  describe('renders appropriate links to SubMenu Items based on overrides prop', () => {
    test('renders particular url override, when the urls prop is set', () => {
      const universityItem = document.querySelectorAll(
        '[data-leafygreen-ui="sub-menu-container"]',
      )[1];

      fireEvent.click(universityItem);

      const universitySubMenuItem = getByText('Video Preferences');
      expect(
        (universitySubMenuItem?.parentNode as HTMLAnchorElement).href,
      ).toBe('https://university.mongodb.com/override-test');
    });

    test('renders particular url override, when the hosts prop is set', () => {
      const atlasItem = document.querySelectorAll(
        '[data-leafygreen-ui="sub-menu-container"]',
      )[0];

      fireEvent.click(atlasItem);

      const atlasSubMenuitem = getByText('Invitations');
      expect((atlasSubMenuitem?.parentNode as HTMLAnchorElement).href).toBe(
        'https://cloud-dev.com/preferences/invitations',
      );
    });
  });

  test('renders the account link as a disabled button when set to the empty string', () => {
    renderedComponent.rerender(
      <MongoMenu account={account} activeProduct="account" />,
    );

    const accountButton = getByText('Manage your MongoDB Account')
      .parentElement as HTMLButtonElement;
    expect(accountButton.tagName.toLowerCase()).toBe('button');
    expect(accountButton.disabled).toBe(true);
    expect(accountButton.getAttribute('aria-disabled')).toBe('true');
  });
});
