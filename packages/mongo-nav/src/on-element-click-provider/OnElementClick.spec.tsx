import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { JestDOM } from '@leafygreen-ui/testing-lib';
import MongoNav from '../MongoNav';
import { NavElement } from '../types';

const defaultElements = {
  [NavElement.OrgNavLeaf]: 'org-nav-leaf',
  [NavElement.OrgNavOrgSettings]: 'org-trigger-settings',
  [NavElement.OrgNavAccessManagerDropdown]: 'org-nav-access-manager-dropdown',
  [NavElement.OrgNavSupport]: 'org-nav-support',
  [NavElement.OrgNavBilling]: 'org-nav-billing',
  [NavElement.OrgNavAllClusters]: 'org-nav-all-clusters-link',
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

function testForCallback({
  navElement,
  testId,
  trigger,
  shouldNavigate = true,
}: {
  navElement: string;
  testId: string;
  trigger?: string;
  shouldNavigate?: boolean;
}) {
  test(`the onElementClick value is successfully passed to the ${testId}`, async () => {
    const { getByTestId, findByTestId } = renderMongoNav();

    if (trigger) {
      fireEvent.click(getByTestId(trigger));
    }

    await JestDOM.silenceNavigationErrors(async waitForNavigation => {
      fireEvent.click(await findByTestId(testId));

      if (shouldNavigate) {
        await waitForNavigation();
      }
    });

    expect(onElementClick).toHaveBeenCalled();
    expect(onElementClick).toHaveBeenCalledWith(navElement, expect.anything());
  });
}

describe('packages/mongo-nav/on-element-click-provider', () => {
  describe('by default', () => {
    Object.keys(defaultElements).map(el => {
      testForCallback({
        navElement: el,
        testId: defaultElements[el as keyof typeof defaultElements],
        shouldNavigate: !['-dropdown', '-menu', 'menu-trigger'].some(suffix =>
          defaultElements[el as keyof typeof defaultElements].endsWith(suffix),
        ),
      });
    });
  });

  describe('when the OrgNav Access Manager dropdown is open', () => {
    testForCallback({
      navElement: NavElement.OrgNavDropdownOrgAccessManager,
      testId: 'org-nav-dropdown-org-access-manager',
      trigger: 'org-nav-access-manager-dropdown',
    });

    testForCallback({
      navElement: NavElement.OrgNavDropdownProjectAccessManager,
      testId: 'org-nav-dropdown-project-access-manager',
      trigger: 'org-nav-access-manager-dropdown',
    });
  });

  describe('when the ProjectNav dropdown is open', () => {
    testForCallback({
      navElement: NavElement.ProjectNavProjectSettings,
      testId: 'project-nav-settings',
      trigger: 'project-nav-project-menu',
    });

    testForCallback({
      navElement: NavElement.ProjectNavProjectSupport,
      testId: 'project-nav-support',
      trigger: 'project-nav-project-menu',
    });

    testForCallback({
      navElement: NavElement.ProjectNavProjectIntegrations,
      testId: 'project-nav-integrations',
      trigger: 'project-nav-project-menu',
    });
  });

  describe('when the UserMenu is open', () => {
    testForCallback({
      navElement: NavElement.UserMenuFeedback,
      testId: 'user-menuitem-feedback',
      trigger: 'user-menu-trigger',
      shouldNavigate: false,
    });

    testForCallback({
      navElement: NavElement.UserMenuCloudMFA,
      testId: 'user-menuitem-cloud-mfa',
      trigger: 'user-menu-trigger',
    });

    testForCallback({
      navElement: NavElement.UserMenuCloudInvitations,
      testId: 'user-menuitem-cloud-invitations',
      trigger: 'user-menu-trigger',
    });

    testForCallback({
      navElement: NavElement.UserMenuCloudOrganizations,
      testId: 'user-menuitem-cloud-organizations',
      trigger: 'user-menu-trigger',
    });

    testForCallback({
      navElement: NavElement.UserMenuCloudUserPreferences,
      testId: 'user-menuitem-cloud-user-preferences',
      trigger: 'user-menu-trigger',
    });

    testForCallback({
      navElement: NavElement.Logout,
      testId: 'user-menuitem-logout',
      trigger: 'user-menu-trigger',
    });
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
