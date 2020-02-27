import React from 'react';
import { Menu, MenuItem } from '@leafygreen-ui/menu';
import { css } from '@leafygreen-ui/emotion';
import { URLSInterface } from '../types';
import { UserMenuTrigger } from '../user-menu/index';

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
  onLogout: React.MouseEventHandler;
  mfa: boolean;
}

export default function OnPremUserMenu({
  name,
  open,
  setOpen,
  urls,
  onLogout,
  mfa,
}: OnPremUserMenuProps) {
  return (
    <div className={onPremMenuWrapper}>
      <UserMenuTrigger
        name={name}
        open={open}
        setOpen={setOpen}
        data-testid="om-user-menu-trigger"
      />

      <Menu open={open} setOpen={setOpen}>
        <MenuItem
          href={urls.onPrem.profile}
          data-testid="om-user-menuitem-profile"
        >
          Profile
        </MenuItem>

        {mfa && (
          <MenuItem href={urls.onPrem.mfa} data-testid="om-user-menuitem-mfa">
            Two-factor Authentication
          </MenuItem>
        )}

        <MenuItem
          href={urls.onPrem.personalization}
          data-testid="om-user-menuitem-personalization"
        >
          Personalization
        </MenuItem>

        <MenuItem
          href={urls.onPrem.invitations}
          data-testid="om-user-menuitem-invitations"
        >
          Invitations
        </MenuItem>

        <MenuItem
          href={urls.onPrem.organizations}
          data-testid="om-user-menuitem-organizations"
        >
          Organizations
        </MenuItem>

        <MenuItem
          href={urls.onPrem.featureRequest}
          data-testid="om-user-menuitem-feature-request"
        >
          Feature Request
        </MenuItem>

        <MenuItem onClick={onLogout} data-testid="om-user-menuitem-sign-out">
          Sign Out
        </MenuItem>
      </Menu>
    </div>
  );
}
