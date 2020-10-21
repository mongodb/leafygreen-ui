import React, { useState } from 'react';
import { enforceExhaustive } from '@leafygreen-ui/lib';
import { css } from '@leafygreen-ui/emotion';
import Card from '@leafygreen-ui/card';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import { spacing } from '@leafygreen-ui/tokens';
import { uiColors } from '@leafygreen-ui/palette';
import {
  KnobType,
  BooleanKnob,
  TextKnob,
  NumberKnob,
  SelectKnob,
  BooleanKnobInterface,
  TextKnobInterface,
  NumberKnobInterface,
  BasicSelectKnobInterface,
  GlyphSelectKnobInterface,
} from './Knobs';

const previewStyle = css`
  display: flex;
  flex-direction: column;
  padding-top: ${spacing[3]}px;
  margin-top: 56px;
`;

const componentContainer = css`
  border-bottom: 1px solid ${uiColors.gray.light2};
  padding: ${spacing[4]}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const knobContainer = css`
  padding-left: ${spacing[4]}px;
  padding-right: ${spacing[4]}px;
  padding-top: 42px;
`;

interface SelectConfigInterface {
  type: 'select';
  options: Array<string | undefined>;
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
  | BooleanConfigInterface
  | NumberConfigInterface
  | TextConfigInterface
  | SelectConfigInterface;

interface KnobsConfigInterface {
  [key: string]: PropsType;
}

interface LiveExampleInterface {
  knobsConfig: KnobsConfigInterface;
  children: (props: { [key: string]: unknown }) => JSX.Element;
}

function LiveExample({ knobsConfig, children }: LiveExampleInterface) {
  const initialProps = Object.keys(knobsConfig).reduce((acc, val) => {
    if (val === 'glyph') {
      acc[val] = (
        <Icon glyph={knobsConfig[val].default as keyof typeof glyphs} />
      );
    } else {
      acc[val] = knobsConfig[val].default;
    }

    return { ...acc };
  }, {} as { [key: string]: unknown });

  const [props, setProps] = useState(initialProps);

  const onChange = (value: PropsType['default'], prop: string) => {
    if (prop === 'glyph') {
      setProps({
        ...props,
        [prop]: <Icon glyph={value as keyof typeof glyphs} />,
      });
    } else {
      setProps({ ...props, [prop]: value });
    }
  };

  const renderKnobs = () => {
    return Object.entries(knobsConfig).map(([propName, knobConfig]) => {
      const sharedProps = {
        onChange,
        propName,
        value: props[propName],
        label: knobConfig.label,
        prop: propName,
        key: propName,
        options: knobConfig?.options,
      };

      switch (knobConfig.type) {
        case KnobType.Boolean:
          return <BooleanKnob {...(sharedProps as BooleanKnobInterface)} />;
        case KnobType.Number:
          return <NumberKnob {...(sharedProps as NumberKnobInterface)} />;
        case KnobType.Text:
          return <TextKnob {...(sharedProps as TextKnobInterface)} />;
        case KnobType.Select:
          return (
            <SelectKnob
              {...(sharedProps as
                | BasicSelectKnobInterface
                | GlyphSelectKnobInterface)}
            />
          );
        default:
          enforceExhaustive(knobConfig);
      }
    });
  };

  return (
    <div>
      <Card className={previewStyle}>
        <div className={componentContainer}>{children(props)}</div>
        <div className={knobContainer}>{renderKnobs()}</div>
      </Card>
    </div>
  );
}

LiveExample.displayName = 'LiveExample';

export default LiveExample;
