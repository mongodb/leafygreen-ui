import React from 'react';
import { act, cleanup, render, RenderResult } from '@testing-library/react';
import {
  dataFixtures,
  urlFixtures,
  hostDefaults,
  constructProjectURL,
} from '../data';
import ProjectNav from './ProjectNav';
import startCase from 'lodash/startCase';
import { Mode } from '../types';

const productToTestId: Record<string, string> = {
  realm: 'project-nav-realm',
  charts: 'project-nav-charts',
  atlas: 'project-nav-atlas',
  cloudManager: 'project-nav-cloud-manager',
};

// data
const { currentProject, projects } = dataFixtures;
const {
  projectNav: { alerts, activityFeed, invite },
} = urlFixtures;

// this avoids having to explicitly type orgNav with nullable fields
// and then extend it to allow string indexes
const linkNamesToUrls: Record<string, string | undefined> = {
  alerts,
  activityFeed,
  invite,
};

const linkNamesToTestIds: Record<string, string> = {
  alerts: 'project-nav-alerts',
  activityFeed: 'project-nav-activity-feed',
  invite: 'project-nav-invite',
};

describe('packages/mongo-nav/src/project-nav', () => {
  let getByTestId: RenderResult['getByTestId'];
  let queryByTestId: RenderResult['queryByTestId'];

  let onProjectChange: jest.Mock;

  let fetchMock: jest.Mock;
  let originalFetch: (
    input: RequestInfo,
    init?: RequestInit | undefined,
  ) => Promise<Response>;

  let fetchData: Array<object>;

  beforeEach(() => {
    onProjectChange = jest.fn();
    fetchMock = jest.fn();
    fetchData = [];
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(fetchData),
    });
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
      ({ getByTestId, queryByTestId } = render(
        <ProjectNav
          data={projects}
          constructProjectURL={constructProjectURL}
          urls={urlFixtures}
          activeProduct="cloud"
          environment="commercial"
          hosts={hostDefaults()}
          onProjectChange={onProjectChange}
          mode={Mode.Production}
          {...props}
        />,
      ));
    });
  };

  const testForNavLink = (linkName: string, isVisible = true) => {
    it(`${isVisible ? 'displays' : 'does not display'} the ${startCase(
      linkName,
    )} iconButton`, () => {
      const navLink = queryByTestId(linkNamesToTestIds[linkName]);

      if (isVisible) {
        expect(navLink).toBeVisible();

        expect((navLink as HTMLAnchorElement).href).toEqual(
          linkNamesToUrls[linkName],
        );
      } else {
        expect(navLink).not.toBeVisible();
      }
    });
  };

  const testForVisibleProducts = (product: string, isVisible: boolean) => {
    it(`${
      isVisible ? 'displays' : 'does not display'
    } the ${product} in the nav`, () => {
      const foundProduct = queryByTestId(productToTestId[product]);

      if (isVisible) {
        expect(foundProduct).toBeVisible();
      } else {
        expect(foundProduct).toBeNull();
      }
    });
  };

  const testForProjectStatusBadge = (isVisible: boolean) => {
    it(`${
      isVisible ? 'displays' : 'does not display'
    } the project status badge in the nav`, () => {
      const statusBadge = queryByTestId('project-nav-project-status-badge');

      if (isVisible) {
        expect(statusBadge).toBeVisible();
        expect(statusBadge!.innerHTML).toContain('ACTIVE');
      } else {
        expect(statusBadge).toBeNull();
      }
    });
  };

  describe('when rendered with default props', () => {
    beforeEach(async () => {
      fetchData = [];
      await renderComponent({ current: currentProject });
    });

    Object.keys(productToTestId).forEach(product =>
      testForVisibleProducts(product, product !== 'cloudManager'),
    );

    Object.keys(linkNamesToUrls).forEach(linkName =>
      testForNavLink(linkName, true),
    );

    testForProjectStatusBadge(false);

    it('atlas tab shows the correct link', () => {
      expect(getByTestId('project-nav-atlas').getAttribute('href')).toEqual(
        'https://cloud.mongodb.com/v2/fakeProjectId1#',
      );
    });

    it('does not show alerts badge', () => {
      expect(queryByTestId('project-nav-alerts-badge')).toBeNull();
    });
  });

  describe('when the current organization uses Cloud Manager', () => {
    const cloudManagerProject = projects[1];

    beforeEach(async () => {
      await renderComponent({ current: cloudManagerProject });
    });

    Object.keys(productToTestId).forEach(product =>
      testForVisibleProducts(product, product === 'cloudManager'),
    );

    Object.keys(linkNamesToUrls).forEach(linkName =>
      testForNavLink(linkName, true),
    );
  });

  describe('when the environment is "government"', () => {
    test('Atlas is the only product tab displayed', () => {
      renderComponent({ environment: 'government' });
      expect(getByTestId('project-nav-atlas')).toBeVisible();
      expect(queryByTestId('project-nav-charts')).toBeNull();
      expect(queryByTestId('project-nav-realm')).toBeNull();
    });
  });

  describe('alerts polling behavior', () => {
    describe('when it should poll', () => {
      beforeEach(async () => {
        fetchData = [{}, {}];
        await renderComponent({ current: currentProject });
      });

      it('calls fetch with correct arguments', () => {
        expect(
          fetchMock,
        ).toHaveBeenCalledWith(
          'https://cloud.mongodb.com/user/shared/alerts/project/fakeProjectId1',
          { credentials: 'include', method: 'GET', mode: 'cors' },
        );
      });

      it('displays expected alerts badge', () => {
        expect(getByTestId('project-nav-alerts-badge').innerHTML).toContain(
          '2',
        );
      });
    });

    describe('when in dev mode', () => {
      beforeEach(async () => {
        fetchData = [{}, {}];
        await renderComponent({ current: currentProject, mode: Mode.Dev });
      });

      it('does not call fetch', () => {
        expect(fetchMock).not.toHaveBeenCalled();
      });

      it('displays value from currentProject', () => {
        expect(getByTestId('project-nav-alerts-badge').innerHTML).toContain(
          '1',
        );
      });
    });
  });

  describe('when rendered without a current project', () => {
    beforeEach(() => renderComponent());

    test('atlas tab shows the correct link', () => {
      expect(getByTestId('project-nav-atlas').getAttribute('href')).toEqual(
        'https://cloud.mongodb.com',
      );
    });
  });

  describe('when admin is set to true', () => {
    beforeEach(() => renderComponent({ admin: true, current: currentProject }));

    testForProjectStatusBadge(true);
  });
});
