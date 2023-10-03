/* eslint-disable react/prop-types */
import React from 'react';
import { StoryFn } from '@storybook/react';

import Icon, { glyphs } from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';
import { Size } from '@leafygreen-ui/tokens';

import { FormFieldProps, FormFieldState } from './FormField/FormField.types';
import { FormFieldInput } from './FormField/FormFieldInput';
import { FormField } from '.';

const meta: StoryMetaType<typeof FormField> = {
  title: 'Components/FormField',
  component: FormField,
  parameters: {
    default: 'Basic',
    controls: {
      exclude: ['inputWrapperProps', 'icon'],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        description: [undefined, 'Description'],
        icon: [undefined, <Icon glyph="Cloud" key="" />],
        size: Object.values(Size),
        state: Object.values(FormFieldState),
        disabled: [false, true],
      },
      excludeCombinations: [{}],
      args: {
        children: <input placeholder="placeholder" />,
      },
      decorator: (Instance, ctx) => (
        <LeafyGreenProvider darkMode={ctx?.args.darkMode}>
          <Instance>
            <FormFieldInput icon={ctx?.args.icon}>
              {ctx?.args.children}
            </FormFieldInput>
          </Instance>
        </LeafyGreenProvider>
      ),
    },
  },
  args: {
    label: 'Label',
    description: 'Description',
    errorMessage: 'This is a notification',
    size: Size.Default,
    state: FormFieldState.Unset,
    glyph: 'Beaker',
  },
  argTypes: {
    darkMode: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    errorMessage: { control: 'text' },
    size: { control: 'select' },
    state: { control: 'select' },
    glyph: { control: 'select', options: Object.keys(glyphs) },
  },
};

export default meta;

type FormFieldStoryProps = FormFieldProps & { glyph: string };
export const Basic: StoryFn<FormFieldStoryProps> = ({
  label,
  description,
  state,
  size,
  disabled,
  glyph,
  ...rest
}: FormFieldStoryProps) => (
  <FormField
    label={label}
    description={description}
    state={state}
    size={size}
    disabled={disabled}
    {...rest}
  >
    <FormFieldInput role="combobox" tabIndex={-1} icon={<Icon glyph={glyph} />}>
      <input placeholder="placeholder" />
    </FormFieldInput>
  </FormField>
);

export const WithIconButton: StoryFn<FormFieldStoryProps> = ({
  label,
  description,
  state,
  size,
  disabled,
  glyph,
  ...rest
}: FormFieldStoryProps) => (
  <FormField
    label={label}
    description={description}
    state={state}
    size={size}
    disabled={disabled}
    {...rest}
  >
    <FormFieldInput
      role="combobox"
      tabIndex={-1}
      icon={
        <IconButton aria-label="Icon">
          <Icon glyph={glyph} />
        </IconButton>
      }
    >
      <input placeholder="placeholder" />
    </FormFieldInput>
  </FormField>
);

export const Generated = () => <></>;
