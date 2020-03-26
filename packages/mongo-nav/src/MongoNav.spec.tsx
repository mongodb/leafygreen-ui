import React from 'react';
import { render, fireEvent, cleanup, act } from '@testing-library/react';
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
    expectedElements.activityFeed = queryByTestId('project-nav-activity-feed');
    expectedElements.currentOrg = queryByTestId('org-select-active-org');
    expectedElements.currentProject = queryByTestId(
      'project-select-active-project',
    );
    expectedElements.allProjects = queryByTestId('project-select-project-list');
    expectedElements.userMenu = queryByTestId('user-menu-trigger');
    expectedElements.userMenuLogout = queryByTestId('user-menuitem-logout');
    expectedElements.onPremUserMenu = queryByTestId('om-user-menu-trigger');
    expectedElements.onPremLogout = queryByTestId('om-user-menuitem-sign-out');
    expectedElements.atlas = queryByTestId('project-nav-atlas');
    expectedElements.realm = queryByTestId('project-nav-realm');
    expectedElements.charts = queryByTestId('project-nav-charts');
  };

  let onOrganizationChange: jest.Mock;
  let onProjectChange: jest.Mock;
  let fetchMock: jest.Mock;
  let originalFetch: (
    input: RequestInfo,
    init?: RequestInit | undefined,
  ) => Promise<Response>;

  beforeEach(() => {
    onOrganizationChange = jest.fn();
    onProjectChange = jest.fn();
    fetchMock = jest.fn();
    originalFetch = window.fetch;
    window.fetch = fetchMock;
  });

  afterEach(() => {
    window.fetch = originalFetch;
    jest.restoreAllMocks();
    cleanup();
  });

  const renderComponent = async (props = {}) => {
    await act(async () => {
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

      await Promise.resolve();
    });
  };

  describe('by default', () => {
    const responseObject = {
      ok: true,
      json: () => Promise.resolve(dataFixtures),
    };

    beforeEach(async () => {
      fetchMock.mockResolvedValue(responseObject);
      await renderComponent();

      await act(() => responseObject.json());
    });

    test('fetch is called', () => {
      // twice, once for main data and once for alerts polling
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    test('the organization and project navs are rendered', () => {
      expect(expectedElements.orgNav).toBeInTheDocument();
      expect(expectedElements.projectNav).toBeInTheDocument();
    });

    test('current orgId is set based on data returned from fetch', () => {
      expect((expectedElements.billing as HTMLAnchorElement).href).toBe(
        `https://cloud.mongodb.com/v2#/org/${
          dataFixtures!.currentOrganization?.orgId
        }/billing/overview`,
      );
    });

    test('current orgName is displayed inside the OrgSelect based on data returned from fetch', () => {
      expect(
        expectedElements.currentOrg?.innerHTML.includes(
          dataFixtures!.currentOrganization?.orgName as string,
        ),
      ).toBe(true);
    });

    test('current projectId is set based on data returned from fetch', () => {
      expect((expectedElements.activityFeed as HTMLAnchorElement).href).toBe(
        `https://cloud.mongodb.com/v2/${
          dataFixtures!.currentProject?.projectId
        }#activity`,
      );
    });

    test('current projectName is displayed inside the ProjectSelect based on data returned from fetch', () => {
      expect(
        expectedElements.currentProject?.innerHTML.includes(
          dataFixtures!.currentProject?.projectName as string,
        ),
      ).toBe(true);
    });

    test('projects displayed in ProjectSelect are only shown if they have the same orgId as the current project', () => {
      const currentProject = expectedElements.currentProject;
      fireEvent.click(currentProject as HTMLElement);
      setExpectedElements();

      const projectList = expectedElements!.allProjects;
      const projectOptions = projectList!.querySelectorAll(
        '[data-testid="project-option"]',
      );
      expect(projectOptions[0].innerHTML.includes('Demo Project 1')).toBe(true);
      expect(projectOptions.length).toBe(1);
    });

    test('user is set based on data returned from fetch', () => {
      expect(expectedElements.userMenu?.innerHTML.includes('DevMode')).toBe(
        true,
      );
    });
  });

  describe('when activeProjectId is supplied', () => {
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

    beforeEach(async () => {
      fetchMock.mockResolvedValue(responseObject);
      await renderComponent({ activeProjectId });

      await act(() => responseObject.json());
    });

    test('fetch is called', () => {
      // twice, once for main data and once for alerts polling
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    test('the organization and project navs are rendered', () => {
      expect(expectedElements.orgNav).toBeInTheDocument();
      expect(expectedElements.projectNav).toBeInTheDocument();
    });

    test('current orgId is set based on the new activeProjectId', () => {
      expect((expectedElements.billing as HTMLAnchorElement).href).toBe(
        `https://cloud.mongodb.com/v2#/org/${newActiveProject.orgId}/billing/overview`,
      );
    });

    test('current projectId is set based on the new activeProjectId', () => {
      expect((expectedElements.activityFeed as HTMLAnchorElement).href).toBe(
        `https://cloud.mongodb.com/v2/${newActiveProject.projectId}#activity`,
      );
    });

    test('current projectName is displayed inside the ProjectSelect based on the new activeProjectId', () => {
      expect(
        expectedElements.currentProject?.innerHTML.includes(
          newActiveProject.projectName,
        ),
      ).toBe(true);
    });
  });

  describe('when activeOrgId is supplied', () => {
    const newActiveOrg = dataFixtures.organizations[1];
    const activeOrgId = newActiveOrg.orgId;
    const expectedPostData = {
      ...dataFixtures,
      currentOrganization: { ...newActiveOrg },
    };
    const responseObject = {
      ok: true,
      json: () => Promise.resolve(expectedPostData),
    };

    beforeEach(async () => {
      fetchMock.mockResolvedValue(responseObject);
      await renderComponent({ activeOrgId });

      await act(() => responseObject.json());
    });

    test('fetch is called', () => {
      // twice, once for main data and once for alerts polling
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    test('the organization and project navs are rendered', () => {
      expect(expectedElements.orgNav).toBeInTheDocument();
      expect(expectedElements.projectNav).toBeInTheDocument();
    });

    test('current orgId is set based on the new activeOrgId', () => {
      expect((expectedElements.billing as HTMLAnchorElement).href).toBe(
        `https://cloud.mongodb.com/v2#/org/${newActiveOrg.orgId}/billing/overview`,
      );
    });

    test('current orgName is displayed inside the OrgSelect based on the new activeOrgId', () => {
      expect(
        expectedElements.currentOrg?.innerHTML.includes(newActiveOrg.orgName),
      ).toBe(true);
    });
  });

  describe('when activeProjectId and activeOrgID are both supplied', () => {
    const newActiveOrg = dataFixtures.organizations[1];
    const newActiveProject = dataFixtures.projects[0];

    const activeProjectId = newActiveProject.projectId;
    const activeOrgId = newActiveOrg.orgId;

    const expectedPostData = {
      ...dataFixtures,
      currentProject: { ...newActiveProject },
    };
    const responseObject = {
      ok: true,
      json: () => Promise.resolve(expectedPostData),
    };

    beforeEach(async () => {
      fetchMock.mockResolvedValue(responseObject);
      await renderComponent({ activeOrgId, activeProjectId });

      await act(() => responseObject.json());
    });

    test('fetch is called', () => {
      // twice, once for main data and once for alerts polling
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    test('current orgId is set based on the new activeProjectId', () => {
      expect((expectedElements.billing as HTMLAnchorElement).href).toBe(
        `https://cloud.mongodb.com/v2#/org/${newActiveProject.orgId}/billing/overview`,
      );
    });

    test('current projectId is set based on the new activeProjectId', () => {
      expect((expectedElements.activityFeed as HTMLAnchorElement).href).toBe(
        `https://cloud.mongodb.com/v2/${newActiveProject.projectId}#activity`,
      );
    });

    test('current projectName is displayed inside the ProjectSelect based on the new activeProjectId', () => {
      expect(
        expectedElements.currentProject?.innerHTML.includes(
          newActiveProject.projectName,
        ),
      ).toBe(true);
    });
  });

  describe('when user passes host override', () => {
    const cloudHost = 'https://cloud-dev.mongodb.com';
    beforeEach(
      async () =>
        await renderComponent({ mode: 'dev', hosts: { cloud: cloudHost } }),
    );

    test('link is properly constructured based on host override prop', () => {
      expect((expectedElements.billing as HTMLAnchorElement).href).toBe(
        `${cloudHost}/v2#/org/${dataFixtures.currentOrganization?.orgId}/billing/overview`,
      );
    });
  });

  describe('when user passes url override', () => {
    const activityFeedHref = 'https://cloud.mongodb.com/activityfeed-test-url';
    beforeEach(
      async () =>
        await renderComponent({
          mode: 'dev',
          urls: { projectNav: { activityFeed: activityFeedHref } },
        }),
    );

    test('link is properly constructured based on host override prop', () => {
      expect((expectedElements.activityFeed as HTMLAnchorElement).href).toBe(
        activityFeedHref,
      );
    });
  });

  describe('when loadData is set to false', () => {
    beforeEach(
      async () =>
        await renderComponent({
          mode: 'dev',
          loadData: false,
        }),
    );

    test('the user name is not displayed', () => {
      expect(expectedElements.userMenu?.innerHTML.includes('DevMode')).toBe(
        false,
      );
    });

    test('the current project name is not displayed', () => {
      expect(
        expectedElements.currentProject?.innerHTML.includes(
          dataFixtures!.currentProject!.projectName,
        ),
      ).toBe(false);
    });

    test('the current organization name is not displayed', () => {
      expect(
        expectedElements.currentOrg?.innerHTML.includes(
          dataFixtures!.currentOrganization!.orgName,
        ),
      ).toBe(false);
    });
  });
});
