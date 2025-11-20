// 'use client';

import React from 'react';

import { palette } from '@leafygreen-ui/palette';
import {
  borderRadius,
  fontFamilies,
  fontWeights,
  spacing,
  typeScales,
} from '@leafygreen-ui/tokens';

import { ListDatabasesProps } from './ListDatabases.types';

const H3 = ({ children }: { children: React.ReactNode }) => {
  return (
    <h3
      style={{
        padding: 0,
        margin: 0,
        fontSize: typeScales.large.fontSize,
        fontWeight: fontWeights.semiBold,
      }}
    >
      {children}
    </h3>
  );
};

const Body = ({ children }: { children: React.ReactNode }) => {
  return (
    <p
      style={{
        fontSize: typeScales.body1.fontSize,
        fontWeight: fontWeights.regular,
      }}
    >
      {children}
    </p>
  );
};

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        fontFamily: fontFamilies.default,
        fontSize: typeScales.body1.fontSize,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        borderRadius: borderRadius[600],
        backgroundColor: palette.gray.light3,
        padding: spacing[400],
        color: palette.black,
      }}
    >
      {children}
    </div>
  );
};

export default function ListDatabases({ databases }: ListDatabasesProps) {
  if (databases.length === 0) {
    return (
      <Card>
        <H3>No databases found</H3>
      </Card>
    );
  }

  return (
    <Card>
      <H3>Databases</H3>
      <ul style={{ padding: 0, margin: 0 }}>
        {databases.map(database => (
          <li key={database}>
            <Body>{database}</Body>
          </li>
        ))}
      </ul>
    </Card>
  );
}
