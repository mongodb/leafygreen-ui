import React from 'react';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Tooltip from '@leafygreen-ui/tooltip';
import { enforceExhaustive } from '@leafygreen-ui/lib';

export const Style = {
  Nav: 'nav',
  Menu: 'menu',
} as const;

export type Style = typeof Style[keyof typeof Style];

const versionNavStyle = css`
  position: relative;
  display: inline-block;
  font-size: 10px;
  color: ${uiColors.green.base};
  margin-right: 16px;
`;

const versionMenuStyle = css`
  display: flex;
  align-items: center;
  padding: 0 15px;
  height: 56px;
  color: ${uiColors.green.dark2};
  font-size: 14px;
  background-color: ${uiColors.gray.light3};
`;

export function VersionNumber({
  style,
  children: version,
}: {
  style: Style;
  children: string;
}) {
  switch (style) {
    case Style.Nav:
      return (
        <Tooltip
          usePortal={true}
          darkMode={true}
          align="bottom"
          justify="middle"
          className={css`
            width: 165px;
          `}
          trigger={
            <span
              className={versionNavStyle}
              data-testid="org-nav-on-prem-version"
            >
              {version}
            </span>
          }
          key="ops manager version"
        >
          Ops Manager Version
        </Tooltip>
      );
    case Style.Menu:
      return <div className={versionMenuStyle}>{version}</div>;
    default:
      enforceExhaustive(style);
  }
}

VersionNumber.displayName = 'VersionNumber';
