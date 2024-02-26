import React from 'react';
import { StoryFn } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { StoryMetaType, StoryType } from '@leafygreen-ui/lib';
import { BackLink } from '@leafygreen-ui/typography';

import { CanvasHeader } from '.';

const meta: StoryMetaType<typeof CanvasHeader> = {
  title: 'Components/CanvasHeader',
  component: CanvasHeader,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: ['resourceIcon', 'actions', 'backLink'],
    },
    generate: {
      storyNames: ['DarkMode', 'LightMode', 'Truncate'],
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
        // @ts-ignore - data-hover is not a prop
        'data-hover': [false, true],
        'data-focus': [false, true],
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
            <Button variant="primary" leftGlyph={<Icon glyph={'InviteUser'} />}>
              Invite user
            </Button>
          </>,
          undefined,
        ],
      },
      excludeCombinations: [
        [
          // @ts-ignore
          'data-focus',
          // @ts-ignore
          {
            resourceName: undefined,
          },
        ],
        [
          // @ts-ignore
          'data-hover',
          // @ts-ignore
          {
            resourceName: undefined,
          },
        ],
      ],
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

export const MultipleActions = Template.bind({});
MultipleActions.args = {
  actions: (
    <>
      <Button leftGlyph={<Icon glyph={'InviteUser'} />}>Invite user</Button>
      <Button leftGlyph={<Icon glyph={'InviteUser'} />}>Invite user</Button>
      <Button variant="primary" leftGlyph={<Icon glyph={'InviteUser'} />}>
        Invite user
      </Button>
    </>
  ),
  pageTitle: 'A relatively long page title name that triggers truncation',
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
      actions: (
        <>
          <Button leftGlyph={<Icon glyph={'InviteUser'} />}>Invite user</Button>
          <Button leftGlyph={<Icon glyph={'InviteUser'} />}>Invite user</Button>
          <Button variant="primary" leftGlyph={<Icon glyph={'InviteUser'} />}>
            Invite user
          </Button>
        </>
      ),
    },
  },
};
