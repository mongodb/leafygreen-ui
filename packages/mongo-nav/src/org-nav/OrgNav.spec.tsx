import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import { nullableElement, Queries } from 'packages/lib/src/testHelpers';
import {
  dataFixtures,
  urlDefaults,
  hostDefaults,
  constructOrganizationURL,
} from '../data';
import OrgNav from './OrgNav';
import { startCase } from 'lodash';

// types
interface ExpectedElements {
  [key: string]: nullableElement;
}

interface LinkNameToUrls {
  [key: string]: string | null | undefined;
}

// data
const { account, currentOrganization, organizations } = dataFixtures;
const {
  orgNav: { accessManager, support, billing, allClusters, admin },
} = urlDefaults;

// this avoids having to explicitly type orgNav with nullable fields
// and then extend it to allow string indexes
const linkNamesToUrls: LinkNameToUrls = {
  accessManager,
  support,
  billing,
  allClusters,
  admin,
};

describe('packages/mongo-nav/src/org-nav', () => {
  const queries: Queries = {};
  const expectedElements: ExpectedElements = {};

  const setQueries = ({ queryByTestId }: Queries) => {
    Object.assign(queries, { queryByTestId });
    setExpectedElements();
  };

  const setExpectedElements = () => {
    const { queryByTestId = () => null } = queries;
    expectedElements.paymentStatus = queryByTestId('org-payment-status');
    expectedElements.accessManager = queryByTestId('org-access-manager');
    expectedElements.support = queryByTestId('org-support');
    expectedElements.billing = queryByTestId('org-billing');
    expectedElements.allClusters = queryByTestId('all-clusters-link');
    expectedElements.admin = queryByTestId('admin-link');
    expectedElements.version = queryByTestId('onPrem-version');
  };

  let onOrganizationChange: jest.Mock;

  beforeEach(() => {
    onOrganizationChange = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  const renderComponent = (props = {}) => {
    setQueries(
      render(
        <OrgNav
          account={account}
          activeNav="orgSettings"
          activeProduct="cloud"
          current={currentOrganization}
          data={organizations}
          constructOrganizationURL={constructOrganizationURL}
          onOrganizationChange={onOrganizationChange}
          urls={urlDefaults}
          admin={false}
          hosts={hostDefaults}
          {...props}
        />,
      ),
    );
  };

  const testForVersion = (isVisible = true) => {
    it(`${isVisible ? 'displays' : 'does not display'} the version`, () => {
      const version = expectedElements['version'];

      if (isVisible) {
        expect(version).toBeInTheDocument();
      } else {
        expect(version).toBeNull();
      }
    });
  };

  const testForPaymentStatus = (isVisible = true) => {
    it(`${
      isVisible ? 'displays' : 'does not display'
    } the payment status badge`, () => {
      const badge = expectedElements['paymentStatus'];

      if (isVisible) {
        expect(badge).toBeInTheDocument();
        expect(badge?.textContent).toEqual(currentOrganization?.paymentStatus);
      } else {
        expect(badge).toBeNull();
      }
    });
  };

  const testForNavLink = (linkName: string, isVisible = true) => {
    it(`${isVisible ? 'displays' : 'does not display'} the ${startCase(
      linkName,
    )} nav`, () => {
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

  describe('when rendered with default props', () => {
    beforeEach(renderComponent);
    testForPaymentStatus(false);
    testForVersion(false);

    Object.keys(linkNamesToUrls).forEach(linkName =>
      testForNavLink(linkName, linkName !== 'admin'),
    );
  });

  describe('when rendered with an active preferences nav', () => {
    beforeEach(() =>
      renderComponent({
        activeNav: 'userSettings',
      }),
    );
    testForPaymentStatus(false);
    testForVersion(false);

    Object.keys(linkNamesToUrls).forEach(linkName =>
      testForNavLink(linkName, linkName === 'allClusters'),
    );
  });

  describe('when rendered as an admin without an active preferences nav', () => {
    beforeEach(() => renderComponent({ admin: true }));
    testForPaymentStatus(true);

    Object.keys(linkNamesToUrls).forEach(linkName => testForNavLink(linkName));
  });

  describe('when rendered as an admin with an active preferences nav', () => {
    beforeEach(() =>
      renderComponent({
        activeNav: 'userSettings',
        admin: true,
      }),
    );

    testForPaymentStatus(false);
    testForVersion(false);

    Object.keys(linkNamesToUrls).forEach(linkName =>
      testForNavLink(linkName, ['allClusters', 'admin'].includes(linkName)),
    );
  });

  describe('when rendered onPrem', () => {
    beforeEach(() =>
      renderComponent({ isOnPrem: true, admin: true, version: '4.4.0' }),
    );

    testForPaymentStatus(true);
    testForVersion(true);

    Object.keys(linkNamesToUrls).forEach(linkName =>
      testForNavLink(linkName, linkName !== 'billing'),
    );
  });
});
