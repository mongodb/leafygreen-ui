import React from 'react';
import startCase from 'lodash/startCase';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';
import {
  dataFixtures,
  urlFixtures,
  hostDefaults,
  constructOrganizationURL,
} from '../data';
import OrgNav from './OrgNav';
import { NavElement, ActiveNavElement } from '../types';

// data
const { account, currentOrganization, organizations } = dataFixtures;
const {
  orgNav: { support, billing, allClusters, admin },
} = urlFixtures;

// this avoids having to explicitly type orgNav with nullable fields
// and then extend it to allow string indexes
const linkNamesToUrls: Record<string, string | undefined> = {
  support,
  billing,
  allClusters,
  admin,
};

const linkNamesToText: Record<string, string> = {
  allClusters: 'All Clusters',
  admin: 'Admin',
  support: 'Support',
  billing: 'Billing',
};

describe('packages/mongo-nav/src/org-nav', () => {
  let getByTestId: RenderResult['getByTestId'];
  let queryByTestId: RenderResult['queryByTestId'];
  let queryByText: RenderResult['queryByText'];

  let onOrganizationChange: jest.Mock;

  beforeEach(() => {
    onOrganizationChange = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  const renderComponent = (props = {}) => {
    ({ getByTestId, queryByTestId, queryByText } = render(
      <OrgNav
        account={account}
        activeNav={NavElement.OrgNavOrgSettings}
        current={currentOrganization}
        data={organizations}
        constructOrganizationURL={constructOrganizationURL}
        onOrganizationChange={onOrganizationChange}
        urls={urlFixtures}
        admin={false}
        hosts={hostDefaults()}
        showProjectNav={true}
        {...props}
      />,
    ));
  };

  const testForVersion = (isVisible = true) => {
    it(`${isVisible ? 'displays' : 'does not display'} the version`, () => {
      const version = queryByTestId('org-nav-on-prem-version');

      if (isVisible) {
        expect(version).toBeVisible();
      } else {
        expect(version).toBeNull();
      }
    });
  };

  const testForPaymentStatus = (isVisible = true) => {
    it(`${
      isVisible ? 'displays' : 'does not display'
    } the payment status badge`, () => {
      const badge = queryByTestId('org-nav-payment-status');

      if (isVisible) {
        expect(badge).toBeVisible();
        expect(badge!.textContent).toEqual(currentOrganization!.paymentStatus);
      } else {
        expect(badge).toBeNull();
      }
    });
  };

  const testForUserMenu = (isVisible = true) => {
    it(`${isVisible ? 'displays' : 'does not display'} the UserMenu and ${
      isVisible ? 'does not display' : 'displays'
    } the onPrem User Menu`, () => {
      const userMenu = queryByTestId('user-menu-trigger');
      const onPremUserMenu = queryByTestId('om-user-menu-trigger');

      if (isVisible) {
        expect(userMenu).toBeVisible();
        expect(onPremUserMenu).toBeNull();
      } else {
        expect(onPremUserMenu).toBeVisible();
        expect(userMenu).toBeNull();
      }
    });
  };

  const testForMFA = (isVisible = true) => {
    it(`${isVisible ? 'displays' : 'does not display'} the MFA option`, () => {
      const onPremUserMenu = getByTestId('om-user-menu-trigger');
      fireEvent.click(onPremUserMenu);

      const onPremUserMenuMFA = queryByTestId('om-user-menuitem-mfa');

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
      const navLink =
        queryByText(linkNamesToText[linkName])?.closest('a, button') ?? null;

      if (isVisible) {
        expect(navLink).toBeVisible();

        expect((navLink as HTMLAnchorElement).href).toEqual(
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
    testForUserMenu(true);

    Object.keys(linkNamesToUrls).forEach(linkName =>
      testForNavLink(linkName, linkName !== 'admin'),
    );

    test('it does not render the FedRAMP banner', () => {
      expect(queryByTestId('org-nav-fedramp-banner')).toBeNull();
    });
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
      fireEvent.click(getByTestId('org-nav-access-manager-dropdown')!);

      const accessManagerProject = getByTestId(
        'org-nav-dropdown-project-access-manager',
      );
      expect(accessManagerProject).toHaveAttribute('aria-disabled', 'true');
      expect(accessManagerProject).toContainHTML('None');
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
      testForNavLink(linkName, !['billing', 'admin'].includes(linkName)),
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
    describe('when onPrem is true', () => {
      test('and currentProject exists, the Project Access Manager link is not disabled and project name is displayed', () => {
        renderComponent({
          onPremEnabled: true,
          showProjectNav: false,
          currentProjectName: 'Test Project',
          currentProjectId: 'test-project-id',
        });
        fireEvent.click(getByTestId('org-nav-access-manager-dropdown'));

        const accessManagerProject = getByTestId(
          'org-nav-dropdown-project-access-manager',
        );
        expect(accessManagerProject.innerHTML.includes('Test Project')).toBe(
          true,
        );
        expect(accessManagerProject.getAttribute('aria-disabled')).toBe(
          'false',
        );
      });

      test('and currentProject does not exist, the Project Access Manager link is disabled and the project name appears as "None"', () => {
        renderComponent({
          onPremEnabled: true,
          showProjectNav: false,
        });
        fireEvent.click(getByTestId('org-nav-access-manager-dropdown'));

        const accessManagerProject = getByTestId(
          'org-nav-dropdown-project-access-manager',
        );
        expect(accessManagerProject.innerHTML.includes('None')).toBe(true);
        expect(accessManagerProject.getAttribute('aria-disabled')).toBe('true');
      });
    });

    describe('when onPrem is false', () => {
      test('and showProjectNav is true, the Project Access Manager link is not disabled and project name is displayed', () => {
        renderComponent({
          showProjectNav: true,
          currentProjectName: 'Test Project',
          currentProjectId: 'test-project-id',
        });
        fireEvent.click(getByTestId('org-nav-access-manager-dropdown'));

        const accessManagerProject = getByTestId(
          'org-nav-dropdown-project-access-manager',
        );
        expect(accessManagerProject.innerHTML.includes('Test Project')).toBe(
          true,
        );
        expect(accessManagerProject.getAttribute('aria-disabled')).toBe(
          'false',
        );
      });

      test('and showProjectNav is false, the Project Access Manager link is disabled and the project name appears as "None"', () => {
        renderComponent({
          showProjectNav: false,
        });
        fireEvent.click(getByTestId('org-nav-access-manager-dropdown'));

        const accessManagerProject = getByTestId(
          'org-nav-dropdown-project-access-manager',
        );
        expect(accessManagerProject.innerHTML.includes('None')).toBe(true);
        expect(accessManagerProject.getAttribute('aria-disabled')).toBe('true');
      });
    });
  });

  describe('when environment is "government"', () => {
    test('it renders a FedRAMP banner in the org nav', () => {
      renderComponent({ environment: 'government' });
      expect(getByTestId('org-nav-fedramp-banner')).toBeVisible();
    });
  });
});
