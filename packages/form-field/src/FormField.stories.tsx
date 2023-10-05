/* eslint-disable react/prop-types */
import React from 'react';
import { StoryFn } from '@storybook/react';
import { omit } from 'lodash';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';
import { Size } from '@leafygreen-ui/tokens';

import {
  FormField,
  FormFieldInput,
  FormFieldInputProps,
  FormFieldProps,
  FormFieldState,
  useFormFieldContext,
} from '.';

type FormFieldStoryProps = FormFieldProps &
  FormFieldInputProps & { glyph: string };

const meta: StoryMetaType<typeof FormField, FormFieldStoryProps> = {
  title: 'Components/FormField',
  component: FormField,
  parameters: {
    default: 'Basic',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        description: [undefined, 'Description'],
        icon: [undefined, <Icon glyph="Cloud" key="" />],
        size: Object.values(Size),
        state: omit(Object.values(FormFieldState), 'valid'),
        disabled: [false, true],
      },
      excludeCombinations: [
        {
          disabled: true,
          state: FormFieldState.Error,
        },
      ],
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
    state: FormFieldState.Default,
    glyph: 'Beaker',
  },
  argTypes: {
    darkMode: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    errorMessage: { control: 'text' },
    size: { control: 'select' },
    state: {
      control: 'select',
      options: omit(Object.values(FormFieldState), 'valid'),
    },
    glyph: { control: 'select', options: Object.keys(glyphs) },
  },
};

export default meta;

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

export const Custom_TwoIcons: StoryFn<FormFieldStoryProps> = ({
  glyph,
  ...props
}: FormFieldStoryProps) => (
  <FormField {...props}>
    <FormFieldInput
      role="combobox"
      tabIndex={-1}
      icon={
        <span
          className={css`
            display: flex;
            align-items: center;
            gap: 0;
          `}
        >
          <IconButton aria-label="Icon">
            <Icon glyph="XWithCircle" />
          </IconButton>
          <Icon glyph="CaretDown" />
        </span>
      }
    >
      <input placeholder="placeholder" />
    </FormFieldInput>
  </FormField>
);

const DemoFormFieldButton = (props: FormFieldStoryProps) => {
  const { inputProps } = useFormFieldContext();
  return (
    <Button rightGlyph={<Icon glyph={props.glyph} {...inputProps} />}>
      Click Me
    </Button>
  );
};

export const Custom_ButtonInput: StoryFn<FormFieldStoryProps> = (
  props: FormFieldStoryProps,
) => (
  <FormField {...props}>
    <DemoFormFieldButton {...props} />
  </FormField>
);

export const Generated = () => <></>;
