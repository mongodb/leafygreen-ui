import React from 'react';
import { Knob, Boolean, Text, Area, Number, Select } from './Knobs';

const knobForControl = {
  'range': 'number'
}

const getKnobType: (control: any) => string = (control) => {
  let controlType: string;
  if(typeof control === 'object') {
    controlType = control.type;
  } else if (control === 'none' || !!!control) {
    controlType = 'none';
  } else {
    controlType = control;
  }
  return controlType in knobForControl ? knobForControl[controlType] : controlType;
}

interface NewKnobProps {
  value: any;
  onChange: (prop: any) => void;
  label?: string;
  propName: string;
  storyConfig: any;
  darkMode: boolean;
}


const NewKnob = ({ value, onChange, label, propName, storyConfig, darkMode }: NewKnobProps) => {

  const sharedProps = {
    onChange,
    propName,
    label: label || propName,
    prop: propName,
    key: propName,
    darkMode,
  };

  const knobType = getKnobType(storyConfig.control);

  switch (knobType) {
    case Knob.Boolean:
      return (
        <Boolean {...sharedProps} value={value} />
      );

    case Knob.Number:
      return (
        <Number
          {...sharedProps}
          value={value}
          min={storyConfig?.min}
          max={storyConfig?.max}
          // step={knobConfig?.step}
        />
      );

    case Knob.Text:
      return <Text {...sharedProps} value={value} />;

    case Knob.Area:
      return <Area {...sharedProps} value={value} />;

    case Knob.Select:
      return (
        <Select
          {...sharedProps}
          // isRequired={knobConfig?.isRequired}
          isRequired={true}
          options={storyConfig?.options as Array<string>}
          value={value}
          // Allows us to disable Select dropdown based on current component props
          // disabled={storyConfig.shouldDisable?.(props)}
        />
      );

    default:
      // enforceExhaustive(knobConfig);
      return <></>
  }
}

export default NewKnob;