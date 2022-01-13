import React from 'react';
import { css } from '@emotion/css';
import BeakerIcon from '@leafygreen-ui/icon/dist/Beaker';
import {
  Select,
  Option,
  OptionGroup,
  Size,
  State,
} from '@leafygreen-ui/select';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const knobsConfig: KnobsConfigInterface<{
  darkMode: boolean;
  disabled: boolean;
  withIcons: boolean;
  label: string;
  description: string;
  placeholder: string;
  size: Size;
  allowDeselect: boolean;
  state: State;
  errorMessage: string;
}> = {
  darkMode: {
    type: 'boolean',
    default: false,
    label: 'Dark Mode',
  },
  allowDeselect: {
    type: 'boolean',
    default: false,
    label: 'Allow Deselect',
  },
  disabled: {
    type: 'boolean',
    default: false,
    label: 'Disabled',
  },
  withIcons: {
    type: 'boolean',
    default: true,
    label: 'With Icons',
  },
  label: {
    type: 'text',
    default: 'Read Preference',
    label: 'Label',
  },
  description: {
    type: 'text',
    default:
      'Read preference describes how MongoDB clients route read operations to the members of a replica set. Learn more about how to configure your read preference.',
    label: 'Description',
  },
  placeholder: {
    type: 'text',
    default: 'Select...',
    label: 'Placeholder',
  },
  size: {
    type: 'select',
    options: Object.values(Size),
    default: Size.Default,
    label: 'Size',
  },
  state: {
    type: 'select',
    options: Object.values(State),
    default: State.None,
    label: 'State',
  },
  errorMessage: {
    type: 'text',
    default: 'This is the error message',
    label: 'Error message',
  },
};

export default function SelectLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({
        darkMode,
        size,
        label,
        description,
        placeholder,
        disabled,
        withIcons,
        allowDeselect,
        errorMessage,
        state,
      }) => (
        <div>
          <Select
            darkMode={darkMode}
            size={size}
            label={label}
            description={description}
            placeholder={placeholder}
            name="readPreferences"
            defaultValue="primary"
            disabled={disabled}
            allowDeselect={allowDeselect}
            className={css`
              width: 400px;
            `}
            state={state}
            errorMessage={errorMessage}
          >
            <OptionGroup label="Primary">
              <Option
                value="primary"
                glyph={withIcons ? <BeakerIcon /> : undefined}
              >
                primary
              </Option>
              <Option
                value="primPreferred"
                glyph={withIcons ? <BeakerIcon /> : undefined}
              >
                primaryPreferred
              </Option>
            </OptionGroup>
            <OptionGroup label="Secondary">
              <Option
                value="secondary"
                glyph={withIcons ? <BeakerIcon /> : undefined}
              >
                secondary
              </Option>
              <Option value="secondaryPreferred">secondaryPreferred</Option>
            </OptionGroup>
            <Option glyph={withIcons ? <BeakerIcon /> : undefined}>
              nearest
            </Option>
          </Select>
        </div>
      )}
    </LiveExample>
  );
}
