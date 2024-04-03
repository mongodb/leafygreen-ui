import React from 'react';
import { type StoryMetaType } from '@lg-tools/storybook-utils';

import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';

import BackLink from './BackLink';
import { BackLinkProps } from './BackLink.types';

type LGProviderBaseFontSize = 14 | 16;

export const LiveExample = ({
  baseFontSize,
  darkMode,
  children,
  ...rest
}: BackLinkProps & {
  baseFontSize: LGProviderBaseFontSize;
}) => {
  return (
    <LeafygreenProvider baseFontSize={baseFontSize} darkMode={darkMode}>
      {/* @ts-ignore */}
      <BackLink {...rest}>{children}</BackLink>
    </LeafygreenProvider>
  );
};

const meta: StoryMetaType<typeof BackLink> = {
  title: 'Components/Typography/BackLink',
  component: BackLink,
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
    href: 'https://www.mongodb.design/',
    children: 'Lorem ipsum',
  },
};
export default meta;

export const Generated = () => <></>;
