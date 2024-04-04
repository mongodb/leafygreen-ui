import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';

import Overline from './Overline';
import { OverlineProps } from './Overline.types';

export const LiveExample = ({ children, ...rest }: OverlineProps) => {
  return <Overline {...rest}>{children}</Overline>;
};

const meta: StoryMetaType<typeof Overline> = {
  title: 'Components/Typography/Overline',
  component: Overline,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
      },
    },
    decorator: (Instance, context) => {
      return (
        <LeafygreenProvider darkMode={context?.args.darkMode}>
          <Instance />
        </LeafygreenProvider>
      );
    },
  },
  args: {
    children: 'Lorem ipsum dolor sit amet',
  },
};
export default meta;

export const Generated = () => <></>;
