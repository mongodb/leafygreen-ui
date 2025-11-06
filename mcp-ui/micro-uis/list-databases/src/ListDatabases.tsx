'use client';

import React from 'react';

import { Card } from '@leafygreen-ui/card';
import { Body, H3 } from '@leafygreen-ui/typography';

import { ListDatabasesProps } from './ListDatabases.types';

export default function ListDatabases({ databases }: ListDatabasesProps) {
  if (databases.length === 0) {
    return (
      <Card>
        <Body>No databases found</Body>
      </Card>
    );
  }

  return (
    <Card>
      <H3>Databases</H3>
      <ul>
        {databases.map(database => (
          <li key={database}>
            <Body>{database}</Body>
          </li>
        ))}
      </ul>
    </Card>
  );
}
