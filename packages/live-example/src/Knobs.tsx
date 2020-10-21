import React from 'react';
import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { uiColors } from '@leafygreen-ui/palette';
import TextInput from '@leafygreen-ui/text-input';
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
}

function BooleanKnob({ onChange, label, value, prop }: BooleanKnobInterface) {
  const handleChange = () => {
    onChange(!value, prop);
  };

  return (
    <div className={knobContainerStyle}>
      <label className={labelStyle}>{label}</label>
      <Toggle onChange={handleChange} value={value.toString()} size="small" />
    </div>
  );
}

function NumberKnob({ onChange, label, value, prop }: NumberKnobInterface) {
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(target.value), prop);
  };

  const labelId = `${label}-id`;

  return (
    <div className={knobContainerStyle}>
      <label className={labelStyle} id={labelId}>
        {label}
      </label>
      <TextInput
        type="number"
        onChange={handleChange}
        value={value.toString()}
        aria-labelledby={labelId}
      />
    </div>
  );
}

function TextKnob({ onChange, label, value, prop }: TextKnobInterface) {
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    onChange(target.value, prop);
  };

  const labelId = `${label}-id`;

  return (
    <div className={knobContainerStyle}>
      <label className={labelStyle} id={labelId}>
        {label}
      </label>
      <TextInput
        onChange={handleChange}
        value={value.toString()}
        aria-labelledby={labelId}
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
}: BasicSelectKnobInterface | GlyphSelectKnobInterface) {
  const normalizedValue =
    prop === 'glyph' ? (value as React.ReactElement).props.glyph : value;

  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(target.value, prop);
  };

  const generateOptions = () => {
    return options.map(option => (
      <option key={option} value={option} selected={option === normalizedValue}>
        {option}
      </option>
    ));
  };

  return (
    <div className={knobContainerStyle}>
      <label className={labelStyle}>{label}</label>
      {/* eslint-disable-next-line */}
      <select onChange={handleChange}>{generateOptions()}</select>
    </div>
  );
}

export { KnobType, BooleanKnob, TextKnob, NumberKnob, SelectKnob };
