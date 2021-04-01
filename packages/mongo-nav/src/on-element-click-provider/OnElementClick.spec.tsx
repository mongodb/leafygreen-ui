import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { OneOf } from '@leafygreen-ui/lib';
import { JestDOM } from '@leafygreen-ui/testing-lib';
import MongoNav from '../MongoNav';
import { NavElement } from '../types';

const defaultElements: Array<
  { navElement: NavElement; shouldNavigate?: boolean } & OneOf<
    { testId: string },
    { text: string }
  >
> = [
  { navElement: NavElement.OrgNavLeaf, testId: 'org-nav-leaf' },
  { navElement: NavElement.OrgNavOrgSettings, testId: 'org-trigger-settings' },
  {
    navElement: NavElement.OrgNavAccessManagerDropdown,
    testId: 'org-nav-access-manager-dropdown',
    shouldNavigate: false,
  },
  {
    navElement: NavElement.OrgNavDropdownGetHelp,
    testId: 'org-nav-dropdown-get-help',
    shouldNavigate: false,
  },
  { navElement: NavElement.OrgNavBilling, testId: 'org-nav-billing' },
  { navElement: NavElement.OrgNavAllClusters, text: 'All Clusters' },
  {
    navElement: NavElement.ProjectNavProjectDropdown,
    testId: 'project-nav-project-menu',
    shouldNavigate: false,
  },
  { navElement: NavElement.ProjectNavCloud, testId: 'project-nav-atlas' },
  { navElement: NavElement.ProjectNavRealm, testId: 'project-nav-realm' },
  { navElement: NavElement.ProjectNavCharts, testId: 'project-nav-charts' },
  { navElement: NavElement.ProjectNavInvite, testId: 'project-nav-invite' },
  {
    navElement: NavElement.ProjectNavActivityFeed,
    testId: 'project-nav-activity-feed',
  },
  { navElement: NavElement.ProjectNavAlerts, testId: 'project-nav-alerts' },
  {
    navElement: NavElement.UserMenuTrigger,
    testId: 'user-menu-trigger',
    shouldNavigate: false,
  },
];

const onElementClick = jest.fn();

beforeEach(() => {
  onElementClick.mockReset();
});

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
  text,
  testId,
  trigger,
  shouldNavigate = true,
}: {
  navElement: string;
  trigger?: string;
  shouldNavigate?: boolean;
} & OneOf<{ text: string }, { testId: string }>) {
  test(`the onElementClick value is successfully passed to the "${
    text ?? testId
  }" element`, async () => {
    const { getByTestId, findByTestId, findByText } = renderMongoNav();

    if (trigger) {
      fireEvent.click(getByTestId(trigger));
    }

    await JestDOM.silenceNavigationErrors(async waitForNavigation => {
      const link = text
        ? (await findByText(text)).closest('a, button')
        : await findByTestId(testId!);

      await waitFor(() => expect(link).toBeVisible());
      fireEvent.click(link!);

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
    defaultElements.forEach(element => {
      testForCallback(element);
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

  describe('when the OrgNav Get Help dropdown is open', () => {
    testForCallback({
      navElement: NavElement.OrgNavSupport,
      testId: 'org-nav-support-link',
      trigger: 'org-nav-dropdown-get-help',
    });

    testForCallback({
      navElement: NavElement.OrgNavDocs,
      testId: 'org-nav-docs-link',
      trigger: 'org-nav-dropdown-get-help',
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
      navElement: NavElement.UserMenuCloud,
      testId: 'user-submenu-cloud',
      trigger: 'user-menu-trigger',
      shouldNavigate: false,
    });

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
      navElement: NavElement.UserMenuUniversity,
      testId: 'user-submenu-university',
      trigger: 'user-menu-trigger',
      shouldNavigate: false,
    });

    testForCallback({
      navElement: NavElement.UserMenuForums,
      testId: 'user-menuitem-forums',
      trigger: 'user-menu-trigger',
      shouldNavigate: false,
    });

    testForCallback({
      navElement: NavElement.UserMenuDevHub,
      testId: 'user-menuitem-devhub',
      trigger: 'user-menu-trigger',
      shouldNavigate: false,
    });

    testForCallback({
      navElement: NavElement.UserMenuSupport,
      testId: 'user-submenu-support',
      trigger: 'user-menu-trigger',
      shouldNavigate: false,
    });

    testForCallback({
      navElement: NavElement.UserMenuFeedback,
      testId: 'user-menuitem-feedback',
      trigger: 'user-menu-trigger',
      shouldNavigate: false,
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
