import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@leafygreen-ui/tooltip';
import Badge, { Variant } from '@leafygreen-ui/badge';
import CaretUpIcon from '@leafygreen-ui/icon/dist/CaretUp';
import CaretDownIcon from '@leafygreen-ui/icon/dist/CaretDown';
import UserMenu from '../user-menu';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { LogoMark } from '@leafygreen-ui/logo';
import { useViewportSize } from '@leafygreen-ui/hooks';
import { Menu, MenuItem } from '@leafygreen-ui/menu';
import { OrgNavLink, OnPremUserMenu } from '../helpers';
import { breakpoints, mq } from '../breakpoints';
import { OrgSelect } from '../mongo-select';
import { useOnElementClick } from '../on-element-click-provider';
import {
  URLS,
  AccountInterface,
  OrganizationInterface,
  NavElement,
  CurrentOrganizationInterface,
  OrgPaymentLabel,
  ActiveNavElement,
  MongoNavInterface,
  Environment,
} from '../types';
import { FullWidthGovBanner, MobileGovTooltip } from './GovBanner';
import { VersionNumber, Style as VersionNumberStyle } from './VersionNumber';
import OpenNewTabIcon from '@leafygreen-ui/icon/dist/OpenNewTab';

export const orgNavHeight = 60;

const navContainer = css`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: ${orgNavHeight}px;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 13px;
  line-height: 15px;
  background-color: white;
  border-bottom: 1px solid ${uiColors.gray.light2};
  color: ${uiColors.gray.dark3};
`;

const rightLinkMargin = css`
  ${mq({
    marginRight: ['16px', '16px', '24px'],
  })}
`;

const paymentStatusMap: {
  [K in Partial<Variant>]?: ReadonlyArray<OrgPaymentLabel>;
} = {
  [Variant.LightGray]: [
    OrgPaymentLabel.Embargoed,
    OrgPaymentLabel.EmbargoConfirmed,
  ],
  [Variant.Green]: [OrgPaymentLabel.Ok],
  [Variant.Yellow]: [
    OrgPaymentLabel.Warning,
    OrgPaymentLabel.Suspended,
    OrgPaymentLabel.Closing,
  ],
  [Variant.Red]: [
    OrgPaymentLabel.Dead,
    OrgPaymentLabel.AdminSuspended,
    OrgPaymentLabel.Locked,
    OrgPaymentLabel.Closed,
  ],
} as const;

const userMenuActiveNavItems = [
  ActiveNavElement.UserMenuCloudInvitations,
  ActiveNavElement.UserMenuCloudMFA,
  ActiveNavElement.UserMenuCloudOrganizations,
  ActiveNavElement.UserMenuCloudUserPreferences,
  ActiveNavElement.UserMenuCloudOther,
  ActiveNavElement.UserMenuOnPremInvitations,
  ActiveNavElement.UserMenuOnPremOrganizations,
  ActiveNavElement.UserMenuOnPremPersonalization,
  ActiveNavElement.UserMenuOnPremProfile,
  ActiveNavElement.UserMenuOnPremPublicApiAccess,
  ActiveNavElement.UserMenuOnPremTwoFactorAuth,
  ActiveNavElement.UserMenuOnPremOther,
  ActiveNavElement.OrgNavAllClusters,
];

function DropdownMenuIcon({ open }: { open: boolean }) {
  const Icon = open ? CaretUpIcon : CaretDownIcon;
  return (
    <Icon
      role="presentation"
      className={cx(
        css`
          margin-left: 8px;
        `,
        {
          [css`
            color: ${uiColors.gray.dark1};
          `]: !open,
        },
      )}
    />
  );
}

