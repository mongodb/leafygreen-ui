import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

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
    },
  },
  args: {
    href: 'https://www.mongodb.design/',
    children: 'Lorem ipsum',
  },
};
export default meta;

export const Generated = () => <></>;
