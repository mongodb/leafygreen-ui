import React from 'react';
import { type StoryMetaType, StoryType } from '@lg-tools/storybook-utils';

import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';

import Link from './Link';
import { ArrowAppearance, LinkProps } from './Link.types';

export const LiveExample = ({ children, ...rest }: LinkProps) => {
  // @ts-ignore
  return <Link {...rest}>{children}</Link>;
};

const meta: StoryMetaType<typeof Link> = {
  title: 'Components/Typography/Link',
  component: Link,
  parameters: {
    default: 'LiveExample',
    generate: {
      storyNames: ['StandAloneLink', 'InlineLink'],
      combineArgs: {
        // @ts-expect-error - data-hover is not a prop
        'data-hover': [false, true],
        'data-focus': [false, true],
        darkMode: [false, true],
        baseFontSize: [13, 16],
        href: ['https://www.mongodb.design/', undefined],
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
    children: 'Lorem ipsum',
  },
};
export default meta;

export const StandAloneLink: StoryType<typeof Link> = () => <></>;
export const InlineLink: StoryType<typeof Link> = () => <></>;
InlineLink.parameters = {
  generate: {
    decorator: (Instance, context) => {
      return (
        <LeafygreenProvider darkMode={context?.args.darkMode}>
          <span>Lorem ipsum dolor sit amet </span>
          <Instance />
        </LeafygreenProvider>
      );
    },
  },
};
