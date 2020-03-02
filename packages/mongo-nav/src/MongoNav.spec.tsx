import React from 'react';
import { render, cleanup, waitForDomChange } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { nullableElement, Queries } from 'packages/lib/src/testHelpers';
import { dataFixtures } from './data';
import MongoNav from './MongoNav';

// types
interface ExpectedElements {
  [key: string]: nullableElement;
}

describe('packages/mongo-nav', () => {
  const queries: Queries = {};
  const expectedElements: ExpectedElements = {};

  const setQueries = ({ queryByTestId }: Queries) => {
    Object.assign(queries, { queryByTestId });
    setExpectedElements();
  };

  const setExpectedElements = () => {
    const { queryByTestId = () => null } = queries;
    expectedElements.orgNav = queryByTestId('organization-nav');
    expectedElements.projectNav = queryByTestId('project-nav');
    expectedElements.admin = queryByTestId('org-nav-admin-link');
    expectedElements.billing = queryByTestId('org-nav-billing');
    expectedElements.invite = queryByTestId('project-nav-invite');
  };

  let onOrganizationChange: jest.Mock;
  let onProjectChange: jest.Mock;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    onOrganizationChange = jest.fn();
    onProjectChange = jest.fn();
    fetchMock = jest.fn();
    window.fetch = fetchMock;
  });

  afterEach(() => {
    window.fetch;
    jest.restoreAllMocks();
    cleanup();
  });

  const renderComponent = (props = {}) => {
    setQueries(
      render(
        <MongoNav
          activeProduct="cloud"
          onOrganizationChange={onOrganizationChange}
          onProjectChange={onProjectChange}
          {...props}
        />,
      ),
    );
  };

  describe('when rendered in dev mode', () => {
    beforeEach(() =>
      renderComponent({
        mode: 'dev',
      }),
    );

    test('the organization nav is rendered', () => {
      const organizationNav = expectedElements['orgNav'];
      expect(organizationNav).toBeInTheDocument();
    });

    test('the project nav is rendered', () => {
      const projectNav = expectedElements['projectNav'];
      expect(projectNav).toBeInTheDocument();
    });
  });

  describe('when user passes host override', () => {
    const cloudHost = 'https://cloud-dev.mongodb.com';
    beforeEach(() =>
      renderComponent({ mode: 'dev', hosts: { cloud: cloudHost } }),
    );

    test('link is properly constructured based on host override prop', () => {
      const billing = expectedElements['billing'];
      expect((billing as HTMLAnchorElement).href).toBe(
        `${cloudHost}/v2#/org/${dataFixtures.currentOrganization?.orgId}/billing/overview`,
      );
    });
  });

  describe('when in production mode', () => {
    const responseObject = {
      ok: true,
      json: () => Promise.resolve(dataFixtures),
    };

    beforeEach(() => {
      fetchMock.mockResolvedValue(responseObject).mock;
      renderComponent();
    });

    test('fetch is called', () => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    test('the organization nav is rendered', () => {
      const organizationNav = expectedElements['orgNav'];
      expect(organizationNav).toBeInTheDocument();
    });

    test('the project nav is rendered', () => {
      const projectNav = expectedElements['projectNav'];
      expect(projectNav).toBeInTheDocument();
    });
  });

  describe('when in production mode and activeProjectId is supplied', () => {
    const newActiveProject = dataFixtures.projects[0];
    const activeProjectId = newActiveProject.projectId;
    const expectedPostData = {
      ...dataFixtures,
      currentProject: { ...newActiveProject },
    };
    const responseObject = {
      ok: true,
      json: () => Promise.resolve(expectedPostData),
    };

    beforeEach(() => {
      fetchMock.mockResolvedValue(responseObject);
      renderComponent({ activeProjectId });
      setExpectedElements();
    });

    test('fetch is called', () => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    test('current orgId is set based on the new activeProjectId', () => {
      const billing = expectedElements['billing'];
      expect((billing as HTMLAnchorElement).href).toBe(
        `https://cloud.mongodb.com/v2#/org/${newActiveProject.orgId}/billing/overview`,
      );
    });

    test('current projectId is set based on the new activeProjectId', () => {
      const invite = expectedElements['invite'];
      setExpectedElements();
      console.log(invite);
    });
  });
});
