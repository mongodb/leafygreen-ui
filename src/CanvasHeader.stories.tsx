import React from 'react';
import { faker } from '@faker-js/faker';
import { StoryMetaType, StoryType } from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import Badge from '@leafygreen-ui/badge';
import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { BackLink } from '@leafygreen-ui/typography';

import { CanvasHeader } from '.';

faker.seed(123);

const testResourceNames = {
  long: `${faker.database.collation()}-shard-${faker.string.uuid()}.${faker.database.mongodbObjectId()}${faker.database.mongodbObjectId()}${faker.database.mongodbObjectId()}`,
  normal: `shard-${faker.database.mongodbObjectId()}`,
  short: `myShard`,
};

const meta: StoryMetaType<typeof CanvasHeader> = {
  title: 'Components/CanvasHeader',
  component: CanvasHeader,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [
        'resourceIcon',
        'actions',
        'backLink',
        'badges',
        'resourceBadges',
      ],
    },
    generate: {
      storyNames: [
        'LightMode',
        'DarkMode',
        'LightModeWithResource',
        'DarkModeWithResource',
        'Interactions',
      ],
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
      combineArgs: {
        backLink: [
          undefined,
          <BackLink href="/home" key="1">
            Back to Cluster
          </BackLink>,
        ],
        badges: [
          undefined,
          <>
            <Badge variant="green">Enabled</Badge>
            <Badge variant="blue">In Dev Mode</Badge>
          </>,
        ],
        actions: [
          undefined,
          <>
            <Button leftGlyph={<Icon glyph={'InviteUser'} />}>
              Invite user
            </Button>
            <Button variant="primary" leftGlyph={<Icon glyph={'InviteUser'} />}>
              Invite user
            </Button>
          </>,
        ],
        pageTitle: [
          'Page Title',
          'Some very very long page title name that will trigger truncation eventually',
        ],
      },
    },
  },
  args: {
    backLink: <BackLink href="/home">Back to Cluster</BackLink>,
    pageTitle: 'Cluster Shards',
    resourceName: testResourceNames.normal,
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
    resourceBadges: (
      <>
        <Badge variant="green">Ready</Badge>
        <Badge variant="lightgray">Queryable</Badge>
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
  <div
    className={css`
      min-width: 50vw;
      position: relative;
      z-index: 0;
    `}
  >
    <CanvasHeader {...props} />
  </div>
);

export const LiveExample = Template.bind({});
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const LightMode: StoryObj<typeof CanvasHeader> = {
  render: () => <></>,
  parameters: {
    generate: {
      args: {
        darkMode: false,
        resourceName: undefined,
      },
    },
  },
};

export const DarkMode: StoryObj<typeof CanvasHeader> = {
  render: () => <></>,
  parameters: {
    generate: {
      args: {
        darkMode: true,
        resourceName: undefined,
      },
    },
  },
};

const staticArgsForResourceStories = {
  pageTitle: 'Page title',
  backLink: <BackLink href="/home">Back to Cluster</BackLink>,
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
};

const combinedArgsForResourceStories = {
  resourceIcon: [undefined, <Icon key="1" glyph={'ShardedCluster'} />],
  resourceBadges: [
    undefined,
    <>
      <Badge variant="green">Ready</Badge>
      <Badge variant="lightgray">Queryable</Badge>
    </>,
  ],
  resourceName: [
    testResourceNames.short,
    testResourceNames.normal,
    testResourceNames.long,
  ],
};

export const LightModeWithResource: StoryObj<typeof CanvasHeader> = {
  render: () => <></>,
  parameters: {
    generate: {
      args: {
        darkMode: false,
        ...staticArgsForResourceStories,
      },
      combineArgs: {
        ...combinedArgsForResourceStories,
      },
    },
  },
};

export const DarkModeWithResource: StoryObj<typeof CanvasHeader> = {
  render: () => <></>,
  parameters: {
    generate: {
      args: {
        darkMode: true,
        ...staticArgsForResourceStories,
      },
      combineArgs: {
        ...combinedArgsForResourceStories,
      },
    },
  },
};

export const Interactions: StoryType<typeof CanvasHeader> = () => <></>;
Interactions.parameters = {
  generate: {
    args: {
      pageTitle: 'Page title',
      actions: undefined,
      badges: undefined,
      backLink: undefined,
    },
    combineArgs: {
      darkMode: [true, false],
      resourceName: [testResourceNames.short, testResourceNames.long],
      // @ts-ignore
      'data-hover': [false, true],
      'data-focus': [false, true],
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
