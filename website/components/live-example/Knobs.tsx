import React, { useCallback, useMemo } from 'react';
import { IdAllocator } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import { uiColors } from '@leafygreen-ui/palette';
import { Select as LGUISelect, Option } from '@leafygreen-ui/select';
import TextInput from '@leafygreen-ui/text-input';
import TextArea from '@leafygreen-ui/text-area';
import Toggle from '@leafygreen-ui/toggle';
import { mq } from 'utils/mediaQuery';

const booleanIdAllocator = IdAllocator.create('boolean');
const textIdAllocator = IdAllocator.create('text');
const areaIdAllocator = IdAllocator.create('area');
const numberIdAllocator = IdAllocator.create('number');
const selectIdAllocator = IdAllocator.create('select');

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
  height: 71px;
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
  width: ${knobsWidth}px;

  ${mq({
    width: ['200px', `${knobsWidth}px`],
  })}
`;

const textClassName = css`
  ${mq({
    width: ['200px', `${knobsWidth}px`],
  })}
`;

const labelDarkMode = css`
  color: ${uiColors.gray.light1};
`;

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
  min?: number;
  max?: number;
  step?: number;
}

export interface SelectInterface extends KnobInterface {
  onChange: (value: string, prop: string) => void;
  value: string;
  options: Array<string>;
  disabled?: boolean;
}

function Boolean({ onChange, label, value, prop, darkMode }: BooleanInterface) {
  const handleChange = () => {
    onChange(!value, prop);
  };

  const labelId = useMemo(() => booleanIdAllocator.generate(), []);

  return (
    <div
      className={cx(
        knobContainerStyle,
        knobContainerHeight,
        css`
          border-bottom: 1px solid
            ${darkMode ? uiColors.gray.dark2 : uiColors.gray.light2};
        `,
      )}
    >
      <label
        id={labelId}
        className={cx(labelStyle, { [labelDarkMode]: darkMode })}
      >
        {label}
      </label>
      <Toggle
        onChange={handleChange}
        checked={value}
        size="small"
        darkMode={darkMode}
        aria-labelledby={labelId}
      />
    </div>
  );
}

Boolean.displayName = 'Boolean';

function Number({
  onChange,
  label,
  value,
  prop,
  darkMode,
  min,
  max,
  step,
}: NumberInterface) {
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(target.value), prop);
  };

  const labelId = useMemo(() => numberIdAllocator.generate(), []);

  return (
    <div
      className={cx(
        knobContainerStyle,
        knobContainerHeight,
        css`
          border-bottom: 1px solid
            ${darkMode ? uiColors.gray.dark2 : uiColors.gray.light2};
        `,
      )}
    >
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
        min={min}
        max={max}
        step={step}
        className={css`
          width: ${knobsWidth}px;
        `}
      />
    </div>
  );
}

Number.displayName = 'Number';

function Text({ onChange, label, value, prop, darkMode }: TextInterface) {
  const handleChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      onChange(target.value, prop);
    },
    [prop, onChange],
  );

  const labelId = useMemo(() => textIdAllocator.generate(), []);

  return (
    <div
      className={cx(
        knobContainerStyle,
        knobContainerHeight,
        css`
          border-bottom: 1px solid
            ${darkMode ? uiColors.gray.dark2 : uiColors.gray.light2};
        `,
      )}
    >
      <label
        className={cx(labelStyle, { [labelDarkMode]: darkMode })}
        id={labelId}
      >
        {label}
      </label>
      <TextInput
        onChange={handleChange}
        value={value}
        aria-labelledby={labelId}
        darkMode={darkMode}
        className={textClassName}
      />
    </div>
  );
}

Text.displayName = 'Text';

function Area({ onChange, label, value, prop, darkMode }: TextInterface) {
  const handleChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(target.value, prop);
    },
    [onChange, prop],
  );

  const labelId = useMemo(() => areaIdAllocator.generate(), []);

  return (
    <div
      className={cx(
        knobContainerStyle,
        css`
          border-bottom: 1px solid
            ${darkMode ? uiColors.gray.dark2 : uiColors.gray.light2};
        `,
      )}
    >
      <label
        className={cx(labelStyle, { [labelDarkMode]: darkMode })}
        id={labelId}
      >
        {label}
      </label>
      <TextArea
        onChange={handleChange}
        value={value}
        aria-labelledby={labelId}
        darkMode={darkMode}
        className={textAreaClassName}
      />
    </div>
  );
}

Area.displayName = 'Area';

function Select({
  onChange,
  label,
  value,
  prop,
  options,
  darkMode,
  disabled,
}: SelectInterface) {
  const labelId = useMemo(() => selectIdAllocator.generate(), []);

  const handleChange = (value: string) => {
    onChange(value, prop);
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
    <div
      className={cx(
        knobContainerStyle,
        knobContainerHeight,
        css`
          border-bottom: 1px solid
            ${darkMode ? uiColors.gray.dark2 : uiColors.gray.light2};
        `,
      )}
    >
      <label
        id={labelId}
        className={cx(labelStyle, { [labelDarkMode]: darkMode })}
      >
        {label}
      </label>
      <LGUISelect
        aria-labelledby={labelId}
        onChange={handleChange}
        darkMode={darkMode}
        value={value}
        disabled={disabled}
      >
        {generateOptions()}
      </LGUISelect>
    </div>
  );
}

Select.displayName = 'Select';

export { Knob, Boolean, Text, Area, Number, Select };
