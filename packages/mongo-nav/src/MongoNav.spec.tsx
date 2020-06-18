import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  act,
  waitFor,
} from '@testing-library/react';
import { nullableElement, Queries } from 'packages/lib/src/testHelpers';
import { dataFixtures, getProductHost } from './data';
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
    expectedElements.userMenuCloudItem = queryByTestId(
      'user-menuitem-cloud-user-preferences',
    );
    expectedElements.userMenuLogout = queryByTestId('user-menuitem-logout');
    expectedElements.onPremUserMenu = queryByTestId('om-user-menu-trigger');
    expectedElements.onPremLogout = queryByTestId('om-user-menuitem-sign-out');
    expectedElements.atlas = queryByTestId('project-nav-atlas');
    expectedElements.realm = queryByTestId('project-nav-realm');
    expectedElements.charts = queryByTestId('project-nav-charts');
  };

  let fetchMock: jest.Mock;
  let originalFetch: (
    input: RequestInfo,
    init?: RequestInit | undefined,
  ) => Promise<Response>;

  beforeEach(() => {
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
      setQueries(render(<MongoNav activeProduct="cloud" {...props} />));
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

      // @ts-ignore  Type 'Promise<DataInterface>' is not assignable to type 'Promise<void | undefined>'.
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

    test('admin UI is not shown', () => {
      expect(expectedElements.admin).not.toBeInTheDocument();
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

      // @ts-ignore  Type 'Promise<DataInterface>' is not assignable to type 'Promise<void | undefined>'.
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

      // @ts-ignore  Type 'Promise<DataInterface>' is not assignable to type 'Promise<void | undefined>'.s
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
      await renderComponent({
        activeOrgId,
        activeProjectId,
      });

      // @ts-ignore  Type 'Promise<DataInterface>' is not assignable to type 'Promise<void | undefined>'.
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

  describe('UserMenu behaves as expected when cloud is the active platform', () => {
    beforeEach(
      async () =>
        await renderComponent({ mode: 'dev', activePlatform: 'cloud' }),
    );

    test('when the user menu opens, the cloud menu items are displayed', () => {
      fireEvent.click(expectedElements.userMenu as HTMLElement);
      setExpectedElements();

      expect(expectedElements.userMenuCloudItem).toBeInTheDocument();
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

  describe('when dataFixtures prop is set', () => {
    const newOrgName = 'My Test Org';
    beforeEach(
      async () =>
        await renderComponent({
          mode: 'dev',
          dataFixtures: {
            currentOrganization: {
              orgName: newOrgName,
            },
          },
        }),
    );

    test('prop data overrides default data', () => {
      expect(expectedElements.currentOrg?.innerHTML.includes(newOrgName)).toBe(
        true,
      );
    });
  });

  describe('when dataFixtures prop sets admin as true', () => {
    beforeEach(() =>
      renderComponent({
        mode: 'dev',
        dataFixtures: {
          account: {
            admin: true,
          },
        },
      }),
    );

    test('admin UI is shown', async () => {
      await waitFor(() => {
        setExpectedElements();
        expect(expectedElements.admin).toBeInTheDocument();
      });
    });
  });

  describe('when the date is before MongoDB World', () => {
    const preDate = new Date('June 1, 2020 0:00:00');
    test('getProductHost function returns stitch', () => {
      expect(getProductHost(preDate)).toBe('stitch');
    });
  });

  describe('when the date is the day of MongoDB World', () => {
    const mdbworld = new Date('June 8, 2020 0:00:00');

    test('getProductHost function returns realm', () => {
      const productName = getProductHost(mdbworld);
      expect(productName).toBe('realm');
    });
  });

  describe('when the date is after MongoDB World', () => {
    const testDate = new Date('June 15, 2020 0:00:00');
    test('getProductHost function returns realm', () => {
      const productName = getProductHost(testDate);
      expect(productName).toBe('realm');
    });
  });
});
