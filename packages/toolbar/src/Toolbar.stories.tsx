/* eslint-disable no-console */
import React, { useMemo } from 'react';
import { faker } from '@faker-js/faker';
import { StoryFn } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import { color, spacing } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import { Toolbar, ToolbarIconButton, ToolbarProps } from '.';

const LongContent = () => {
  const paragraphs = useMemo(() => {
    return faker.lorem
      .paragraphs(20, '\n')
      .split('\n')
      .map((p, i) => <Body key={i}>{p}</Body>);
  }, []);

  return (
    <div
      className={css`
        display: inline-flex;
        flex-direction: column;
        gap: ${spacing[100]}px;
        align-items: baseline;
      `}
    >
      <Button>Press Tab</Button>
      {paragraphs}
      <Button>Press Tab</Button>
    </div>
  );
};

export default {
  title: 'Components/Toolbar',
  component: Toolbar,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: ['children'],
    },
  },
  decorators: [
    Story => (
      <div style={{ position: 'relative', height: '70vh' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    children: (
      <>
        <ToolbarIconButton
          label="Code"
          glyph="Code"
          onClick={() => console.log('CODE')}
        />
        <ToolbarIconButton
          label="Key"
          glyph="Key"
          active
          onClick={() => console.log('KEY')}
        />
        <ToolbarIconButton
          label={<div>Megaphone</div>}
          glyph="Megaphone"
          onClick={() => console.log('MEGAPHONE')}
        />
        <ToolbarIconButton
          label="List"
          glyph="List"
          onClick={() => console.log('LIST')}
        />
      </>
    ),
  },
};

const Template: StoryFn<typeof Toolbar> = props => <Toolbar {...props} />;

export const LiveExample = Template.bind({});

export const InLayout: StoryFn<ToolbarProps> = (args: ToolbarProps) => {
  const theme = args.darkMode ? 'dark' : 'light';
  return (
    <div
      style={{
        height: '100%',
        border: `1px solid ${color[theme].border.primary.default}`,
        display: 'grid',
        width: '80vw',
        gridTemplateColumns: 'auto 48px',
      }}
    >
      <main style={{ overflow: 'scroll', padding: `${spacing[500]}px` }}>
        <LongContent />
      </main>
      <Toolbar {...args} />
    </div>
  );
};
