/* eslint-disable react/prop-types */
import React from 'react';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { StoryMetaType } from '@leafygreen-ui/lib';
import { Size } from '@leafygreen-ui/tokens';

import { FormFieldProps, FormFieldState } from './FormField/FormField.types';
import { FormField } from '.';

const meta: StoryMetaType<typeof FormField> = {
  title: 'Components/FormField',
  component: FormField,
  parameters: {
    default: 'Basic',
    controls: {
      exclude: ['inputWrapperProps', 'icon'],
    },
  },
  args: {
    label: 'Label',
    description: 'Description',
    notificationMessage: 'This is a notification',
    size: Size.Default,
    state: FormFieldState.Unset,
    glyph: 'Beaker',
  },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    notificationMessage: { control: 'text' },
    size: { control: 'select' },
    state: { control: 'select' },
    glyph: { control: 'select', options: Object.keys(glyphs) },
  },
};

export default meta;

export const Basic: StoryFn<FormFieldProps & { glyph: string }> = props => (
  <FormField {...props} icon={<Icon glyph={props.glyph} />}>
    <input placeholder="placeholder" />
  </FormField>
);

export const WithIconButton: StoryFn<
  FormFieldProps & { glyph: string }
> = props => (
  <FormField
    {...props}
    inputWrapperProps={{
      className: css`
        padding-inline-end: 4px;
      `,
    }}
    icon={
      <IconButton aria-label="Icon">
        <Icon glyph={props.glyph} />
      </IconButton>
    }
  >
    <input placeholder="placeholder" />
  </FormField>
);
