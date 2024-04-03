import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';

import Error from './Error';
import { ErrorProps } from './Error.types';

export const LiveExample = ({ children, ...rest }: ErrorProps) => {
  return <Error {...rest}>{children}</Error>;
};

const meta: StoryMetaType<typeof Error> = {
  title: 'Components/Typography/Error',
  component: Error,
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
