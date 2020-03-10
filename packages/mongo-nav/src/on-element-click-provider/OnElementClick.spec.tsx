import React from 'react';
import { render, cleanup, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { nullableElement, Queries } from '@leafygreen-ui/lib/src/testHelpers';
import MongoNav from '../MongoNav';
import { NavElement } from '../types';

const links = {
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
  [NavElement.ProjectNavCloud]: 'project-nav-cloud-manager',
  [NavElement.ProjectNavRealm]: 'project-nav-realm',
  [NavElement.ProjectNavCharts]: 'project-nav-charts',
  [NavElement.ProjectNavInvite]: 'project-nav-invite',
  [NavElement.ProjectNavActivityFeed]: 'project-nav-activity-feed',
  [NavElement.ProjectNavAlerts]: 'project-nav-alerts',
  [NavElement.UserMenuTrigger]: 'user-menu-trigger',
};

const orgSelectLink = {
  [NavElement.OrgNavViewAllOrganizations]: 'org-select-view-all-orgs',
};

const orgDropdownLinks = {
  [NavElement.OrgNavDropdownOrgAccessManager]:
    'org-nav-dropdown-org-access-manager',
  [NavElement.OrgNavDropdownProjectAccessManager]:
    'org-nav-dropdown-org-project-manager',
};

const projectSelectLink = {
  [NavElement.ProjectNavViewAllProjects]: 'project-select-view-all-projects',
  [NavElement.ProjectNavAddProject]: 'project-select-add-new-project',
};

const projectDropdownLinks = {
  [NavElement.ProjectNavProjectSettings]: 'project-nav-settings',
  [NavElement.ProjectNavProjectSupport]: 'project-nav-settings',
  [NavElement.ProjectNavProjectIntegrations]: 'project-nav-integrations',
};

const userMenuLinks = {
  [NavElement.UserMenuFeedback]: 'user-menuitem-feedback',
  [NavElement.UserMenuCloudMFA]: 'user-menuitem-cloud-mfa',
  [NavElement.UserMenuCloudInvitations]: 'user-menuitem-cloud-invitations',
  [NavElement.UserMenuCloudOrganizations]: 'user-menuitem-cloud-organizations',
  [NavElement.UserMenuCloudUserPreferences]:
    'user-menuitem-cloud-user-preferences',
  [NavElement.Logout]: 'user-menuitem-logout',
};

// types
interface ExpectedElements {
  [key: string]: nullableElement;
}

describe('packages/mongo-nav/on-element-click-provider', () => {
  const queries: Queries = {};
  const expectedElements: ExpectedElements = {};

  const setQueries = ({ queryByTestId }: Queries) => {
    Object.assign(queries, { queryByTestId });
    act(setExpectedElements);
  };

  const setExpectedElements = () => {
    const { queryByTestId = () => null } = queries;
    expectedElements.test = null;
    expectedElements[NavElement.Logout] = queryByTestId('user-menuitem-logout');
    expectedElements[NavElement.OrgNavLeaf] = queryByTestId('org-nav-leaf');
    expectedElements[NavElement.OrgNavOrgSelectTrigger] = queryByTestId(
      'org-trigger',
    );
    expectedElements[NavElement.OrgNavViewAllOrganizations] = queryByTestId(
      'org-select-view-all-orgs',
    );
    expectedElements[NavElement.OrgNavOrgSettings] = queryByTestId(
      'org-trigger-settings',
    );
    expectedElements[NavElement.OrgNavAccessManager] = queryByTestId(
      'org-nav-access-manager',
    );
    expectedElements[NavElement.OrgNavDropdown] = queryByTestId(
      'org-nav-dropdown',
    );
    expectedElements[NavElement.OrgNavDropdownOrgAccessManager] = queryByTestId(
      'org-nav-dropdown-org-access-manager',
    );
    expectedElements[
      NavElement.OrgNavDropdownProjectAccessManager
    ] = queryByTestId('org-nav-dropdown-project-access-manager');
    expectedElements[NavElement.OrgNavSupport] = queryByTestId(
      'org-nav-support',
    );
    expectedElements[NavElement.OrgNavBilling] = queryByTestId(
      'org-nav-billing',
    );
    expectedElements[NavElement.OrgNavAdmin] = queryByTestId(
      'org-nav-admin-link',
    );
    expectedElements[NavElement.OrgNavAllClusters] = queryByTestId(
      'org-nav-all-clusters-link',
    );
    expectedElements[NavElement.ProjectNavProjectSelectTrigger] = queryByTestId(
      'project-select-trigger',
    );
    expectedElements[NavElement.ProjectNavViewAllProjects] = queryByTestId(
      'project-select-view-all-projects',
    );
    expectedElements[NavElement.ProjectNavAddProject] = queryByTestId(
      'project-select-add-new-project',
    );
    expectedElements[NavElement.ProjectNavProjectDropdown] = queryByTestId(
      'project-nav-project-menu',
    );
    expectedElements[NavElement.ProjectNavProjectSettings] = queryByTestId(
      'project-nav-settings',
    );
    expectedElements[NavElement.ProjectNavProjectSupport] = queryByTestId(
      'project-nav-support',
    );
    expectedElements[NavElement.ProjectNavProjectIntegrations] = queryByTestId(
      'project-nav-integrations',
    );
    expectedElements[NavElement.ProjectNavCloud] = queryByTestId(
      'project-nav-atlas',
    );
    expectedElements[NavElement.ProjectNavRealm] = queryByTestId(
      'project-nav-realm',
    );
    expectedElements[NavElement.ProjectNavCharts] = queryByTestId(
      'project-nav-charts',
    );
    expectedElements[NavElement.ProjectNavInvite] = queryByTestId(
      'project-nav-invite',
    );
    expectedElements[NavElement.ProjectNavActivityFeed] = queryByTestId(
      'project-nav-activity-feed',
    );
    expectedElements[NavElement.ProjectNavAlerts] = queryByTestId(
      'project-nav-alerts',
    );
    expectedElements[NavElement.UserMenuTrigger] = queryByTestId(
      'user-menu-trigger',
    );
    expectedElements[NavElement.UserMenuFeedback] = queryByTestId(
      'user-menuitem-feedback',
    );
    expectedElements[NavElement.UserMenuCloudMFA] = queryByTestId(
      'user-menuitem-cloud-mfa',
    );
    expectedElements[NavElement.UserMenuCloudInvitations] = queryByTestId(
      'user-menuitem-cloud-invitations',
    );
    expectedElements[NavElement.UserMenuCloudOrganizations] = queryByTestId(
      'user-menuitem-cloud-organizations',
    );
    expectedElements[NavElement.UserMenuCloudUserPreferences] = queryByTestId(
      'user-menuitem-cloud-user-preferences',
    );
  };

  let onElementClick: jest.Mock,
    onProjectChange: jest.Mock,
    onOrganizationChange: jest.Mock;

  beforeEach(() => {
    onElementClick = jest.fn();
    onProjectChange = jest.fn();
    onOrganizationChange = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  const renderComponent = (props = {}) => {
    setQueries(
      render(
        <MongoNav
          activeProduct="cloud"
          mode="dev"
          admin={true}
          onOrganizationChange={onOrganizationChange}
          onProjectChange={onProjectChange}
          onElementClick={onElementClick}
          {...props}
        />,
      ),
    );
  };

  const testForNavLink = (linkName: string, fireFirst?: string) => {
    test(`calls the onElementClick callback on the ${linkName}`, () => {
      if (fireFirst) {
        fireEvent.click(expectedElements[fireFirst] as HTMLElement);
        act(setExpectedElements);
      }

      const navElement = expectedElements[linkName];
      fireEvent.click(navElement as HTMLElement);
      expect(onElementClick).toHaveBeenCalled();
      expect(onElementClick).toHaveBeenCalledWith(linkName, expect.anything());
    });
  };

  describe('when rendered with default props', () => {
    beforeEach(() => {
      act(renderComponent);
    });

    Object.keys(links).forEach(linkName => testForNavLink(linkName));
  });

  describe('when OrgSelect is open', () => {
    beforeEach(() => {
      act(renderComponent);
    });

    Object.keys(orgSelectLink).forEach(linkName =>
      testForNavLink(linkName, NavElement.OrgNavOrgSelectTrigger),
    );
  });

  describe('when the Access Manager dropdown is open', () => {
    beforeEach(() => {
      act(renderComponent);
    });

    Object.keys(orgDropdownLinks).forEach(linkName =>
      testForNavLink(linkName, NavElement.OrgNavDropdown),
    );
  });

  describe('when ProjectSelect is open', () => {
    beforeEach(() => {
      act(renderComponent);
    });

    Object.keys(projectSelectLink).forEach(linkName =>
      testForNavLink(linkName, NavElement.ProjectNavProjectSelectTrigger),
    );
  });

  describe('when the ProjectNav dropdown is open', () => {
    beforeEach(() => {
      act(renderComponent);
    });

    Object.keys(projectDropdownLinks).forEach(linkName =>
      testForNavLink(linkName, NavElement.ProjectNavProjectDropdown),
    );
  });

  describe('when the UserMenu is open', () => {
    beforeEach(() => {
      act(renderComponent);
    });

    Object.keys(userMenuLinks).forEach(linkName =>
      testForNavLink(linkName, NavElement.UserMenuTrigger),
    );
  });
});
