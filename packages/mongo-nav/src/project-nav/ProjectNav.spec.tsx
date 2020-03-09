import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import { nullableElement, Queries } from 'packages/lib/src/testHelpers';
import {
  dataFixtures,
  urlDefaults,
  hostDefaults,
  constructProjectURL,
} from '../data';
import ProjectNav, { displayProductName } from './ProjectNav';
import { startCase } from 'lodash';

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

export type Products = typeof Products[keyof typeof Products];

// data
const { currentProject, projects } = dataFixtures;
const {
  projectNav: { alerts, activityFeed, invite },
} = urlDefaults;

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

  beforeEach(() => {
    onProjectChange = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  const renderComponent = (props = {}) => {
    setQueries(
      render(
        <ProjectNav
          data={projects}
          constructProjectURL={constructProjectURL}
          urls={urlDefaults}
          activeProduct="cloud"
          hosts={hostDefaults}
          onProjectChange={onProjectChange}
          {...props}
        />,
      ),
    );
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

  const testForAlerts = (alerts: number, isVisible: boolean) => {
    it(`${
      isVisible ? 'displays' : 'does not display'
    } the ${alerts} in the nav`, () => {
      const alertsBadge = expectedElements.alertsBadge;

      if (isVisible) {
        expect(alertsBadge).toBeInTheDocument();
        expect((alertsBadge as Element).innerHTML).toContain(alerts.toString());
      } else {
        expect(alertsBadge).toBeNull();
      }
    });
  };

  describe('when rendered with default props', () => {
    const alerts = 1;
    beforeEach(() => renderComponent({ alerts, current: currentProject }));

    Object.values(Products).forEach(product =>
      testForVisibleProducts(product, product !== 'cloudManager'),
    );

    Object.keys(linkNamesToUrls).forEach(linkName =>
      testForNavLink(linkName, true),
    );

    testForAlerts(alerts, true);
  });

  describe('when the current organization uses Cloud Manager', () => {
    const alerts = 2;
    const cloudManagerProject = projects[1];

    beforeEach(() => renderComponent({ alerts, current: cloudManagerProject }));

    Object.values(Products).forEach(product =>
      testForVisibleProducts(product, product === 'cloudManager'),
    );

    Object.keys(linkNamesToUrls).forEach(linkName =>
      testForNavLink(linkName, true),
    );

    testForAlerts(alerts, true);
  });

  describe('when the date is before MongoDB World', () => {
    const testDate = new Date('March 20, 2020 0:00:00');

    test('Stitch is displayed in the ProjectNav', () => {
      const productName = displayProductName(testDate);
      expect(productName).toBe('Stitch');
    });
  });

  describe('when the date is the day of MongoDB World', () => {
    const mdbworld = new Date('May 4, 2020 0:00:00');

    test('Realm is displayed in the ProjectNav', () => {
      const productName = displayProductName(mdbworld);
      expect(productName).toBe('Realm');
    });
  });

  describe('when the date is after MongoDB World', () => {
    const testDate = new Date('May 5, 2020 0:00:00');
    test('Realm is displayed in the ProjectNav', () => {
      const productName = displayProductName(testDate);
      expect(productName).toBe('Realm');
    });
  });
});
