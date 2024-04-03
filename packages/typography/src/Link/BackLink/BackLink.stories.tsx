import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';

import BackLink from './BackLink';
import { BackLinkProps } from './BackLink.types';

export const LiveExample = ({ children, ...rest }: BackLinkProps) => {
  // @ts-ignore
  return <BackLink {...rest}>{children}</BackLink>;
};

const meta: StoryMetaType<typeof BackLink> = {
  title: 'Components/Typography/BackLink',
  component: BackLink,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        // @ts-expect-error - data-hover is not a prop
        'data-hover': [false, true],
        'data-focus': [false, true],
        darkMode: [false, true],
        baseFontSize: [13, 16],
      },
      excludeCombinations: [
        {
          // @ts-expect-error - data-hover is not a prop
          'data-hover': true,
          'data-focus': true,
        },
      ],
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
    href: 'https://www.mongodb.design/',
    children: 'Lorem ipsum',
  },
};
export default meta;

export const Generated = () => <></>;
