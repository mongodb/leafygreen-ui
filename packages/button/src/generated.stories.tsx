/* eslint-disable react/jsx-key */
import React from 'react';
import { Story } from '@storybook/react';

import Icon, { glyphs } from '@leafygreen-ui/icon';
import { StoryMeta } from '@leafygreen-ui/lib';

import { Size } from './types';
import Button, { ButtonProps, Variant } from '.';

export default StoryMeta({
  title: 'Components/Button',
  component: Button,
  excludeStories: ['StoryButton'],
  args: {
    children: 'MongoDB',
  },
  parameters: {
    default: 'Default',
    snapshot: {
      variables: {
        variant: Object.values(Variant),
        size: Object.values(Size),
        leftGlyph: [undefined, <Icon glyph={'Cloud'} />],
        rightGlyph: [undefined, <Icon glyph={'ArrowRight'} />],
      },
      useTemplate: false,
    },
  },
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    leftGlyph: {
      options: Object.keys(glyphs),
      control: { type: 'select' },
    },
    rightGlyph: {
      options: Object.keys(glyphs),
      control: { type: 'select' },
    },
    type: {
      control: 'select',
      options: ['button', 'submit'],
      defaultValue: 'button',
    },
    size: {
      control: 'select',
      options: Object.values(Size),
      defaultValue: Size.Default,
    },
    href: {
      control: 'text',
    },
  },
});

const Template: Story<ButtonProps> = ({
  leftGlyph,
  rightGlyph,
  ...args
}: ButtonProps) => (
  <Button
    // @ts-expect-error
    leftGlyph={leftGlyph ? <Icon glyph={leftGlyph} /> : undefined}
    // @ts-expect-error
    rightGlyph={rightGlyph ? <Icon glyph={rightGlyph} /> : undefined}
    {...args}
  />
);

export const variant_default__size_xsmall__leftGlyph_undefined__rightGlyph_undefined = () => <Button
  leftGlyph={undefined}
  rightGlyph={undefined}
  size="xsmall"
  variant="default"
>
  MongoDB
</Button>;
export const variant_primary__size_xsmall__leftGlyph_undefined__rightGlyph_undefined = () => <Button
  leftGlyph={undefined}
  rightGlyph={undefined}
  size="xsmall"
  variant="primary"
>
  MongoDB
</Button>;
export const variant_primaryOutline__size_xsmall__leftGlyph_undefined__rightGlyph_undefined = () => <Button
  leftGlyph={undefined}
  rightGlyph={undefined}
  size="xsmall"
  variant="primaryOutline"
>
  MongoDB
</Button>;
export const variant_danger__size_xsmall__leftGlyph_undefined__rightGlyph_undefined = () => <Button
  leftGlyph={undefined}
  rightGlyph={undefined}
  size="xsmall"
  variant="danger"
>
  MongoDB
</Button>;
export const variant_dangerOutline__size_xsmall__leftGlyph_undefined__rightGlyph_undefined = () => <Button
  leftGlyph={undefined}
  rightGlyph={undefined}
  size="xsmall"
  variant="dangerOutline"
>
  MongoDB
</Button>;
export const variant_baseGreen__size_xsmall__leftGlyph_undefined__rightGlyph_undefined = () => <Button
  leftGlyph={undefined}
  rightGlyph={undefined}
  size="xsmall"
  variant="baseGreen"
>
  MongoDB
</Button>;
export const variant_default__size_small__leftGlyph_undefined__rightGlyph_undefined = () => <Button
  leftGlyph={undefined}
  rightGlyph={undefined}
  size="small"
  variant="default"
>
  MongoDB
</Button>;
export const variant_primary__size_small__leftGlyph_undefined__rightGlyph_undefined = () => <Button
  leftGlyph={undefined}
  rightGlyph={undefined}
  size="small"
  variant="primary"
>
  MongoDB
</Button>;
export const variant_primaryOutline__size_small__leftGlyph_undefined__rightGlyph_undefined = () => <Button
  leftGlyph={undefined}
  rightGlyph={undefined}
  size="small"
  variant="primaryOutline"
>
  MongoDB
</Button>;
export const variant_danger__size_small__leftGlyph_undefined__rightGlyph_undefined = () => <Button
  leftGlyph={undefined}
  rightGlyph={undefined}
  size="small"
  variant="danger"
>
  MongoDB
