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

const labelDarkMode = css`
  color: ${uiColors.gray.light1};
`;

const KnobType = {
  Select: 'select',
  Number: 'number',
  Text: 'text',
  Boolean: 'boolean',
} as const;

type KnobType = typeof KnobType[keyof typeof KnobType];

interface KnobInterface {
  label: string;
  prop: string;
  darkMode: boolean;
}

export interface BooleanKnobInterface extends KnobInterface {
  onChange: (value: boolean, prop: string) => void;
  value: boolean;
}

export interface TextKnobInterface extends KnobInterface {
  onChange: (value: string, prop: string) => void;
  value: string;
}

export interface NumberKnobInterface extends KnobInterface {
  onChange: (value: number, prop: string) => void;
  value: number;
}

export interface BasicSelectKnobInterface extends KnobInterface {
  onChange: (value: string, prop: string) => void;
  value: string;
  options: Array<string>;
}

export interface GlyphSelectKnobInterface {
  onChange: (value: string, prop: string) => void;
  value: React.ReactElement;
  options: Array<string>;
  label: string;
  prop: 'glyph';
  darkMode: boolean;
}

function BooleanKnob({
  onChange,
  label,
  value,
  prop,
  darkMode,
}: BooleanKnobInterface) {
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

function NumberKnob({
  onChange,
  label,
  value,
  prop,
  darkMode,
}: NumberKnobInterface) {
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

function TextKnob({
  onChange,
  label,
  value,
  prop,
  darkMode,
}: TextKnobInterface) {
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
        className={css`
          flex-grow: 1;
        `}
      />
    </div>
  );
}

function SelectKnob({
  onChange,
  label,
  value,
  prop,
  options,
  darkMode,
}: BasicSelectKnobInterface | GlyphSelectKnobInterface) {
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

export { KnobType, BooleanKnob, TextKnob, NumberKnob, SelectKnob };