// Update to be mobile responsive
function GetHelpDropdownMenu({
  loading,
  urls,
  activeNav,
}: {
  loading: boolean;
  urls: URLS['orgNav'];
  activeNav?: ActiveNavElement;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const onElementClick = useOnElementClick();

  return (
    <OrgNavLink
      isButton
      isActive={activeNav === NavElement.OrgNavSupport}
      loading={loading}
      className={rightLinkMargin}
      onClick={onElementClick(NavElement.OrgNavDropdownGetHelp, () =>
        setIsOpen(open => !open),
      )}
    >
      Get Help
      <DropdownMenuIcon open={isOpen} />
      <Menu
        open={isOpen}
        setOpen={setIsOpen}
        usePortal={false}
        className={css`
          width: 128px;
        `}
      >
        <MenuItem
          href={urls.support}
          data-testid="org-nav-support-link"
          active={activeNav === NavElement.OrgNavSupport}
        >
          <div>Support</div>
        </MenuItem>
        <MenuItem href={urls.docs} data-testid="org-nav-docs-link">
          <div>
            Docs <OpenNewTabIcon role="presentation" />
          </div>
        </MenuItem>
      </Menu>
    </OrgNavLink>
  );
}

function NavLinks({
  loading,
  showMoreDropdownMenu,
  admin,
  onPremVersion,
  urls,
  activeNav,
}: {
  loading: boolean;
  showMoreDropdownMenu: boolean;
  admin: boolean;
  onPremVersion?: string;
  urls: URLS['orgNav'];
  activeNav?: ActiveNavElement;
}) {
  const onElementClick = useOnElementClick();

  const navLinks: Array<{
    href?: string;
    navId: NavElement;
    text: string;
    testid: string;
  }> = [];

  navLinks.push({
    href: urls.allClusters,
    navId: ActiveNavElement.OrgNavAllClusters,
    text: 'All Clusters',
    testid: 'org-nav-all-clusters-link',
  });

  if (admin) {
    navLinks.push({
      href: urls.admin,
      navId: ActiveNavElement.OrgNavAdmin,
      text: 'Admin',
      testid: 'org-nav-admin-link',
    });
  }

  const items = navLinks.map(({ href, navId, text, testid }) => (
    <OrgNavLink
      href={href}
      loading={loading}
      isActive={activeNav === navId}
      className={rightLinkMargin}
      key={navId}
      onClick={onElementClick(navId)}
      data-testid={testid}
    >
      {text}
    </OrgNavLink>
  ));

  if (onPremVersion) {
    if (showMoreDropdownMenu) {
      items.push(
        <VersionNumber style={VersionNumberStyle.Menu}>
          {onPremVersion}
        </VersionNumber>,
      );
    } else {
      items.unshift(
        <VersionNumber style={VersionNumberStyle.Nav}>
          {onPremVersion}
        </VersionNumber>,
      );
    }
  }

  return (
    <div
      className={css`
        margin-left: auto;
      `}
    >
      {items}
    </div>
  );
}

type OrgNavProps = Pick<
  MongoNavInterface,
  | 'onOrganizationChange'
  | 'activeNav'
  | 'admin'
  | 'mode'
  | 'activePlatform'
  | 'environment'
> & {
  account?: AccountInterface;
  current?: CurrentOrganizationInterface;
  data?: Array<OrganizationInterface>;
  currentProjectName?: string;
  currentProjectId?: string;
  onPremEnabled?: boolean;
  onPremVersion?: string;
  onPremMFA?: boolean;
  constructOrganizationURL: NonNullable<
    MongoNavInterface['constructOrganizationURL']
  >;
  urls: URLS;
  hosts: Required<NonNullable<MongoNavInterface['hosts']>>;
  showProjectNav: NonNullable<MongoNavInterface['showProjectNav']>;
};

function OrgNav({
  account,
  activeNav,
  current,
  data,
  mode,
  constructOrganizationURL,
  onOrganizationChange,
  urls,
  admin,
  hosts,
  currentProjectName = 'None',
  activePlatform,
  currentProjectId,
  onPremEnabled,
  onPremVersion,
  onPremMFA = false,
  showProjectNav,
  environment,
}: OrgNavProps) {
  const [accessManagerOpen, setAccessManagerOpen] = useState(false);
  const [onPremMenuOpen, setOnPremMenuOpen] = useState(false);
  const onElementClick = useOnElementClick();
  const viewportSize = useViewportSize();

  const isGovernment = environment === Environment.Government;
  const isTablet = viewportSize
    ? viewportSize.width < breakpoints.medium
    : false;
  const isMobile = viewportSize
    ? viewportSize.width < breakpoints.small
    : false;

  const disabled = (userMenuActiveNavItems as Array<string>).includes(
    activeNav as string,
  );

  let paymentVariant: Variant | undefined;
  let key: Variant;

  for (key in paymentStatusMap) {
    const paymentStatus = current?.paymentStatus;

    if (paymentStatus && paymentStatusMap[key]?.includes(paymentStatus)) {
      paymentVariant = key;
    }
  }

  const paymentValues: Array<OrgPaymentLabel> = [
    OrgPaymentLabel.Suspended,
    OrgPaymentLabel.Locked,
    OrgPaymentLabel.AdminSuspended,
  ];

  const displayProjectAccess = onPremEnabled
    ? !!currentProjectId
    : showProjectNav;

  function renderBadgeItem() {
    if (
      disabled ||
      current?.paymentStatus == null ||
      isTablet ||
      onPremEnabled ||
      !paymentVariant ||
      (!admin && !paymentValues.includes(current.paymentStatus))
    ) {
      return null;
    }

    return (
      <Badge
        variant={paymentVariant}
        data-testid="org-nav-payment-status"
        className={css`
          margin-right: 25px;
        `}
      >
        {current.paymentStatus.split('_').join()}
      </Badge>
    );
  }

  function renderUserMenu() {
    if (onPremEnabled) {
      return (
        <OnPremUserMenu
          name={account?.firstName ?? ''}
          open={onPremMenuOpen}
          setOpen={setOnPremMenuOpen}
          urls={urls}
          mfa={onPremMFA}
          activeNav={activeNav}
        />
      );
    }

    return (
      <UserMenu
        account={account}
        activePlatform={activePlatform}
        urls={urls}
        hosts={hosts}
        activeNav={activeNav}
        environment={environment}
      />
    );
  }

  const { orgNav } = urls;

  return (
    <>
      {!isMobile && isGovernment && <FullWidthGovBanner isTablet={isTablet} />}
      <nav
        className={navContainer}
        aria-label="organization navigation"
        data-testid="organization-nav"
      >
        <Tooltip
          aria-hidden
          align="bottom"
          justify="start"
          darkMode={true}
          className={css`
            width: 150px;
          `}
          usePortal={false}
          trigger={
            <a
              href={orgNav.leaf}
              onClick={onElementClick(NavElement.OrgNavLeaf)}
              data-testid="org-nav-leaf"
            >
              <LogoMark height={30} aria-label="Go to the Organization Home" />
            </a>
          }
        >
          View the Organization Home
        </Tooltip>

        {isMobile && isGovernment && <MobileGovTooltip />}

        <OrgSelect
          data={data}
          current={current}
          mode={mode}
          constructOrganizationURL={constructOrganizationURL}
          hosts={hosts}
          urls={urls.mongoSelect}
          onChange={onOrganizationChange}
          isActive={activeNav === ActiveNavElement.OrgNavOrgSettings}
          loading={!current}
          disabled={disabled}
          admin={admin}
          isOnPrem={onPremEnabled}
        />

        {renderBadgeItem()}

        {!disabled && !isMobile && (
          <>
            <OrgNavLink
              isActive={
                activeNav === ActiveNavElement.OrgNavAccessManagerDropdown
              }
              loading={!current}
              data-testid="org-nav-access-manager-dropdown"
              onClick={onElementClick(
                NavElement.OrgNavAccessManagerDropdown,
                () => setAccessManagerOpen(curr => !curr),
              )}
              isButton={true}
              aria-expanded={accessManagerOpen}
            >
              Access Manager
              <DropdownMenuIcon open={accessManagerOpen} />
              {current && (
                <Menu
                  open={accessManagerOpen}
                  setOpen={setAccessManagerOpen}
                  usePortal={false}
                >
                  <MenuItem
                    as={orgNav.accessManager ? 'a' : 'button'}
                    href={orgNav.accessManager}
                    data-testid="org-nav-dropdown-org-access-manager"
                    description={current.orgName}
                    size="large"
                    active={
                      activeNav === ActiveNavElement.OrgNavAccessManagerDropdown
                    }
                    onClick={onElementClick(
                      NavElement.OrgNavDropdownOrgAccessManager,
                      () => setAccessManagerOpen(false),
                    )}
                  >
                    Organization Access
                  </MenuItem>

                  <MenuItem
                    as={
                      currentProjectName && urls.projectNav.accessManager
                        ? 'a'
                        : 'button'
                    }
                    href={currentProjectName && urls.projectNav.accessManager}
                    data-testid="org-nav-dropdown-project-access-manager"
                    size="large"
                    active={
                      activeNav ===
                      ActiveNavElement.OrgNavDropdownProjectAccessManager
                    }
                    disabled={!displayProjectAccess}
                    description={
                      displayProjectAccess ? currentProjectName : 'None'
                    }
                    onClick={onElementClick(
                      NavElement.OrgNavDropdownProjectAccessManager,
                      () => setAccessManagerOpen(false),
                    )}
                  >
                    Project Access
                  </MenuItem>
                </Menu>
              )}
            </OrgNavLink>

            {!onPremEnabled && (
              <OrgNavLink
                href={current && orgNav.billing}
                isActive={activeNav === ActiveNavElement.OrgNavBilling}
                loading={!current}
                data-testid="org-nav-billing"
                onClick={onElementClick(NavElement.OrgNavBilling)}
              >
                Billing
              </OrgNavLink>
            )}
          </>
        )}

        <NavLinks
          loading={!current}
          showMoreDropdownMenu={isMobile || isTablet}
          admin={!!admin}
          onPremVersion={onPremEnabled ? onPremVersion : undefined}
          urls={urls.orgNav}
          activeNav={activeNav}
        />

        <GetHelpDropdownMenu
          loading={!current}
          urls={urls.orgNav}
          activeNav={activeNav}
        />

        {renderUserMenu()}
      </nav>
    </>
  );
}

OrgNav.displayName = 'OrgNav';

OrgNav.propTypes = {
  current: PropTypes.shape({
    paymentStatus: PropTypes.string,
  }),
};

export default OrgNav;
