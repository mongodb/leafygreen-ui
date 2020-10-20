import React, { useState } from 'react';
import Toggle from '@leafygreen-ui/toggle';
import TextInput from '@leafygreen-ui/text-input';
import { GridContainer, GridItem } from 'components/Grid';
import { enforceExhaustive } from '@leafygreen-ui/lib/dist';

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

interface BooleanKnobInterface extends KnobInterface {
  onChange: (value: boolean, prop: string) => void;
  value: boolean;
}

interface TextKnobInterface extends KnobInterface {
  onChange: (value: string, prop: string) => void;
  value: string;
}

interface NumberKnobInterface extends KnobInterface {
  onChange: (value: number, prop: string) => void;
  value: number;
}

interface SelectKnobInterface extends KnobInterface {
  onChange: (value: string, prop: string) => void;
  value: string;
  options: Array<string>;
}

function BooleanKnob({ onChange, label, value, prop }: BooleanKnobInterface) {
  const handleChange = () => {
    onChange(!value, prop);
  };

  return (
    <>
      <label>{label}</label>
      <Toggle onChange={handleChange} value={value.toString()} />
    </>
  );
}

function NumberKnob({ onChange, label, value, prop }: NumberKnobInterface) {
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(target.value), prop);
  };

  return (
    <TextInput
      type="number"
      onChange={handleChange}
      label={label}
      value={value.toString()}
    />
  );
}

function TextKnob({ onChange, label, value, prop }: TextKnobInterface) {
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    onChange(target.value, prop);
  };

  return (
    <TextInput onChange={handleChange} label={label} value={value.toString()} />
  );
}

function SelectKnob({}: SelectKnobInterface) {
  return <div>select</div>;
}

interface SelectConfigInterface {
  type: 'select';
  options: Array<unknown>;
  default: string;
  label: string;
}

interface BooleanConfigInterface {
  type: 'boolean';
  options?: undefined;
  default: boolean;
  label: string;
}

interface NumberConfigInterface {
  type: 'number';
  options?: undefined;
  default: number;
  label: string;
}

interface TextConfigInterface {
  type: 'text';
  options?: undefined;
  default: string;
  label: string;
}

type PropsType =
  | SelectConfigInterface
  | BooleanConfigInterface
  | NumberConfigInterface
  | TextConfigInterface;

interface LiveExampleInterface {
  component: React.ElementType;
  props: { [key: string]: PropsType };
}

function LiveExample({
  component: Component,
  props: propsProp,
}: LiveExampleInterface) {
  const initialProps = Object.keys(propsProp).reduce((acc, val) => {
    acc[val] = propsProp[val].default;
    return { ...acc };
  }, {});

  const [props, setProps] = useState(initialProps);

  const onChange = (value, prop) => {
    setProps({ ...props, [prop]: value });
  };

  const renderKnobs = () => {
    return Object.entries(propsProp).map(([propName, knobConfig]) => {
      const sharedProps = {
        onChange,
        propName,
        value: props[propName],
        label: knobConfig.label,
        prop: propName,
      };

      switch (knobConfig.type) {
        case KnobType.Boolean:
          return <BooleanKnob {...sharedProps} />;
        case KnobType.Number:
          return <NumberKnob {...sharedProps} />;
        case KnobType.Text:
          return <TextKnob {...sharedProps} />;
        case KnobType.Select:
          return <SelectKnob {...sharedProps} options={knobConfig.options} />;
        default:
          enforceExhaustive(knobConfig);
      }
    });
  };

  return (
    <GridContainer>
      <GridItem sm={12} md={12} lg={12} xl={12}>
        <Component {...props} />
        <div>{renderKnobs()}</div>
      </GridItem>
    </GridContainer>
  );
}

LiveExample.displayName = 'LiveExample';

export default LiveExample;
