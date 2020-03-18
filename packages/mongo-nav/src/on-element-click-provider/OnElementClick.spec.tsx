import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MongoNav from '../MongoNav';
import { NavElement } from '../types';

afterAll(cleanup);

const defaultElements = {
  [NavElement.OrgNavLeaf]: 'org-nav-leaf',
  [NavElement.OrgNavOrgSelectTrigger]: 'org-trigger',
  [NavElement.OrgNavOrgSettings]: 'org-trigger-settings',
  [NavElement.OrgNavAccessManager]: 'org-nav-access-manager',
  [NavElement.OrgNavDropdown]: 'org-nav-dropdown',
  [NavElement.OrgNavSupport]: 'org-nav-support',
  [NavElement.OrgNavBilling]: 'org-nav-billing',
  [NavElement.OrgNavAllClusters]: 'org-nav-all-clusters-link',
  [NavElement.ProjectNavProjectSelectTrigger]: 'project-select-trigger',
  [NavElement.ProjectNavProjectDropdown]: 'project-nav-project-menu',
  [NavElement.ProjectNavCloud]: 'project-nav-atlas',
  [NavElement.ProjectNavRealm]: 'project-nav-realm',
  [NavElement.ProjectNavCharts]: 'project-nav-charts',
  [NavElement.ProjectNavInvite]: 'project-nav-invite',
  [NavElement.ProjectNavActivityFeed]: 'project-nav-activity-feed',
  [NavElement.ProjectNavAlerts]: 'project-nav-alerts',
  [NavElement.UserMenuTrigger]: 'user-menu-trigger',
} as const;

describe('packages/mongo-nav/on-element-click-provider', () => {
  const onElementClick = jest.fn();

  const testForCallback = (navElement: HTMLElement, type: string) => {
    fireEvent.click(navElement);
    expect(onElementClick).toHaveBeenCalled();
    expect(onElementClick).toHaveBeenCalledWith(type, expect.anything());
  };

  describe('by default', () => {
    const { getByTestId } = render(
      <MongoNav
        activeProduct="cloud"
        mode="dev"
        admin={true}
        onOrganizationChange={jest.fn()}
        onProjectChange={jest.fn()}
        onElementClick={onElementClick}
      />,
    );

    let el: keyof typeof defaultElements;

    for (el in defaultElements) {
      test(`it fires onElementClick callback on ${el}`, () =>
        testForCallback(getByTestId(defaultElements[el]), el));
    }

    test('when OrgSelect is open', async () => {
      fireEvent.click(getByTestId('org-trigger'));

      const viewOrgs = await getByTestId('org-select-view-all-orgs');

      testForCallback(viewOrgs, NavElement.OrgNavViewAllOrganizations);
    });

    test('when OrgNav dropdown is open', async () => {
      fireEvent.click(getByTestId('org-nav-dropdown'));

      const orgNavOrgAccessManager = await getByTestId(
        'org-nav-dropdown-org-access-manager',
      );
      const orgNavProjectAccesManger = getByTestId(
        'org-nav-dropdown-project-access-manager',
      );

      testForCallback(
        orgNavOrgAccessManager,
        NavElement.OrgNavDropdownOrgAccessManager,
      );

      testForCallback(
        orgNavProjectAccesManger,
        NavElement.OrgNavDropdownProjectAccessManager,
      );
    });

    test('when ProjectSelect is open', async () => {
      fireEvent.click(getByTestId('project-select-trigger'));

      const viewAllProjects = await getByTestId(
        'project-select-view-all-projects',
      );
      const addNewProject = getByTestId('project-select-add-new-project');

      testForCallback(viewAllProjects, NavElement.ProjectNavViewAllProjects);

      testForCallback(addNewProject, NavElement.ProjectNavAddProject);
    });

    test('when the Project dropdown is open', async () => {
      fireEvent.click(getByTestId('project-nav-project-menu'));

      const projectNavSettings = await getByTestId('project-nav-settings');
      const projectNavSupport = getByTestId('project-nav-support');
      const projectNavIntegrations = getByTestId('project-nav-integrations');

      testForCallback(projectNavSettings, NavElement.ProjectNavProjectSettings);

      testForCallback(projectNavSupport, NavElement.ProjectNavProjectSupport);

      testForCallback(
        projectNavIntegrations,
        NavElement.ProjectNavProjectIntegrations,
      );
    });

    test('when the UserMenu is open', async () => {
      fireEvent.click(getByTestId('user-menu-trigger'));

      const userMenuFeedback = await getByTestId('user-menuitem-feedback');
      const userMenuCloudMFA = getByTestId('user-menuitem-cloud-mfa');
      const userMenuCloudInvitations = getByTestId(
        'user-menuitem-cloud-invitations',
      );
      const userMenuCloudOrganizations = getByTestId(
        'user-menuitem-cloud-organizations',
      );

      const userMenuCloudUserPreferences = getByTestId(
        'user-menuitem-cloud-user-preferences',
      );

      const userMenuLogout = getByTestId('user-menuitem-logout');

      testForCallback(userMenuFeedback, NavElement.UserMenuFeedback);

      testForCallback(userMenuCloudMFA, NavElement.UserMenuCloudMFA);

      testForCallback(
        userMenuCloudInvitations,
        NavElement.UserMenuCloudInvitations,
      );

      testForCallback(
        userMenuCloudOrganizations,
        NavElement.UserMenuCloudOrganizations,
      );

      testForCallback(
        userMenuCloudUserPreferences,
        NavElement.UserMenuCloudUserPreferences,
      );

      testForCallback(userMenuLogout, NavElement.Logout);
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
