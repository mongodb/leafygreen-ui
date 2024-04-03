import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';

import Disclaimer from './Disclaimer';
import { DisclaimerProps } from './Disclaimer.types';

export const LiveExample = ({ children, ...rest }: DisclaimerProps) => {
  return <Disclaimer {...rest}>{children}</Disclaimer>;
};

const meta: StoryMetaType<typeof Disclaimer> = {
  title: 'Components/Typography/Disclaimer',
  component: Disclaimer,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        baseFontSize: [13, 16],
      },
      decorator: (Instance, context) => {
        return (
          <LeafygreenProvider
            darkMode={context?.args.darkMode}
            baseFontSize={context?.args.baseFontSize}
          >
            <Instance />
          </LeafygreenProvider>
        );
      },
    },
  },
  args: {
    children: 'Lorem ipsum dolor sit amet',
  },
};
export default meta;

export const Generated = () => <></>;
