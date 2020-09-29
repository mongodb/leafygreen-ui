import React from 'react';
import { css, cx } from 'emotion';
import { uiColors } from '@leafygreen-ui/palette';
import MDBDesignLogo from '../logos/MDBDesignLogo';
import { GridContainer, GridItem } from '../grid/Grid';
import { borderColor, leftRightPadding } from './styles';

const logoContainer = css`
  ${leftRightPadding}
  height: 124px;
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const ulStyleOverrides = css`
  margin-block-start: 0px;
  margin-block-end: 0px;
  padding-inline-start: 0px;
  padding: 0;
  list-style-type: none;
`;

const navItemStyle = css`
  font-size: 20px;
  line-height: 24px;
  color: ${uiColors.gray.dark3};
  margin: 0;
`;

function MobileNavigation({ children }) {
  return (
    <GridContainer justify="flex-start">
      <GridItem sm={10}>
        <nav
          className={css`
            height: 100vh;
            border-right: 1px solid ${borderColor};
          `}
        >
          <div className={logoContainer}>
            <MDBDesignLogo />
          </div>
          <ol className={ulStyleOverrides}>
            <li>
              <h4
                className={cx(
                  navItemStyle,
                  css`
                    ${leftRightPadding}
                    display: flex;
                    align-items: center;
                    height: 68px;
                    border-top: 1px solid ${borderColor};
                    margin: 0;
                  `,
                )}
              >
                Home
              </h4>
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