</Button>;
export const variant_dangerOutline__size_small__leftGlyph_undefined__rightGlyph_undefined = () => <Button
  leftGlyph={undefined}
  rightGlyph={undefined}
  size="small"
  variant="dangerOutline"
>
  MongoDB
</Button>;
export const variant_baseGreen__size_small__leftGlyph_undefined__rightGlyph_undefined = () => <Button
  leftGlyph={undefined}
  rightGlyph={undefined}
  size="small"
  variant="baseGreen"
>
  MongoDB
</Button>;
export const variant_default__size_default__leftGlyph_undefined__rightGlyph_undefined = () => <Button
  leftGlyph={undefined}
  rightGlyph={undefined}
  size="default"
  variant="default"
>
  MongoDB
</Button>;
export const variant_primary__size_default__leftGlyph_undefined__rightGlyph_undefined = () => <Button
  leftGlyph={undefined}
  rightGlyph={undefined}
  size="default"
  variant="primary"
>
  MongoDB
</Button>;
export const variant_primaryOutline__size_default__leftGlyph_undefined__rightGlyph_undefined = () => <Button
  leftGlyph={undefined}
  rightGlyph={undefined}
  size="default"
  variant="primaryOutline"
>
  MongoDB
</Button>;
export const variant_danger__size_default__leftGlyph_undefined__rightGlyph_undefined = () => <Button
  leftGlyph={undefined}
  rightGlyph={undefined}
  size="default"
  variant="danger"
>
  MongoDB
</Button>;
export const variant_dangerOutline__size_default__leftGlyph_undefined__rightGlyph_undefined = () => <Button
  leftGlyph={undefined}
  rightGlyph={undefined}
  size="default"
  variant="dangerOutline"
>
  MongoDB
</Button>;
export const variant_baseGreen__size_default__leftGlyph_undefined__rightGlyph_undefined = () => <Button
  leftGlyph={undefined}
  rightGlyph={undefined}
  size="default"
  variant="baseGreen"
>
  MongoDB
</Button>;
export const variant_default__size_large__leftGlyph_undefined__rightGlyph_undefined = () => <Button
  leftGlyph={undefined}
  rightGlyph={undefined}
  size="large"
  variant="default"
>
  MongoDB
</Button>;
export const variant_primary__size_large__leftGlyph_undefined__rightGlyph_undefined = () => <Button
  leftGlyph={undefined}
  rightGlyph={undefined}
  size="large"
  variant="primary"
>
  MongoDB
</Button>;
export const variant_primaryOutline__size_large__leftGlyph_undefined__rightGlyph_undefined = () => <Button
  leftGlyph={undefined}
  rightGlyph={undefined}
  size="large"
  variant="primaryOutline"
>
  MongoDB
</Button>;
export const variant_danger__size_large__leftGlyph_undefined__rightGlyph_undefined = () => <Button
  leftGlyph={undefined}
  rightGlyph={undefined}
  size="large"
  variant="danger"
>
  MongoDB
</Button>;
export const variant_dangerOutline__size_large__leftGlyph_undefined__rightGlyph_undefined = () => <Button
  leftGlyph={undefined}
  rightGlyph={undefined}
  size="large"
  variant="dangerOutline"
>
  MongoDB
</Button>;
export const variant_baseGreen__size_large__leftGlyph_undefined__rightGlyph_undefined = () => <Button
  leftGlyph={undefined}
  rightGlyph={undefined}
  size="large"
  variant="baseGreen"
>
  MongoDB
</Button>;
export const variant_default__size_xsmall__leftGlyph_objectObject__rightGlyph_undefined = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={undefined}
  size="xsmall"
  variant="default"
>
  MongoDB
</Button>;
export const variant_primary__size_xsmall__leftGlyph_objectObject__rightGlyph_undefined = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={undefined}
  size="xsmall"
  variant="primary"
>
  MongoDB
</Button>;
export const variant_primaryOutline__size_xsmall__leftGlyph_objectObject__rightGlyph_undefined = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={undefined}
  size="xsmall"
  variant="primaryOutline"
>
  MongoDB
</Button>;
export const variant_danger__size_xsmall__leftGlyph_objectObject__rightGlyph_undefined = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={undefined}
  size="xsmall"
  variant="danger"
>
  MongoDB
</Button>;
export const variant_dangerOutline__size_xsmall__leftGlyph_objectObject__rightGlyph_undefined = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={undefined}
  size="xsmall"
  variant="dangerOutline"
