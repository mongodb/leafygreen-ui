import React from 'react';
import { css } from 'emotion';
import { GridContainer, GridItem } from '../grid/Grid';
import Navigation from '../navigation/Navigation';
import Header from './Header';
import { BaseLayoutProps } from '../../utils/';

const topMargin = css`
  margin-top: 36px;
`;

export default function Layout({
  component,
  changelog,
  readme,
}: BaseLayoutProps) {
  return (
    <div
      className={css`
        margin-top: 12px;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
      `}
    >
      <Navigation />

      <GridContainer justify="flex-start">
        <GridItem md={6} lg={8}>
          <div className={topMargin}>
            <Header
              component={component}
              changelog={changelog}
              readme={readme}
            />
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
}
