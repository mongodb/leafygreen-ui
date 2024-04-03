import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';

import Body from './Body';
import { BodyProps } from './Body.types';

type LGProviderBaseFontSize = 14 | 16;

export const LiveExample = ({
  baseFontSize,
  darkMode,
  children,
  ...rest
}: BodyProps & {
  baseFontSize: LGProviderBaseFontSize;
}) => {
  return (
    <LeafygreenProvider baseFontSize={baseFontSize} darkMode={darkMode}>
      <Body {...rest}>{children}</Body>
    </LeafygreenProvider>
  );
};

const meta: StoryMetaType<typeof Body> = {
  title: 'Components/Typography/Body',
  component: Body,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        baseFontSize: [13, 16],
        weight: ['regular', 'medium'],
      },
    },
  },
  args: {
    children: 'Lorem ipsum dolor sit amet',
  },
};
export default meta;

export const Generated = () => <></>;
