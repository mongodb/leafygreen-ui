import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { nullableElement, Queries } from 'packages/lib/src/testHelpers';
import {
  dataFixtures,
  urlFixtures,
  hostDefaults,
  constructOrganizationURL,
} from '../data';
import OrgNav from './OrgNav';
import { startCase } from 'lodash';
import { NavElement, ActiveNavElement } from '../types';

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
} = urlFixtures;

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
    expectedElements.paymentStatus = queryByTestId('org-nav-payment-status');
    expectedElements.accessManager = queryByTestId('org-nav-access-manager');
    expectedElements.accessManagerDropdown = queryByTestId('org-nav-dropdown');
    expectedElements.accessManagerOrg = queryByTestId(
      'org-nav-dropdown-org-access-manager',
    );
    expectedElements.accessManagerProject = queryByTestId(
      'org-nav-dropdown-project-access-manager',
    );
    expectedElements.support = queryByTestId('org-nav-support');
    expectedElements.billing = queryByTestId('org-nav-billing');
    expectedElements.allClusters = queryByTestId('org-nav-all-clusters-link');
    expectedElements.admin = queryByTestId('org-nav-admin-link');
    expectedElements.version = queryByTestId('org-nav-on-prem-version');
    expectedElements.userMenu = queryByTestId('user-menu-trigger');
    expectedElements.onPremUserMenu = queryByTestId('om-user-menu-trigger');
    expectedElements.onPremUserMenuMFA = queryByTestId('om-user-menuitem-mfa');
    expectedElements.onPremUserMenuSignOut = queryByTestId(
      'om-user-menuitem-sign-out',
    );
    expectedElements.seeProductTour = queryByTestId('org-nav-see-product-tour');
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
          activeNav={NavElement.OrgNavOrgSettings}
          activeProduct="cloud"
          current={currentOrganization}
          data={organizations}
          constructOrganizationURL={constructOrganizationURL}
          onOrganizationChange={onOrganizationChange}
          urls={urlFixtures}
          admin={false}
          hosts={hostDefaults}
          showProjectNav={true}
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

  const testForUserMenu = (isVisible = true) => {
    it(`${isVisible ? 'displays' : 'does not display'} the UserMenu and ${
      isVisible ? 'does not display' : 'displays'
    } the onPrem User Menu`, () => {
      const userMenu = expectedElements['userMenu'];
      const onPremUserMenu = expectedElements['onPremUserMenu'];

      if (isVisible) {
        expect(userMenu).toBeInTheDocument();
        expect(onPremUserMenu).toBeNull();
      } else {
        expect(onPremUserMenu).toBeInTheDocument();
        expect(userMenu).toBeNull();
      }
    });
  };

  const testForMFA = (isVisible = true) => {
    it(`${isVisible ? 'displays' : 'does not display'} the MFA option`, () => {
      const onPremUserMenu = expectedElements['onPremUserMenu'];
      fireEvent.click(onPremUserMenu as Element);
      setExpectedElements();

      const onPremUserMenuMFA = expectedElements['onPremUserMenuMFA'];

      if (isVisible) {
        expect(onPremUserMenuMFA).toBeInTheDocument();
        expect((onPremUserMenuMFA as HTMLAnchorElement).href).toBe(
          'https://cloud.mongodb.com/v2#/account/2fa',
        );
      } else {
        expect(onPremUserMenuMFA).toBeNull();
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

  const testForSeeProductTour = (isVisible = true) => {
    it(`${
      isVisible ? 'displays' : 'does not display'
    } the See Product Tour link`, () => {
      const productTour = expectedElements.seeProductTour;

      if (isVisible) {
        expect(productTour).toBeInTheDocument();
      } else {
        expect(productTour).toBeNull();
      }
    });
  };

  describe('when rendered with default props', () => {
    beforeEach(renderComponent);
    testForPaymentStatus(false);
    testForVersion(false);
    testForUserMenu(true);
    testForSeeProductTour(false);

    Object.keys(linkNamesToUrls).forEach(linkName =>
      testForNavLink(linkName, linkName !== 'admin'),
    );
  });

  describe('when rendered as an admin without an active preferences nav', () => {
    beforeEach(() => renderComponent({ admin: true }));
    testForPaymentStatus(true);

    Object.keys(linkNamesToUrls).forEach(linkName => testForNavLink(linkName));
  });

  describe('when rendered as an admin with an active preferences nav', () => {
    const cloudUserNavItems = [
      ActiveNavElement.UserMenuCloudInvitations,
      ActiveNavElement.UserMenuCloudMFA,
      ActiveNavElement.UserMenuCloudOrganizations,
      ActiveNavElement.UserMenuCloudOther,
      ActiveNavElement.UserMenuCloudUserPreferences,
    ];

    cloudUserNavItems.forEach(activeNav => {
      describe(`when the element ${activeNav as string} is active`, () => {
        beforeEach(() =>
          renderComponent({
            activeNav,
            admin: true,
          }),
        );

        testForPaymentStatus(false);
        testForVersion(false);

        Object.keys(linkNamesToUrls).forEach(linkName =>
          testForNavLink(linkName, ['allClusters', 'admin'].includes(linkName)),
        );
      });
    });
  });

  describe('when rendered without project nav', () => {
    beforeEach(() =>
      renderComponent({
        showProjectNav: false,
      }),
    );

    it('shows project access as disabled', () => {
      fireEvent.click(expectedElements.accessManagerDropdown!);
      setExpectedElements();

      expect(expectedElements.accessManagerProject).toBeInTheDocument();
      expect(expectedElements.accessManagerProject).toHaveAttribute(
        'aria-disabled',
        'true',
      );
      expect(expectedElements.accessManagerProject).toContainHTML('None');
    });
  });

  describe('when rendered onPrem', () => {
    beforeEach(() =>
      renderComponent({
        onPremEnabled: true,
        onPremVersion: '4.4.0',
      }),
    );

    testForPaymentStatus(false);
    testForVersion(true);
    testForUserMenu(false);
    testForMFA(false);

    Object.keys(linkNamesToUrls).forEach(linkName =>
      testForNavLink(linkName, ['billing', 'admin'].indexOf(linkName) === -1),
    );
  });

  describe('when rendered onPrem and onPremMFA is true', () => {
    beforeEach(() =>
      renderComponent({
        onPremEnabled: true,
        onPremMFA: true,
      }),
    );

    testForMFA(true);
  });

  describe('when rendered onPrem and admin is set to true', () => {
    beforeEach(() =>
      renderComponent({
        onPremEnabled: true,
        onPremVersion: '4.4.0',
        admin: true,
      }),
    );

    Object.keys(linkNamesToUrls).forEach(linkName =>
      testForNavLink(linkName, linkName !== 'billing'),
    );
  });

  describe('when rendered as an ops manager admin with an active account nav', () => {
    const onPremUserNavItems = [
      ActiveNavElement.UserMenuOnPremInvitations,
      ActiveNavElement.UserMenuOnPremOrganizations,
      ActiveNavElement.UserMenuOnPremOther,
      ActiveNavElement.UserMenuOnPremPersonalization,
      ActiveNavElement.UserMenuOnPremProfile,
      ActiveNavElement.UserMenuOnPremPublicApiAccess,
      ActiveNavElement.UserMenuOnPremTwoFactorAuth,
    ];

    onPremUserNavItems.forEach(activeNav => {
      describe(`when the element ${activeNav as string} is active`, () => {
        beforeEach(() =>
          renderComponent({
            activeNav,
            onPremEnabled: true,
            onPremVersion: '4.4.0',
            admin: true,
          }),
        );

        testForPaymentStatus(false);
        testForVersion(true);

        Object.keys(linkNamesToUrls).forEach(linkName =>
          testForNavLink(linkName, ['allClusters', 'admin'].includes(linkName)),
        );
      });
    });
  });

  describe('the Access Manager dropdown displays correctly', () => {
    test('when onPrem and currentProject exist, the Project Access Manager link is not disabled and project name is displayed', () => {
      renderComponent({
        onPremEnabled: true,
        showProjectNav: false,
        currentProjectName: 'Test Project',
        currentProjectId: 'test-project-id',
      });
      fireEvent.click(expectedElements.accessManagerDropdown as HTMLElement);
      setExpectedElements();

      expect(
        expectedElements.accessManagerProject?.innerHTML.includes(
          'Test Project',
        ),
      ).toBe(true);
      expect(
        expectedElements.accessManagerProject?.getAttribute('aria-disabled'),
      ).toBe('false');
    });

    test('when onPrem and currentProject does not exist, the Project Access Manager link is disabled and the project name appears as "None"', () => {
      renderComponent({
        onPremEnabled: true,
        showProjectNav: false,
      });
      fireEvent.click(expectedElements.accessManagerDropdown as HTMLElement);
      setExpectedElements();

      expect(
        expectedElements.accessManagerProject?.innerHTML.includes('None'),
      ).toBe(true);
      expect(
        expectedElements.accessManagerProject?.getAttribute('aria-disabled'),
      ).toBe('true');
    });

    test('when not onPrem and showProjectNav is true, the Project Access Manager link is not disabled and project name is displayed', () => {
      renderComponent({
        showProjectNav: true,
        currentProjectName: 'Test Project',
        currentProjectId: 'test-project-id',
      });
      fireEvent.click(expectedElements.accessManagerDropdown as HTMLElement);
      setExpectedElements();

      expect(
        expectedElements.accessManagerProject?.innerHTML.includes(
          'Test Project',
        ),
      ).toBe(true);
      expect(
        expectedElements.accessManagerProject?.getAttribute('aria-disabled'),
      ).toBe('false');
    });

    test('when not onPrem and showProjectNav is false, , the Project Access Manager link is disabled and the project name appears as "None"', () => {
      renderComponent({
        showProjectNav: false,
      });
      fireEvent.click(expectedElements.accessManagerDropdown as HTMLElement);
      setExpectedElements();

      expect(
        expectedElements.accessManagerProject?.innerHTML.includes('None'),
      ).toBe(true);
      expect(
        expectedElements.accessManagerProject?.getAttribute('aria-disabled'),
      ).toBe('true');
    });
  });

  describe('when window.Appcues is true', () => {
    let originalWindowAppcues: boolean;

    beforeEach(() => {
      // @ts-ignore Property 'Appcues' does not exist on type 'Window & typeof globalThis'
      originalWindowAppcues = window.Appcues;
      // @ts-ignore Property 'Appcues' does not exist on type 'Window & typeof globalThis'
      window.Appcues = true;
      renderComponent();
    });

    afterEach(() => {
      // @ts-ignore Property 'Appcues' does not exist on type 'Window & typeof globalThis'
      window.Appcues = originalWindowAppcues;
      jest.restoreAllMocks();
      cleanup();
    });

    testForSeeProductTour(true);
  });
});
