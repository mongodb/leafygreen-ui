import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';

import Label from './Label';
import { LabelProps } from './Label.types';

type LGProviderBaseFontSize = 14 | 16;

export const LiveExample = ({
  baseFontSize,
  darkMode,
  children,
  ...rest
}: LabelProps & {
  baseFontSize: LGProviderBaseFontSize;
}) => {
  return (
    <LeafygreenProvider baseFontSize={baseFontSize} darkMode={darkMode}>
      <Label {...rest}>{children}</Label>
    </LeafygreenProvider>
  );
};

const meta: StoryMetaType<typeof Label> = {
  title: 'Components/Typography/Label',
  component: Label,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        baseFontSize: [13, 16],
        disabled: [false, true],
      },
    },
  },
  args: {
    children: 'Lorem ipsum dolor sit amet',
  },
};
export default meta;

export const Generated = () => <></>;
