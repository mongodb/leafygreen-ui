import React from 'react';
import {
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

import { GlyphName } from './glyphs';
import Icon, { createIconComponent, glyphs, IconProps, Size } from '.';

const meta: StoryMetaType<typeof Icon> = {
  title: 'Components/Display/Icon',
  component: Icon,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams, 'data-testid'],
    },
  },
  args: {
    fill: palette.gray.base,
    size: Size.Default,
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(Size),
      defaultValue: Size.Default,
    },
    fill: {
      control: 'color',
    },
    title: {
      control: 'text',
      description: 'The title of the icon for accessibility',
      defaultValue: undefined,
    },
  },
};

export default meta;

const containerStyle = css`
  width: 150px;
  height: 70px;
  flex-shrink: 0;
  text-align: center;
  border: 1px solid ${palette.gray.light1};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0.5rem;
`;

const textStyle = css`
  font-size: 12px;
  color: ${palette.gray.base};
  margin-top: 0.5rem;
`;

export const Single: StoryObj<typeof Icon> = {
  render: (args: IconProps) => {
    if (!args.glyph) {
      args = {
        ...args,
        glyph: 'QuestionMarkWithCircle',
      };
    }

    return <Icon {...args} />;
  },
  parameters: { chromatic: { disableSnapshot: true } },
  argTypes: {
    glyph: {
      control: 'select',
      options: Object.keys(glyphs),
    },
  },
};

export const LiveExample: StoryObj<IconProps> = {
  parameters: {
    controls: {
      exclude: [...meta.parameters.controls!.exclude!, 'glyph'],
    },
  },
  render: (args: Omit<IconProps, 'glyph'>) => (
    <div
      className={css`
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
      `}
    >
      {Object.keys(glyphs).map(glyph => {
        return (
          <div key={glyph} className={containerStyle}>
            <Icon {...args} glyph={glyph as GlyphName} />
            <div className={textStyle}>{glyph}</div>
          </div>
        );
      })}
    </div>
  ),
};

export const Custom: StoryObj<typeof Icon> = {
  parameters: {
    controls: {
      exclude: [...meta.parameters.controls!.exclude!, 'glyph'],
    },
  },
  render: (args: Omit<IconProps, 'glyph'>) => {
    const CustomIcon = createIconComponent(glyphs);
    return <CustomIcon glyph="Checkmark" {...args} />;
  },
};

export const Generated: StoryObj<typeof Icon> = {
  parameters: {
    generate: {
      args: {
        glyph: 'Cloud',
      },
      combineArgs: {
        size: Object.values(Size),
        fill: [palette.gray.base, palette.green.base],
      },
    },
  },
};
