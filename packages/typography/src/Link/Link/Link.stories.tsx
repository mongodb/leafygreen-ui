import React from 'react';
import { type StoryMetaType, StoryType } from '@lg-tools/storybook-utils';

import { BaseFontSize } from '@leafygreen-ui/tokens';

import Link from './Link';
import { ArrowAppearance, LinkProps } from './Link.types';

export const Basic = ({ children, ...rest }: LinkProps) => {
  // @ts-ignore
  return <Link {...rest}>{children}</Link>;
};

const meta: StoryMetaType<typeof Link> = {
  title: 'Components/Typography/Link',
  component: Link,
  parameters: {
    default: 'Basic',
    generate: {
      storyNames: ['StandAloneLink', 'InlineLink'],
      combineArgs: {
        // @ts-expect-error - data-hover is not a prop
        'data-hover': [false, true],
        'data-focus': [false, true],
        darkMode: [false, true],
        baseFontSize: Object.values(BaseFontSize),
        href: ['https://www.mongodb.design/', window.location.href],
        arrowAppearance: Object.values(ArrowAppearance),
        children: [
          'Lorem ipsum',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sodales iaculis cursus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut sit amet magna id magna eleifend commodo in in mauris.',
        ],
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
    children: 'Lorem ipsum',
    darkMode: false,
  },
};
export default meta;

export const StandAloneLink: StoryType<typeof Link> = () => <></>;
export const InlineLink: StoryType<typeof Link> = () => <></>;
InlineLink.parameters = {
  generate: {
    decorator: Instance => {
      return (
        <>
          <span>Lorem ipsum dolor sit amet </span>
          <Instance />
        </>
      );
    },
  },
};
