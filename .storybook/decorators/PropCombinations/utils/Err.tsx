import React from 'react';
import Card from '@leafygreen-ui/card';
import { Error } from '@leafygreen-ui/typography';

/**
 * Renders an error message, and logs an error
 */
export function Err(msg: string): JSX.Element {
  console.error(msg);
  return (
    <Card>
      <Error>{msg}</Error>;
    </Card>
  );
}
