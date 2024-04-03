import React from 'react';
import { type StoryMetaType, StoryType } from '@lg-tools/storybook-utils';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import Link from './Link';
import { ArrowAppearance, LinkProps } from './Link.types';

type LGProviderBaseFontSize = 14 | 16;

export const LiveExample = ({
  baseFontSize,
  darkMode,
  children,
  ...rest
}: LinkProps & {
  baseFontSize: LGProviderBaseFontSize;
}) => {
  return (
    <LeafyGreenProvider baseFontSize={baseFontSize} darkMode={darkMode}>
      {/* @ts-ignore */}
      <Link {...rest}>{children}</Link>
    </LeafyGreenProvider>
  );
};

const meta: StoryMetaType<typeof Link> = {
  title: 'Components/Typography/Link',
  component: Link,
  parameters: {
    default: 'LiveExample',
    generate: {
      storyNames: ['StandAloneLink', 'InlineLink'],
      combineArgs: {
        darkMode: [false, true],
        baseFontSize: [13, 16],
        href: ['https://www.mongodb.design/', undefined],
        arrowAppearance: Object.values(ArrowAppearance),
        children: [
          'Lorem ipsum',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sodales iaculis cursus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut sit amet magna id magna eleifend commodo in in mauris.',
        ],
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
        <LeafyGreenProvider darkMode={context?.args.darkMode}>
          <span>Lorem ipsum dolor sit amet </span>
          <Instance />
        </LeafyGreenProvider>
      );
    },
  },
};
