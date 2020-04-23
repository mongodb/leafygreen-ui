import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MongoNav from '../MongoNav';
import { NavElement } from '../types';

const defaultElements = {
  [NavElement.OrgNavLeaf]: 'org-nav-leaf',
  // [NavElement.OrgNavOrgSelectTrigger]: 'org-trigger',
  [NavElement.OrgNavOrgSettings]: 'org-trigger-settings',
  [NavElement.OrgNavAccessManager]: 'org-nav-access-manager',
  [NavElement.OrgNavDropdown]: 'org-nav-dropdown',
  [NavElement.OrgNavSupport]: 'org-nav-support',
  [NavElement.OrgNavBilling]: 'org-nav-billing',
  [NavElement.OrgNavAllClusters]: 'org-nav-all-clusters-link',
  // [NavElement.ProjectNavProjectSelectTrigger]: 'project-select-trigger',
  [NavElement.ProjectNavProjectDropdown]: 'project-nav-project-menu',
  [NavElement.ProjectNavCloud]: 'project-nav-atlas',
  [NavElement.ProjectNavRealm]: 'project-nav-realm',
  [NavElement.ProjectNavCharts]: 'project-nav-charts',
  [NavElement.ProjectNavInvite]: 'project-nav-invite',
  [NavElement.ProjectNavActivityFeed]: 'project-nav-activity-feed',
  [NavElement.ProjectNavAlerts]: 'project-nav-alerts',
  [NavElement.UserMenuTrigger]: 'user-menu-trigger',
};

const onElementClick = jest.fn();
const promise = Promise.resolve();

function renderMongoNav() {
  const utils = render(
    <MongoNav
      mode="dev"
      admin={true}
      activeProduct="cloud"
      onElementClick={onElementClick}
    />,
  );

  return utils;
}

function testForCallback(navElement: string, testId: string, trigger?: string) {
  test(`the onElementClick value is successfully passed to the ${testId}`, async () => {
    const { getByTestId } = renderMongoNav();

    if (trigger) {
      await fireEvent.click(getByTestId(trigger));
    }

    fireEvent.click(getByTestId(testId));

    expect(onElementClick).toHaveBeenCalled();
    expect(onElementClick).toHaveBeenCalledWith(navElement, expect.anything());
    await act(() => promise);
  });
}

describe('packages/mongo-nav/on-element-click-provider', () => {
  describe('by default', () => {
    Object.keys(defaultElements).map(el => {
      // @ts-ignore
      testForCallback(el, defaultElements[el]);
    });
  });

  describe('when the OrgNav Access Manager dropdown is open', () => {
    testForCallback(
      NavElement.OrgNavDropdownOrgAccessManager,
      'org-nav-dropdown-org-access-manager',
      'org-nav-dropdown',
    );

    testForCallback(
      NavElement.OrgNavDropdownProjectAccessManager,
      'org-nav-dropdown-project-access-manager',
      'org-nav-dropdown',
    );
  });

  describe('when the ProjectNav dropdown is open', () => {
    testForCallback(
      NavElement.ProjectNavProjectSettings,
      'project-nav-settings',
      'project-nav-project-menu',
    );

    testForCallback(
      NavElement.ProjectNavProjectSupport,
      'project-nav-support',
      'project-nav-project-menu',
    );

    testForCallback(
      NavElement.ProjectNavProjectIntegrations,
      'project-nav-integrations',
      'project-nav-project-menu',
    );
  });

  describe('when the UserMenu is open', () => {
    testForCallback(
      NavElement.UserMenuFeedback,
      'user-menuitem-feedback',
      'user-menu-trigger',
    );

    testForCallback(
      NavElement.UserMenuCloudMFA,
      'user-menuitem-cloud-mfa',
      'user-menu-trigger',
    );

    testForCallback(
      NavElement.UserMenuCloudInvitations,
      'user-menuitem-cloud-invitations',
      'user-menu-trigger',
    );

    testForCallback(
      NavElement.UserMenuCloudOrganizations,
      'user-menuitem-cloud-organizations',
      'user-menu-trigger',
    );

    testForCallback(
      NavElement.UserMenuCloudUserPreferences,
      'user-menuitem-cloud-user-preferences',
      'user-menu-trigger',
    );

    testForCallback(
      NavElement.Logout,
      'user-menuitem-logout',
      'user-menu-trigger',
    );
  });
});

describe('NavElement', () => {
  function checkDupes(array: Array<string>) {
    const checkArr: Array<string> = [];

    array.forEach(val => {
      if (checkArr.includes(val)) {
        return true;
      }

      checkArr.push(val);
    });

    return false;
  }

  test('NavElement const only contains unique values', () => {
    expect(checkDupes(Object.values(NavElement))).toBe(false);
  });
});
