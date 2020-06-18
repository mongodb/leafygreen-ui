import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import { nullableElement, Queries } from 'packages/lib/src/testHelpers';
import {
  dataFixtures,
  urlFixtures,
  hostDefaults,
  constructProjectURL,
} from '../data';
import ProjectNav from './ProjectNav';
import { startCase } from 'lodash';
import { Mode } from '../types';

// types
interface ExpectedElements {
  [key: string]: nullableElement;
}

interface LinkNameToUrls {
  [key: string]: string | null | undefined;
}

const Products = {
  CloudManager: 'cloudManager',
  Atlas: 'atlas',
  Realm: 'realm',
  Charts: 'charts',
};

type Products = typeof Products[keyof typeof Products];

// data
const { currentProject, projects } = dataFixtures;
const {
  projectNav: { alerts, activityFeed, invite },
} = urlFixtures;

// this avoids having to explicitly type orgNav with nullable fields
// and then extend it to allow string indexes
const linkNamesToUrls: LinkNameToUrls = {
  alerts,
  activityFeed,
  invite,
};

describe('packages/mongo-nav/src/project-nav', () => {
  const queries: Queries = {};
  const expectedElements: ExpectedElements = {};

  const setQueries = ({ queryByTestId }: Queries) => {
    Object.assign(queries, { queryByTestId });
    setExpectedElements();
  };

  const setExpectedElements = () => {
    const { queryByTestId = () => null } = queries;
    expectedElements.projectStatusBadge = queryByTestId(
      'project-nav-project-status-badge',
    );
    expectedElements.atlas = queryByTestId('project-nav-atlas');
    expectedElements.cloudManager = queryByTestId('project-nav-cloud-manager');
    expectedElements.realm = queryByTestId('project-nav-realm');
    expectedElements.charts = queryByTestId('project-nav-charts');
    expectedElements.alerts = queryByTestId('project-nav-alerts');
    expectedElements.alertsBadge = queryByTestId('project-nav-alerts-badge');
    expectedElements.activityFeed = queryByTestId('project-nav-activity-feed');
    expectedElements.invite = queryByTestId('project-nav-invite');
  };

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
      setQueries(
        render(
          <ProjectNav
            data={projects}
            constructProjectURL={constructProjectURL}
            urls={urlFixtures}
            activeProduct="cloud"
            hosts={hostDefaults}
            onProjectChange={onProjectChange}
            mode={Mode.Production}
            {...props}
          />,
        ),
      );
    });
  };

  const testForNavLink = (linkName: string, isVisible = true) => {
    it(`${isVisible ? 'displays' : 'does not display'} the ${startCase(
      linkName,
    )} iconButton`, () => {
      const navLink = expectedElements[linkName];

      if (isVisible) {
        expect(navLink).toBeInTheDocument();

        expect((navLink as HTMLAnchorElement)?.href).toEqual(
          linkNamesToUrls[linkName],
        );
      } else {
        expect(navLink).toBeNull();
      }
    });
  };

  const testForVisibleProducts = (product: Products, isVisible: boolean) => {
    it(`${
      isVisible ? 'displays' : 'does not display'
    } the ${product} in the nav`, () => {
      const foundProduct = expectedElements[product];

      if (isVisible) {
        expect(foundProduct).toBeInTheDocument();
      } else {
        expect(foundProduct).toBeNull();
      }
    });
  };

  const testForProjectStatusBadge = (isVisible: boolean) => {
    it(`${
      isVisible ? 'displays' : 'does not display'
    } the project status badge in the nav`, () => {
      const statusBadge = expectedElements.projectStatusBadge;

      if (isVisible) {
        expect(statusBadge).toBeInTheDocument();
        expect((statusBadge as Element).innerHTML).toContain('ACTIVE');
      } else {
        expect(statusBadge).not.toBeInTheDocument();
      }
    });
  };

  describe('when rendered with default props', () => {
    beforeEach(async () => {
      fetchData = [];
      await renderComponent({ current: currentProject });
    });

    Object.values(Products).forEach(product =>
      testForVisibleProducts(product, product !== 'cloudManager'),
    );

    Object.keys(linkNamesToUrls).forEach(linkName =>
      testForNavLink(linkName, true),
    );

    testForProjectStatusBadge(false);

    it('atlas tab shows the correct link', () => {
      expect(expectedElements!.atlas!.getAttribute('href')).toEqual(
        'https://cloud.mongodb.com/v2/fakeProjectId1#',
      );
    });

    it('does not show alerts badge', () => {
      expect(expectedElements.alertsBadge).not.toBeInTheDocument();
    });
  });

  describe('when the current organization uses Cloud Manager', () => {
    const cloudManagerProject = projects[1];

    beforeEach(async () => {
      await renderComponent({ current: cloudManagerProject });
    });

    Object.values(Products).forEach(product =>
      testForVisibleProducts(product, product === 'cloudManager'),
    );

    Object.keys(linkNamesToUrls).forEach(linkName =>
      testForNavLink(linkName, true),
    );
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
        const alertsBadge = expectedElements.alertsBadge;

        expect(alertsBadge).toBeInTheDocument();
        expect((alertsBadge as Element).innerHTML).toContain('2');
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
        const alertsBadge = expectedElements.alertsBadge;

        expect(alertsBadge).toBeInTheDocument();
        expect((alertsBadge as Element).innerHTML).toContain('1');
      });
    });
  });

  describe('when rendered without a current project', () => {
    beforeEach(() => renderComponent());

    test('atlas tab shows the correct link', () => {
      expect(expectedElements!.atlas!.getAttribute('href')).toEqual(
        'https://cloud.mongodb.com',
      );
    });
  });

  describe('when admin is set to true', () => {
    beforeEach(() => renderComponent({ admin: true, current: currentProject }));

    testForProjectStatusBadge(true);
  });
});
