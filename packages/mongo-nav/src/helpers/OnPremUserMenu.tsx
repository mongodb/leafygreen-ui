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
  name: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  urls: Required<URLSInterface>;
  mfa: boolean;
  activeNav?: NavElement;
}

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
        >
          Profile
        </MenuItem>

        {mfa && (
          <MenuItem
            href={urls.onPrem.mfa}
            active={activeNav === ActiveNavElement.UserMenuOnPremTwoFactorAuth}
            data-testid="om-user-menuitem-mfa"
          >
            Two-factor Authentication
          </MenuItem>
        )}

        <MenuItem
          href={urls.onPrem.personalization}
          active={activeNav === ActiveNavElement.UserMenuOnPremPersonalization}
          data-testid="om-user-menuitem-personalization"
        >
          Personalization
        </MenuItem>

        <MenuItem
          href={urls.onPrem.invitations}
          active={activeNav === ActiveNavElement.UserMenuOnPremInvitations}
          data-testid="om-user-menuitem-invitations"
        >
          Invitations
        </MenuItem>

        <MenuItem
          href={urls.onPrem.organizations}
          active={activeNav === ActiveNavElement.UserMenuOnPremOrganizations}
          data-testid="om-user-menuitem-organizations"
        >
          Organizations
        </MenuItem>

        <MenuItem
          href={urls.onPrem.featureRequest}
          active={activeNav === ActiveNavElement.UserMenuOnPremFeatureRequest}
          data-testid="om-user-menuitem-feature-request"
        >
          Feature Request
        </MenuItem>

        <MenuItem
          onClick={onElementClick(NavElement.Logout)}
          data-testid="om-user-menuitem-sign-out"
        >
          Sign Out
        </MenuItem>
      </Menu>
    </div>
  );
}
