import React from 'react';
import { css } from 'emotion';
import { uiColors } from '@leafygreen-ui/palette';
import MDBDesignLogo from '../logos/MDBDesignLogo';
import { GridContainer, GridItem } from '../grid';
import { borderColor, leftRightPadding, ulStyleOverrides } from './styles';

const navStyle = css`
  border-right: 1px solid ${borderColor};
  min-height: 100vh;
`;

const logoContainer = css`
  ${leftRightPadding}
  height: 124px;
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const navItemStyle = css`
  font-size: 20px;
  line-height: 24px;
  color: ${uiColors.gray.dark3};
  margin: 0;
`;

const h4Style = css`
  ${navItemStyle}
  ${leftRightPadding}
  display: flex;
  align-items: center;
  height: 68px;
  border-top: 1px solid ${borderColor};
  margin: 0;
`;

function MobileNavigation({ children }: { children: React.ReactNode }) {
  return (
    <GridContainer justify="flex-start">
      <GridItem sm={10}>
        <nav className={navStyle}>
          <div className={logoContainer}>
            <MDBDesignLogo />
          </div>
          <ol className={ulStyleOverrides}>
            <li>
              <h4 className={h4Style}>Home</h4>
            </li>
            {children}
          </ol>
        </nav>
      </GridItem>
    </GridContainer>
  );
}

MobileNavigation.displayName = 'MobileNavigation';

export default MobileNavigation;
