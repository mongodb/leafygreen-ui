import React from 'react';
import { StoryMetaType, StoryType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import Badge from '@leafygreen-ui/badge';
import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { BackLink } from '@leafygreen-ui/typography';

import { CanvasHeader } from '.';

const meta: StoryMetaType<typeof CanvasHeader> = {
  title: 'Components/CanvasHeader',
  component: CanvasHeader,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: ['resourceIcon', 'actions', 'backLink', 'badges'],
    },
    generate: {
      storyNames: ['DarkMode', 'LightMode', 'Truncate', 'Interactions'],
      decorator: Instance => {
        return (
          <div
            className={css`
              position: relative;
              width: 50vw;
            `}
          >
            <Instance />
          </div>
        );
      },
      args: { pageTitle: 'Page Title' },
      combineArgs: {
        backLink: [
          <BackLink href="/home" key="1">
            Back to Cluster
          </BackLink>,
          undefined,
        ],
        resourceName: [
          'ac_iqttxwn_shard-00-01.hvcuthh.mongodb.net:27017_324892384903284902384903284903284902384903284832908_long_name',
          'normal not long short_name',
          undefined,
        ],
        resourceIcon: [<Icon key="1" glyph={'ShardedCluster'} />, undefined],
        actions: [
          <>
            <Button leftGlyph={<Icon glyph={'InviteUser'} />}>
              Invite user
            </Button>
            <Button variant="primary" leftGlyph={<Icon glyph={'InviteUser'} />}>
              Invite user
            </Button>
          </>,
          undefined,
        ],
        badges: [
          <>
            <Badge variant="green">Enabled</Badge>
            <Badge variant="blue">In Dev Mode</Badge>
          </>,
          undefined,
        ],
      },
    },
  },
  args: {
    backLink: <BackLink href="/home">Back to Cluster</BackLink>,
    pageTitle: 'Page title',
    resourceName:
      'ac_iqttxwn_shard-00-01.hvcuthh.mongodb.net:27017_324892384903284902384903284903284902384903284832908_long_name',
    darkMode: false,
    resourceIcon: <Icon glyph={'ShardedCluster'} />,
    actions: (
      <Button variant="primary" leftGlyph={<Icon glyph={'InviteUser'} />}>
        Invite user
      </Button>
    ),
    badges: (
      <>
        <Badge variant="green">Enabled</Badge>
        <Badge variant="blue">In Dev Mode</Badge>
      </>
    ),
  },
  argTypes: {
    darkMode: {
      control: 'boolean',
    },
    pageTitle: {
      control: 'text',
    },
    resourceName: {
      control: 'text',
    },
  },
};
export default meta;

const Template: StoryFn<typeof CanvasHeader> = props => (
  <CanvasHeader {...props} />
);

export const LiveExample = Template.bind({});
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const DarkMode: StoryType<typeof CanvasHeader> = () => <></>;
DarkMode.parameters = {
  generate: {
    args: {
      darkMode: true,
    },
  },
};

export const LightMode: StoryType<typeof CanvasHeader> = () => <></>;

export const Truncate: StoryType<typeof CanvasHeader> = () => <></>;
Truncate.parameters = {
  generate: {
    args: {
      pageTitle: 'A relatively long page title name that triggers truncation',
      // @ts-ignore
      'data-hover': false,
      'data-focus': false,
    },
  },
};

export const Interactions: StoryType<typeof CanvasHeader> = () => <></>;
Interactions.parameters = {
  generate: {
    args: {
      actions: undefined,
      badges: undefined,
      backLink: undefined,
    },
    combineArgs: {
      darkMode: [true, false],
      // @ts-ignore
      'data-hover': [false, true],
      'data-focus': [false, true],
      resourceName: [
        'ac_iqttxwn_shard-00-01.hvcuthh.mongodb.net:27017_324892384903284902384903284903284902384903284832908_long_name',
        'normal not long short_name',
      ],
    },
    excludeCombinations: [
      {
        // @ts-ignore
        'data-hover': false,
        'data-focus': false,
      },
    ],
  },
};
