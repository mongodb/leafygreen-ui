import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { OrgSelect, ProjectSelect } from './MongoSelect';
import fixtureData from '../data';
import { CurrentProjectInterface } from '../types';

const urls = {
  userMenu: {
    cloud: {
      userPreferences: `https://cloud.mongodb.com/v2#/preferences/personalization`,
      organizations: `https://cloud.mongodb.com/v2#/preferences/organizations`,
      invitations: `https://cloud.mongodb.com/v2#/preferences/invitations`,
      mfa: `https://cloud.mongodb.com/v2#/preferences/2fa`,
    },
    university: {
      videoPreferences: `https://university.mongodb.com`,
    },
    support: {
      userPreferences: `https://support.mongodb.com/profile`,
    },
    account: {
      homepage: `https://account.mongodb.com/account/profile/overview`,
    },
  },
  mongoSelect: {
    viewAllProjects: `https://cloud.mongodb.com/v2#/org/${fixtureData.currentOrganization?.orgId}/projects`,
    newProject: `https://cloud.mongodb.com/v2#/org/${fixtureData.currentOrganization?.orgId}/projects/create`,
    viewAllOrganizations: `https://cloud-dev.mongodb.com/v2#/preferences/organizations`,
    orgSettings: `https://cloud-dev.mongodb.com/v2#/org/${fixtureData.currentOrganization?.orgId}/settings/general`,
  },
  orgNav: {
    settings: `https://cloud.mongodb.com/v2#/org/${fixtureData.currentOrganization?.orgId}/settings/general`,
    accessManager: `https://cloud.mongodb.com/v2#/org/${fixtureData.currentOrganization?.orgId}/access/users`,
    support: `https://cloud.mongodb.com/v2#/org/${fixtureData.currentOrganization?.orgId}/support`,
    billing: `https://cloud.mongodb.com/v2#/org/${fixtureData.currentOrganization?.orgId}/billing/overview`,
    allClusters: `https://cloud.mongodb.com/v2#/clusters`,
    admin: `https://cloud.mongodb.com/v2/admin#general/overview/servers`,
  },
  projectNav: {
    settings: `https://cloud.mongodb.com/v2/currentProjectId098#settings/groupSettings`,
    accessManager: `https://cloud.mongodb.com/v2/currentProjectId098#access`,
    support: `https://cloud.mongodb.com/v2/currentProjectId098#info/support`,
    integrations: `https://cloud.mongodb.com/v2/currentProjectId098#integrations`,
    alerts: `https://cloud.mongodb.com/v2/currentProjectId098#alerts`,
    activityFeed: `https://cloud.mongodb.com/v2/currentProjectId098#activity`,
  },
};

afterEach(cleanup);

