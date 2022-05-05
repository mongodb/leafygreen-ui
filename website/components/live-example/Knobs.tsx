import React, { useCallback } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { spacing, breakpoints } from '@leafygreen-ui/tokens';
import { uiColors } from '@leafygreen-ui/palette';
import { useViewportSize, useIdAllocator } from '@leafygreen-ui/hooks';
import { Select as LGUISelect, Option } from '@leafygreen-ui/select';
import TextInput from '@leafygreen-ui/text-input';
import TextArea from '@leafygreen-ui/text-area';
import Toggle from '@leafygreen-ui/toggle';
import { mq } from 'utils/mediaQuery';
import { useBodyContainerRef } from '../LayoutContext';

const knobsWidth = 326; // totalWidth (700px) - padding on both sides (24px on each side) / 2

const knobContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;

  ${mq({
    padding: [
      `${spacing[3]}px ${spacing[4]}px`,
      `${spacing[3]}px ${spacing[5]}px`,
    ],
  })}
`;

const knobContainerHeight = css`
  min-height: 70px;
`;

const labelStyle = css`
  color: ${uiColors.gray.dark2};
  font-size: 16px;
  letter-spacing: 0;
  line-height: 20px;
  font-weight: 600;
`;

const textAreaClassName = css`
  display: flex;
  flex-direction: column;
`;

const inputClassName = css`
  ${mq({
    width: ['200px', `${knobsWidth}px`],
  })}
`;

const labelDarkMode = css`
  color: ${uiColors.gray.light1};
`;

interface KnobRowProps {
  children: React.ReactNode;
  darkMode?: boolean;
  className?: string;
}

function KnobRow({ children, className, darkMode = false }: KnobRowProps) {
  return (
    <div
      className={cx(
        knobContainerStyle,
        knobContainerHeight,
        css`
          border-top: 1px solid
            ${darkMode ? uiColors.gray.dark2 : uiColors.gray.light2};
        `,
        className,
      )}
    >
      {children}
    </div>
  );
}

const Knob = {
  Select: 'select',
  Number: 'number',
  Text: 'text',
  Area: 'area',
  Boolean: 'boolean',
} as const;

type Knob = typeof Knob[keyof typeof Knob];

interface KnobInterface {
  label: string;
  prop: string;
  darkMode: boolean;
  isRequired?: boolean;
}
export interface BooleanInterface extends KnobInterface {
  onChange: (prop: string, value: boolean) => void;
  value: boolean;
}

function Boolean({
  onChange,
  label,
  value,
  prop,
  darkMode,
  isRequired = false,
}: BooleanInterface) {
  const viewport = useViewportSize();
  const isTouchDevice =
    viewport !== null ? viewport.width < breakpoints.Tablet : false;

  const handleChange = () => {
    onChange(prop, !value);
  };

  const labelId = useIdAllocator({ prefix: 'boolean' });

  return (
    <KnobRow darkMode={darkMode}>
      <label
        id={labelId}
        className={cx(labelStyle, { [labelDarkMode]: darkMode })}
      >
        {label}
        {isRequired && '*'}
      </label>

      <Toggle
        onChange={handleChange}
        checked={value}
        size={isTouchDevice ? 'default' : 'small'}
        darkMode={darkMode}
        aria-labelledby={labelId}
      />
    </KnobRow>
  );
}

Boolean.displayName = 'Boolean';

export interface NumberInterface extends KnobInterface {
  onChange: (prop: string, value: number) => void;
  value: number;
  min?: number;
  max?: number;
  step?: number;
}

function Number({
  onChange,
  label,
  value,
  prop,
  darkMode,
  min,
  max,
  step,
  isRequired = false,
}: NumberInterface) {
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    onChange(prop, parseFloat(target.value));
  };

  const labelId = useIdAllocator({ prefix: 'number' });

  return (
    <KnobRow darkMode={darkMode}>
      <label
        className={cx(labelStyle, { [labelDarkMode]: darkMode })}
        id={labelId}
      >
        {label}
        {isRequired && '*'}
      </label>

      <TextInput
        type="number"
        onChange={handleChange}
        value={value.toString()}
        aria-labelledby={labelId}
        darkMode={darkMode}
        min={min}
        max={max}
        step={step}
        className={css`
          width: ${knobsWidth}px;
        `}
      />
    </KnobRow>
  );
}

Number.displayName = 'Number';

export interface TextInterface extends KnobInterface {
  onChange: (prop: string, value: string) => void;
  value: string;
}

function Text({
  onChange,
  label,
  value,
  prop,
  darkMode,
  isRequired = false,
}: TextInterface) {
  const handleChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      onChange(prop, target.value);
    },
    [prop, onChange],
  );

  const labelId = useIdAllocator({ prefix: 'text' });

  return (
    <KnobRow darkMode={darkMode}>
      <label
        className={cx(labelStyle, { [labelDarkMode]: darkMode })}
        id={labelId}
      >
        {label}
        {isRequired && '*'}
      </label>

      <TextInput
        onChange={handleChange}
        value={value}
        aria-labelledby={labelId}
        darkMode={darkMode}
        className={inputClassName}
      />
    </KnobRow>
  );
}

Text.displayName = 'Text';

function Area({
  onChange,
  label,
  value,
  prop,
  darkMode,
  isRequired = false,
}: TextInterface) {
  const handleChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(prop, target.value);
    },
    [onChange, prop],
  );

  const labelId = useIdAllocator({ prefix: 'area' });

  return (
    <KnobRow darkMode={darkMode}>
      <label
        className={cx(labelStyle, { [labelDarkMode]: darkMode })}
        id={labelId}
      >
        {label}
        {isRequired && '*'}
      </label>

      <TextArea
        onChange={handleChange}
        value={value}
        aria-labelledby={labelId}
        darkMode={darkMode}
        className={cx(textAreaClassName, inputClassName)}
      />
    </KnobRow>
  );
}

Area.displayName = 'Area';

export interface SelectInterface extends KnobInterface {
  onChange: (prop: string, value?: string) => void;
  value: string;
  options: Array<string>;
  disabled?: boolean;
}

function Select({
  onChange,
  label,
  value,
  prop,
  options,
  darkMode,
  disabled,
  isRequired = false,
}: SelectInterface) {
  const labelId = useIdAllocator({ prefix: 'select' });
  const container = useBodyContainerRef();

  const handleChange = (value: string) => {
    if (isRequired && value === '') {
      return;
    }

    onChange(prop, value === '' ? undefined : value);
  };

  const generateOptionsCallback = () => {
    return options.map(option => (
      <Option key={option} value={option}>
        {option}
      </Option>
    ));
  };

  const generateOptions = React.useCallback(generateOptionsCallback, [options]);

  return (
    <KnobRow darkMode={darkMode}>
      <label
        id={labelId}
        className={cx(labelStyle, { [labelDarkMode]: darkMode })}
      >
        {label}
        {isRequired && '*'}
      </label>

      <LGUISelect
        aria-labelledby={labelId}
        onChange={handleChange}
        darkMode={darkMode}
        value={value}
        disabled={disabled}
        className={inputClassName}
        portalContainer={container ?? undefined}
        scrollContainer={container ?? undefined}
      >
        {generateOptions()}
      </LGUISelect>
    </KnobRow>
  );
}

Select.displayName = 'Select';

export { Knob, Boolean, Text, Area, Number, Select };