>
  MongoDB
</Button>;
export const variant_baseGreen__size_xsmall__leftGlyph_objectObject__rightGlyph_undefined = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={undefined}
  size="xsmall"
  variant="baseGreen"
>
  MongoDB
</Button>;
export const variant_default__size_small__leftGlyph_objectObject__rightGlyph_undefined = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={undefined}
  size="small"
  variant="default"
>
  MongoDB
</Button>;
export const variant_primary__size_small__leftGlyph_objectObject__rightGlyph_undefined = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={undefined}
  size="small"
  variant="primary"
>
  MongoDB
</Button>;
export const variant_primaryOutline__size_small__leftGlyph_objectObject__rightGlyph_undefined = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={undefined}
  size="small"
  variant="primaryOutline"
>
  MongoDB
</Button>;
export const variant_danger__size_small__leftGlyph_objectObject__rightGlyph_undefined = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={undefined}
  size="small"
  variant="danger"
>
  MongoDB
</Button>;
export const variant_dangerOutline__size_small__leftGlyph_objectObject__rightGlyph_undefined = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={undefined}
  size="small"
  variant="dangerOutline"
>
  MongoDB
</Button>;
export const variant_baseGreen__size_small__leftGlyph_objectObject__rightGlyph_undefined = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={undefined}
  size="small"
  variant="baseGreen"
>
  MongoDB
</Button>;
export const variant_default__size_default__leftGlyph_objectObject__rightGlyph_undefined = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={undefined}
  size="default"
  variant="default"
>
  MongoDB
</Button>;
export const variant_primary__size_default__leftGlyph_objectObject__rightGlyph_undefined = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={undefined}
  size="default"
  variant="primary"
>
  MongoDB
</Button>;
export const variant_primaryOutline__size_default__leftGlyph_objectObject__rightGlyph_undefined = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={undefined}
  size="default"
  variant="primaryOutline"
>
  MongoDB
</Button>;
export const variant_danger__size_default__leftGlyph_objectObject__rightGlyph_undefined = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={undefined}
  size="default"
  variant="danger"
>
  MongoDB
</Button>;
export const variant_dangerOutline__size_default__leftGlyph_objectObject__rightGlyph_undefined = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={undefined}
  size="default"
  variant="dangerOutline"
>
  MongoDB
</Button>;
export const variant_baseGreen__size_default__leftGlyph_objectObject__rightGlyph_undefined = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={undefined}
  size="default"
  variant="baseGreen"
>
  MongoDB
</Button>;
export const variant_default__size_large__leftGlyph_objectObject__rightGlyph_undefined = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={undefined}
  size="large"
  variant="default"
>
  MongoDB
</Button>;
export const variant_primary__size_large__leftGlyph_objectObject__rightGlyph_undefined = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={undefined}
  size="large"
  variant="primary"
>
  MongoDB
</Button>;
export const variant_primaryOutline__size_large__leftGlyph_objectObject__rightGlyph_undefined = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={undefined}
  size="large"
  variant="primaryOutline"
>
  MongoDB
</Button>;
export const variant_danger__size_large__leftGlyph_objectObject__rightGlyph_undefined = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={undefined}
  size="large"
  variant="danger"
>
  MongoDB
</Button>;
export const variant_dangerOutline__size_large__leftGlyph_objectObject__rightGlyph_undefined = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={undefined}
  size="large"
  variant="dangerOutline"
>
  MongoDB
</Button>;
export const variant_baseGreen__size_large__leftGlyph_objectObject__rightGlyph_undefined = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={undefined}
  size="large"
  variant="baseGreen"
>
  MongoDB
</Button>;
export const variant_default__size_xsmall__leftGlyph_undefined__rightGlyph_objectObject = () => <Button
  leftGlyph={undefined}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="xsmall"
  variant="default"
>
  MongoDB
</Button>;
export const variant_primary__size_xsmall__leftGlyph_undefined__rightGlyph_objectObject = () => <Button
  leftGlyph={undefined}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="xsmall"
  variant="primary"
>
  MongoDB
</Button>;
export const variant_primaryOutline__size_xsmall__leftGlyph_undefined__rightGlyph_objectObject = () => <Button
  leftGlyph={undefined}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="xsmall"
  variant="primaryOutline"
>
  MongoDB