describe('packages/mongo-select', () => {
  describe('OrgSelect', () => {
    const currentOrgName = fixtureData?.currentOrganization?.orgName as string;
    const onClick = jest.fn();
    const onChange = jest.fn();
    const constructOrganizationURL = (orgId: string) =>
      `https://cloud-dev.mongodb.com/v2#/org/${orgId}/projects`;

    test('by default, current organization is rendered', () => {
      const { getByText } = render(
        <OrgSelect
          current={fixtureData.currentOrganization}
          data={fixtureData.organizations}
          constructOrganizationURL={constructOrganizationURL}
          urls={urls}
          onChange={onChange}
          onClick={onClick}
        />,
      );

      const currentOrg = getByText(currentOrgName);
      expect(currentOrg).toBeInTheDocument();
    });

    test('clicking current organization opens and closes the menu', () => {
      const { getByText, getByPlaceholderText } = render(
        <OrgSelect
          current={fixtureData.currentOrganization}
          data={fixtureData.organizations}
          constructOrganizationURL={constructOrganizationURL}
          urls={urls}
          onChange={onChange}
          onClick={onClick}
        />,
      );

      const currentOrg = getByText(currentOrgName);
      fireEvent.click(currentOrg);

      const input = getByPlaceholderText('Search for an Organization...');
      expect(input).toBeInTheDocument();

      fireEvent.click(currentOrg);
      expect(input).not.toBeVisible();
    });

    test('onClick is fired when organization is clicked', () => {
      const { getByText } = render(
        <OrgSelect
          current={fixtureData.currentOrganization}
          data={fixtureData.organizations}
          constructOrganizationURL={constructOrganizationURL}
          urls={urls}
          onChange={onChange}
          onClick={onClick}
        />,
      );

      const currentOrg = getByText(currentOrgName);
      fireEvent.click(currentOrg);

      const otherOrg = getByText('Demo Organization 2');
      expect(otherOrg).toBeInTheDocument();

      fireEvent.click(otherOrg);
      expect(onClick).toHaveBeenCalled();
    });

    test('organization URLs are constructed based on prop', () => {
      const { getByText } = render(
        <OrgSelect
          current={fixtureData.currentOrganization}
          data={fixtureData.organizations}
          constructOrganizationURL={constructOrganizationURL}
          urls={urls}
          onChange={onChange}
          onClick={onClick}
        />,
      );

      const currentOrg = getByText(currentOrgName);
      fireEvent.click(currentOrg);

      const otherOrg = getByText('Demo Organization 2').parentNode?.parentNode
        ?.parentNode?.parentNode;
      expect((otherOrg as HTMLAnchorElement).href).toBe(
        'https://cloud-dev.mongodb.com/v2#/org/5e0fa79/projects',
      );
    });
  });

  describe('ProjectSelect', () => {
    const currentProjectName = fixtureData?.currentProject
      ?.projectName as string;
    const onClick = jest.fn();
    const onChange = jest.fn();
    const constructProjectURL = (projectId: string) =>
      `https://cloud-dev.mongodb.com/v2#/${projectId}`;
    test('by default, current project is rendered', () => {
      const { getByText } = render(
        <ProjectSelect
          urls={urls}
          data={fixtureData.projects}
          current={fixtureData.currentProject as CurrentProjectInterface}
          onClick={onClick}
          onChange={onChange}
          constructProjectURL={constructProjectURL}
        />,
      );

      const currentProject = getByText(currentProjectName);
      expect(currentProject).toBeInTheDocument();
    });
    test('clicking current project opens and closes the menu', () => {
      const { getByText, getByPlaceholderText } = render(
        <ProjectSelect
          urls={urls}
          data={fixtureData.projects}
          current={fixtureData.currentProject as CurrentProjectInterface}
          onClick={onClick}
          onChange={onChange}
          constructProjectURL={constructProjectURL}
        />,
      );
      const currentProject = getByText(currentProjectName);
      fireEvent.click(currentProject);

      const input = getByPlaceholderText('Search for a Project...');
      expect(input).toBeInTheDocument();

      fireEvent.click(currentProject);
      expect(input).not.toBeVisible();
    });

    test('onClick is fired when project is clicked', () => {
      const { getByText } = render(
        <ProjectSelect
          urls={urls}
          data={fixtureData.projects}
          current={fixtureData.currentProject as CurrentProjectInterface}
          onClick={onClick}
          onChange={onChange}
          constructProjectURL={constructProjectURL}
        />,
      );
      const currentProject = getByText(currentProjectName);
      fireEvent.click(currentProject);

      const otherProject = getByText('Demo Project 1');
      fireEvent.click(otherProject);
      expect(onClick).toHaveBeenCalled();
    });

    test('project URLs are constructed based on prop', () => {
      const { getByText } = render(
        <ProjectSelect
          urls={urls}
          data={fixtureData.projects}
          current={fixtureData.currentProject as CurrentProjectInterface}
          onClick={onClick}
          onChange={onChange}
          constructProjectURL={constructProjectURL}
        />,
      );
      const currentProject = getByText(currentProjectName);
      fireEvent.click(currentProject);

      const anchor = document.getElementsByTagName('li')[1]
        .firstChild as HTMLAnchorElement;
      expect(anchor?.href).toBe('https://cloud-dev.mongodb.com/v2#/5d729a93');
    });
  });
});
