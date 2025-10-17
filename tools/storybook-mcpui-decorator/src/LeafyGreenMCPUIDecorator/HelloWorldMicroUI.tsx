import React from 'react';

import { H1 } from '@leafygreen-ui/typography';

export interface HelloWorldMicroUIProps {
  name?: string;
}
export const HelloWorldMicroUI = ({ name }: HelloWorldMicroUIProps) => {
  return <H1>Hello {name || 'World'}</H1>;
};
