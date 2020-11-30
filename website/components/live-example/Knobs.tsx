import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { uiColors } from '@leafygreen-ui/palette';
import TextInput from '@leafygreen-ui/text-input';
import TextArea from '@leafygreen-ui/text-area';
import Toggle from '@leafygreen-ui/toggle';

const knobContainerStyle = css`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  margin-bottom: ${spacing[4]}px;
`;

const labelStyle = css`
  color: ${uiColors.gray.dark2};
  font-size: 14px;
  letter-spacing: 0;
  line-height: 20px;
  font-weight: 600;
`;

const textAreaClassName = css`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  padding-left: 16px;
  width: 300px;
`

const labelDarkMode = css`
  color: ${uiColors.gray.light1};
`;

const Knob = {
  Select: 'select',
  Number: 'number',
  Text: 'text',
  Boolean: 'boolean',
} as const;

type Knob = typeof Knob[keyof typeof Knob];

interface KnobInterface {
  label: string;
  prop: string;
  darkMode: boolean;
}

export interface BooleanInterface extends KnobInterface {
  onChange: (value: boolean, prop: string) => void;
  value: boolean;
}

export interface TextInterface extends KnobInterface {
  onChange: (value: string, prop: string) => void;
  value: string;
}

export interface NumberInterface extends KnobInterface {
  onChange: (value: number, prop: string) => void;
  value: number;
}

export interface BasicSelectInterface extends KnobInterface {
  onChange: (value: string, prop: string) => void;
  value: string;
  options: Array<string>;
}

export interface GlyphSelectInterface {
  onChange: (value: string, prop: string) => void;
  value: React.ReactElement;
  options: Array<string>;
  label: string;
  prop: 'glyph';
  darkMode: boolean;
}

function Boolean({ onChange, label, value, prop, darkMode }: BooleanInterface) {
  const handleChange = () => {
    onChange(!value, prop);
  };

  return (
    <div className={knobContainerStyle}>
      <label className={cx(labelStyle, { [labelDarkMode]: darkMode })}>
        {label}
      </label>
      <Toggle
        onChange={handleChange}
        checked={value}
        size="small"
        darkMode={darkMode}
      />
    </div>
  );
}

function Number({ onChange, label, value, prop, darkMode }: NumberInterface) {
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(target.value), prop);
  };

  const labelId = `${label}-id`;

  return (
    <div className={knobContainerStyle}>
      <label
        className={cx(labelStyle, { [labelDarkMode]: darkMode })}
        id={labelId}
      >
        {label}
      </label>
      <TextInput
        type="number"
        onChange={handleChange}
        value={value.toString()}
        aria-labelledby={labelId}
        darkMode={darkMode}
      />
    </div>
  );
}

function Text({ onChange, label, value, prop, darkMode }: TextInterface) {
  const handleChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(target.value, prop);
  };

  const labelId = `${label}-id`;

  return (
    <div className={knobContainerStyle}>
      <label
        className={cx(labelStyle, { [labelDarkMode]: darkMode })}
        id={labelId}
      >
        {label}
      </label>
      <TextArea
        onChange={handleChange}
        value={value.toString()}
        aria-labelledby={labelId}
        darkMode={darkMode}
        className={textAreaClassName}
      />
    </div>
  );
}

function Select({
  onChange,
  label,
  value,
  prop,
  options,
  darkMode,
}: BasicSelectInterface | GlyphSelectInterface) {
  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(target.value, prop);
  };

  const generateOptionsCallback = () => {
    return options
      .sort((a, b) => a.localeCompare(b))
      .map(option => (
        <option key={option} value={option} selected={option === value}>
          {option}
        </option>
      ));
  };

  const generateOptions = React.useCallback(generateOptionsCallback, [
    options,
    value,
  ]);

  return (
    <div className={knobContainerStyle}>
      <label className={cx(labelStyle, { [labelDarkMode]: darkMode })}>
        {label}
      </label>
      {/* eslint-disable-next-line jsx-a11y/no-onchange */}
      <select onChange={handleChange}>{generateOptions()}</select>
    </div>
  );
}

export { Knob, Boolean, Text, Number, Select };
