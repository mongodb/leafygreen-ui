import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';

import H3 from './H3';
import { H3Props } from './H3.types';

type LGProviderBaseFontSize = 14 | 16;

export const LiveExample = ({
  baseFontSize,
  darkMode,
  children,
  ...rest
}: H3Props & {
  baseFontSize: LGProviderBaseFontSize;
}) => {
  return (
    <LeafygreenProvider baseFontSize={baseFontSize} darkMode={darkMode}>
      <H3 {...rest}>{children}</H3>
    </LeafygreenProvider>
  );
};

const meta: StoryMetaType<typeof H3> = {
  title: 'Components/Typography/H3',
  component: H3,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        baseFontSize: [13, 16],
      },
    },
  },
  args: {
    children: 'Lorem ipsum dolor sit amet',
  },
};
export default meta;

export const Generated = () => <></>;
