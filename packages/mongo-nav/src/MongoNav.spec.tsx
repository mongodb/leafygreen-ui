import React from 'react';
import {
  act,
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';
import {} from '@testing-library/react';
import { dataFixtures } from './data';
import MongoNav from './MongoNav';

describe('packages/mongo-nav', () => {
  let queryByTestId: RenderResult['queryByTestId'];
  let getByTestId: RenderResult['getByTestId'];
  let findByTestId: RenderResult['findByTestId'];

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
      ({ findByTestId, getByTestId, queryByTestId } = render(
        <MongoNav activeProduct="cloud" {...props} />,
      ));
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

      act(() => {
        responseObject.json();
      });
    });

    test('fetch is called', () => {
      // twice, once for main data and once for alerts polling
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    test('the organization and project navs are rendered', () => {
      expect(queryByTestId('organization-nav')).toBeVisible();
      expect(queryByTestId('project-nav')).toBeVisible();
    });

    test('current orgId is set based on data returned from fetch', () => {
      expect((getByTestId('org-nav-billing') as HTMLAnchorElement).href).toBe(
        `https://cloud.mongodb.com/v2#/org/${
          dataFixtures!.currentOrganization!.orgId
        }/billing/overview`,
      );
    });

    test('current orgName is displayed inside the OrgSelect based on data returned from fetch', () => {
      expect(
        getByTestId('org-select-active-org').innerHTML.includes(
          dataFixtures!.currentOrganization!.orgName,
        ),
      ).toBe(true);
    });

    test('current projectId is set based on data returned from fetch', () => {
      expect(
        (getByTestId('project-nav-activity-feed') as HTMLAnchorElement).href,
      ).toBe(
        `https://cloud.mongodb.com/v2/${
          dataFixtures!.currentProject!.projectId
        }#activity`,
      );
    });

    test('current projectName is displayed inside the ProjectSelect based on data returned from fetch', () => {
      expect(
        getByTestId('project-select-active-project').innerHTML.includes(
          dataFixtures!.currentProject!.projectName,
        ),
      ).toBe(true);
    });

    test('projects displayed in ProjectSelect are only shown if they have the same orgId as the current project', () => {
      const currentProject = getByTestId('project-select-active-project');
      fireEvent.click(currentProject);

      const projectList = getByTestId('project-select-project-list');
      const projectOptions = projectList.querySelectorAll(
        '[data-testid="project-option"]',
      );
      expect(projectOptions[0].innerHTML.includes('Demo Project 1')).toBe(true);
      expect(projectOptions.length).toBe(1);
    });

    test('user is set based on data returned from fetch', () => {
      expect(
        getByTestId('user-menu-trigger').innerHTML.includes('DevMode'),
      ).toBe(true);
    });

    test('admin UI is not shown', () => {
      expect(queryByTestId('org-nav-admin-link')).toBeNull();
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

      act(() => {
        responseObject.json();
      });
    });

    test('fetch is called', () => {
      // twice, once for main data and once for alerts polling
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    test('the organization and project navs are rendered', () => {
      expect(queryByTestId('project-nav')).toBeVisible();
    });

    test('current orgId is set based on the new activeProjectId', () => {
      expect((getByTestId('org-nav-billing') as HTMLAnchorElement).href).toBe(
        `https://cloud.mongodb.com/v2#/org/${newActiveProject.orgId}/billing/overview`,
      );
    });

    test('current projectId is set based on the new activeProjectId', () => {
      expect(
        (getByTestId('project-nav-activity-feed') as HTMLAnchorElement).href,
      ).toBe(
        `https://cloud.mongodb.com/v2/${newActiveProject.projectId}#activity`,
      );
    });

    test('current projectName is displayed inside the ProjectSelect based on the new activeProjectId', () => {
      expect(
        getByTestId('project-select-active-project').innerHTML.includes(
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

      act(() => {
        responseObject.json();
      });
    });

    test('fetch is called', () => {
      // twice, once for main data and once for alerts polling
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    test('the organization and project navs are rendered', () => {
      expect(queryByTestId('organization-nav')).toBeVisible();
      expect(queryByTestId('project-nav')).toBeVisible();
    });

    test('current orgId is set based on the new activeOrgId', () => {
      expect((getByTestId('org-nav-billing') as HTMLAnchorElement).href).toBe(
        `https://cloud.mongodb.com/v2#/org/${newActiveOrg.orgId}/billing/overview`,
      );
    });

    test('current orgName is displayed inside the OrgSelect based on the new activeOrgId', () => {
      expect(
        getByTestId('org-select-active-org').innerHTML.includes(
          newActiveOrg.orgName,
        ),
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

      act(() => {
        responseObject.json();
      });
    });

    test('fetch is called', () => {
      // twice, once for main data and once for alerts polling
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    test('current orgId is set based on the new activeProjectId', () => {
      expect((getByTestId('org-nav-billing') as HTMLAnchorElement).href).toBe(
        `https://cloud.mongodb.com/v2#/org/${newActiveProject.orgId}/billing/overview`,
      );
    });

    test('current projectId is set based on the new activeProjectId', () => {
      expect(
        (getByTestId('project-nav-activity-feed') as HTMLAnchorElement).href,
      ).toBe(
        `https://cloud.mongodb.com/v2/${newActiveProject.projectId}#activity`,
      );
    });

    test('current projectName is displayed inside the ProjectSelect based on the new activeProjectId', () => {
      expect(
        getByTestId('project-select-active-project').innerHTML.includes(
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
      fireEvent.click(getByTestId('user-menu-trigger'));

      expect(
        queryByTestId('user-menuitem-cloud-user-preferences'),
      ).toBeInTheDocument();
    });
  });

  describe('when user passes host override', () => {
    const cloudHost = 'https://cloud-dev.mongodb.com';
    beforeEach(
      async () =>
        await renderComponent({ mode: 'dev', hosts: { cloud: cloudHost } }),
    );

    test('link is properly constructured based on host override prop', () => {
      expect((getByTestId('org-nav-billing') as HTMLAnchorElement).href).toBe(
        `${cloudHost}/v2#/org/${
          dataFixtures.currentOrganization!.orgId
        }/billing/overview`,
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
      expect(
        (getByTestId('project-nav-activity-feed') as HTMLAnchorElement).href,
      ).toBe(activityFeedHref);
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
      expect(
        getByTestId('user-menu-trigger').innerHTML.includes('DevMode'),
      ).toBe(false);
    });

    test('the current project name is not displayed', () => {
      expect(
        getByTestId('project-select-active-project').innerHTML.includes(
          dataFixtures!.currentProject!.projectName,
        ),
      ).toBe(false);
    });

    test('the current organization name is not displayed', () => {
      expect(
        getByTestId('org-select-active-org').innerHTML.includes(
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
      expect(
        getByTestId('org-select-active-org').innerHTML.includes(newOrgName),
      ).toBe(true);
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
      expect(await findByTestId('org-nav-admin-link')).toBeVisible();
    });
  });
});