</Button>;
export const variant_danger__size_xsmall__leftGlyph_undefined__rightGlyph_objectObject = () => <Button
  leftGlyph={undefined}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="xsmall"
  variant="danger"
>
  MongoDB
</Button>;
export const variant_dangerOutline__size_xsmall__leftGlyph_undefined__rightGlyph_objectObject = () => <Button
  leftGlyph={undefined}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="xsmall"
  variant="dangerOutline"
>
  MongoDB
</Button>;
export const variant_baseGreen__size_xsmall__leftGlyph_undefined__rightGlyph_objectObject = () => <Button
  leftGlyph={undefined}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="xsmall"
  variant="baseGreen"
>
  MongoDB
</Button>;
export const variant_default__size_small__leftGlyph_undefined__rightGlyph_objectObject = () => <Button
  leftGlyph={undefined}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="small"
  variant="default"
>
  MongoDB
</Button>;
export const variant_primary__size_small__leftGlyph_undefined__rightGlyph_objectObject = () => <Button
  leftGlyph={undefined}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="small"
  variant="primary"
>
  MongoDB
</Button>;
export const variant_primaryOutline__size_small__leftGlyph_undefined__rightGlyph_objectObject = () => <Button
  leftGlyph={undefined}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="small"
  variant="primaryOutline"
>
  MongoDB
</Button>;
export const variant_danger__size_small__leftGlyph_undefined__rightGlyph_objectObject = () => <Button
  leftGlyph={undefined}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="small"
  variant="danger"
>
  MongoDB
</Button>;
export const variant_dangerOutline__size_small__leftGlyph_undefined__rightGlyph_objectObject = () => <Button
  leftGlyph={undefined}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="small"
  variant="dangerOutline"
>
  MongoDB
</Button>;
export const variant_baseGreen__size_small__leftGlyph_undefined__rightGlyph_objectObject = () => <Button
  leftGlyph={undefined}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="small"
  variant="baseGreen"
>
  MongoDB
</Button>;
export const variant_default__size_default__leftGlyph_undefined__rightGlyph_objectObject = () => <Button
  leftGlyph={undefined}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="default"
  variant="default"
>
  MongoDB
</Button>;
export const variant_primary__size_default__leftGlyph_undefined__rightGlyph_objectObject = () => <Button
  leftGlyph={undefined}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="default"
  variant="primary"
>
  MongoDB
</Button>;
export const variant_primaryOutline__size_default__leftGlyph_undefined__rightGlyph_objectObject = () => <Button
  leftGlyph={undefined}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="default"
  variant="primaryOutline"
>
  MongoDB
</Button>;
export const variant_danger__size_default__leftGlyph_undefined__rightGlyph_objectObject = () => <Button
  leftGlyph={undefined}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="default"
  variant="danger"
>
  MongoDB
</Button>;
export const variant_dangerOutline__size_default__leftGlyph_undefined__rightGlyph_objectObject = () => <Button
  leftGlyph={undefined}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="default"
  variant="dangerOutline"
>
  MongoDB
</Button>;
export const variant_baseGreen__size_default__leftGlyph_undefined__rightGlyph_objectObject = () => <Button
  leftGlyph={undefined}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="default"
  variant="baseGreen"
>
  MongoDB
</Button>;
export const variant_default__size_large__leftGlyph_undefined__rightGlyph_objectObject = () => <Button
  leftGlyph={undefined}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="large"
  variant="default"
>
  MongoDB
</Button>;
export const variant_primary__size_large__leftGlyph_undefined__rightGlyph_objectObject = () => <Button
  leftGlyph={undefined}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="large"
  variant="primary"
>
  MongoDB
</Button>;
export const variant_primaryOutline__size_large__leftGlyph_undefined__rightGlyph_objectObject = () => <Button
  leftGlyph={undefined}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="large"
  variant="primaryOutline"
>
  MongoDB
</Button>;
export const variant_danger__size_large__leftGlyph_undefined__rightGlyph_objectObject = () => <Button
  leftGlyph={undefined}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="large"
  variant="danger"
>
  MongoDB
</Button>;
export const variant_dangerOutline__size_large__leftGlyph_undefined__rightGlyph_objectObject = () => <Button
  leftGlyph={undefined}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="large"
  variant="dangerOutline"
>
  MongoDB
</Button>;
export const variant_baseGreen__size_large__leftGlyph_undefined__rightGlyph_objectObject = () => <Button
  leftGlyph={undefined}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="large"
  variant="baseGreen"
