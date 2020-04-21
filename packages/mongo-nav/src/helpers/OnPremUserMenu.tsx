import React from 'react';
import { Menu, MenuItem } from '@leafygreen-ui/menu';
import { css } from '@leafygreen-ui/emotion';
import { URLSInterface, NavElement, ActiveNavElement } from '../types';
import { UserMenuTrigger } from '../user-menu';
import { useOnElementClick } from '../on-element-click-provider';

const onPremMenuWrapper = css`
  display: inline-block;
  position: relative;
  z-index: 0;
`;

interface OnPremUserMenuProps {
  /**
   * The current user's first and last name, or username if unavailable.
   */
  name: string;

  /**
   * Whether or not the OnPremUserMenu is expanded.
   */
  open: boolean;

  /**
   * A function to update the open state of the OnPremUserMenu.
   */
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Object that supplies URL overrides to UserMenu component.
   * Shape: { userMenu:{ cloud: { userPreferences, organizations, invitations, mfa }, university: { universityPreferences }, support: { userPreferences }, account: { homepage } }}
   */
  urls: Required<URLSInterface>;

  /**
   * Whether or not multifactor authentication is permitted in the current enivronment.
   */
  mfa: boolean;

  /**
   * Determines what nav item is currently active.
   */
  activeNav?: NavElement;
}

/**
 * # OnPremUserMenu
 *
 * OnPremUserMenu component
 *
 * ```
<OnPremUserMenu
  name="Pauline Oliveros"
  open={true}
  setOpen={updateDropdownFn}
  urls={urls}
  mfa={false}
  activeNav={UserMenuOnPremProfile}
/>
```
 * @param props.name The current user's first and last name, or username if unavailable.
 * @param props.open Whether or not the OnPremUserMenu is expanded.
 * @param props.setOpen A function to update the open state of the OnPremUserMenu.
 * @param props.urls Object that supplies URL overrides to UserMenu component.
 * @param props.mfa Whether or not multifactor authentication is permitted in the current enivronment.
 * @param props.activeNav Determines what nav item is currently active.
 */
export default function OnPremUserMenu({
  name,
  open,
  setOpen,
  urls,
  mfa,
  activeNav,
}: OnPremUserMenuProps) {
  const onElementClick = useOnElementClick();

  return (
    <div className={onPremMenuWrapper}>
      <UserMenuTrigger
        name={name}
        open={open}
        setOpen={setOpen}
        data-testid="om-user-menu-trigger"
      />

      <Menu open={open} setOpen={setOpen} usePortal={false}>
        <MenuItem
          href={urls.onPrem.profile}
          active={activeNav === ActiveNavElement.UserMenuOnPremProfile}
          data-testid="om-user-menuitem-profile"
          onClick={() => setOpen(false)}
        >
          Profile
        </MenuItem>

        {mfa && (
          <MenuItem
            href={urls.onPrem.mfa}
            active={activeNav === ActiveNavElement.UserMenuOnPremTwoFactorAuth}
            data-testid="om-user-menuitem-mfa"
            onClick={() => setOpen(false)}
          >
            Two-factor Authentication
          </MenuItem>
        )}

        <MenuItem
          href={urls.onPrem.personalization}
          active={activeNav === ActiveNavElement.UserMenuOnPremPersonalization}
          data-testid="om-user-menuitem-personalization"
          onClick={() => setOpen(false)}
        >
          Personalization
        </MenuItem>

        <MenuItem
          href={urls.onPrem.invitations}
          active={activeNav === ActiveNavElement.UserMenuOnPremInvitations}
          data-testid="om-user-menuitem-invitations"
          onClick={() => setOpen(false)}
        >
          Invitations
        </MenuItem>

        <MenuItem
          href={urls.onPrem.organizations}
          active={activeNav === ActiveNavElement.UserMenuOnPremOrganizations}
          data-testid="om-user-menuitem-organizations"
          onClick={() => setOpen(false)}
        >
          Organizations
        </MenuItem>

        <MenuItem
          href={urls.onPrem.publicApiAccess}
          active={activeNav === ActiveNavElement.UserMenuOnPremPublicApiAccess}
          data-testid="om-user-menuitem-public-api-access"
          onClick={() => setOpen(false)}
        >
          Public API Access
        </MenuItem>

        <MenuItem
          href={urls.onPrem.featureRequest}
          data-testid="om-user-menuitem-feature-request"
          onClick={() => setOpen(false)}
        >
          Feature Request
        </MenuItem>

        <MenuItem
          onClick={onElementClick(NavElement.Logout, () => setOpen(false))}
          data-testid="om-user-menuitem-sign-out"
        >
          Log out
        </MenuItem>
      </Menu>
    </div>
  );
}
