import React from 'react';
import { css } from 'emotion';
import { GridContainer, GridItem } from '../grid/Grid';
import Navigation from '../navigation/Navigation';
import Header from './Header';

interface Layout {
  component: string;
}

export default function Layout({ component, changelog, readme }) {
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
          <div
            className={css`
              // border: 3px solid gold;
              height: 600px;
              margin-top: 36px;
            `}
          >
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