>
  MongoDB
</Button>;
export const variant_default__size_xsmall__leftGlyph_objectObject__rightGlyph_objectObject = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="xsmall"
  variant="default"
>
  MongoDB
</Button>;
export const variant_primary__size_xsmall__leftGlyph_objectObject__rightGlyph_objectObject = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="xsmall"
  variant="primary"
>
  MongoDB
</Button>;
export const variant_primaryOutline__size_xsmall__leftGlyph_objectObject__rightGlyph_objectObject = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="xsmall"
  variant="primaryOutline"
>
  MongoDB
</Button>;
export const variant_danger__size_xsmall__leftGlyph_objectObject__rightGlyph_objectObject = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="xsmall"
  variant="danger"
>
  MongoDB
</Button>;
export const variant_dangerOutline__size_xsmall__leftGlyph_objectObject__rightGlyph_objectObject = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="xsmall"
  variant="dangerOutline"
>
  MongoDB
</Button>;
export const variant_baseGreen__size_xsmall__leftGlyph_objectObject__rightGlyph_objectObject = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="xsmall"
  variant="baseGreen"
>
  MongoDB
</Button>;
export const variant_default__size_small__leftGlyph_objectObject__rightGlyph_objectObject = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="small"
  variant="default"
>
  MongoDB
</Button>;
export const variant_primary__size_small__leftGlyph_objectObject__rightGlyph_objectObject = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="small"
  variant="primary"
>
  MongoDB
</Button>;
export const variant_primaryOutline__size_small__leftGlyph_objectObject__rightGlyph_objectObject = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="small"
  variant="primaryOutline"
>
  MongoDB
</Button>;
export const variant_danger__size_small__leftGlyph_objectObject__rightGlyph_objectObject = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="small"
  variant="danger"
>
  MongoDB
</Button>;
export const variant_dangerOutline__size_small__leftGlyph_objectObject__rightGlyph_objectObject = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="small"
  variant="dangerOutline"
>
  MongoDB
</Button>;
export const variant_baseGreen__size_small__leftGlyph_objectObject__rightGlyph_objectObject = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="small"
  variant="baseGreen"
>
  MongoDB
</Button>;
export const variant_default__size_default__leftGlyph_objectObject__rightGlyph_objectObject = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="default"
  variant="default"
>
  MongoDB
</Button>;
export const variant_primary__size_default__leftGlyph_objectObject__rightGlyph_objectObject = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="default"
  variant="primary"
>
  MongoDB
</Button>;
export const variant_primaryOutline__size_default__leftGlyph_objectObject__rightGlyph_objectObject = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="default"
  variant="primaryOutline"
>
  MongoDB
</Button>;
export const variant_danger__size_default__leftGlyph_objectObject__rightGlyph_objectObject = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="default"
  variant="danger"
>
  MongoDB
</Button>;
export const variant_dangerOutline__size_default__leftGlyph_objectObject__rightGlyph_objectObject = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="default"
  variant="dangerOutline"
>
  MongoDB
</Button>;
export const variant_baseGreen__size_default__leftGlyph_objectObject__rightGlyph_objectObject = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="default"
  variant="baseGreen"
>
  MongoDB
</Button>;
export const variant_default__size_large__leftGlyph_objectObject__rightGlyph_objectObject = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="large"
  variant="default"
>
  MongoDB
</Button>;
export const variant_primary__size_large__leftGlyph_objectObject__rightGlyph_objectObject = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="large"
  variant="primary"
>
  MongoDB
</Button>;
export const variant_primaryOutline__size_large__leftGlyph_objectObject__rightGlyph_objectObject = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="large"
  variant="primaryOutline"
>
  MongoDB
</Button>;
export const variant_danger__size_large__leftGlyph_objectObject__rightGlyph_objectObject = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="large"
  variant="danger"
>
  MongoDB
</Button>;
export const variant_dangerOutline__size_large__leftGlyph_objectObject__rightGlyph_objectObject = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="large"
  variant="dangerOutline"
>
  MongoDB
</Button>;
export const variant_baseGreen__size_large__leftGlyph_objectObject__rightGlyph_objectObject = () => <Button
  leftGlyph={<Icon glyph="Cloud" />}
  rightGlyph={<Icon glyph="ArrowRight" />}
  size="large"
  variant="baseGreen"
>
  MongoDB
</Button>;