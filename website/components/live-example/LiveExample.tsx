// eslint complaining that we don't have propType definitions for LiveExample component
/* eslint react/prop-types: 0 */

import React, { useState } from 'react';
import { transparentize } from 'polished';
import { enforceExhaustive } from '@leafygreen-ui/lib';
import { cx, css } from '@leafygreen-ui/emotion';
import Card from '@leafygreen-ui/card';
import { spacing } from '@leafygreen-ui/tokens';
import { uiColors } from '@leafygreen-ui/palette';
import { Knob, Boolean, Text, Area, Number, Select } from './Knobs';
import { mq } from 'utils/mediaQuery';
import { pageContainerWidth } from 'styles/constants';

const baseBoxShadow = `0 4px 10px -4px ${transparentize(0.7, uiColors.black)}`;

const backdrop = css`
  background-color: ${uiColors.gray.light3};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

const previewStyle = css`
  display: flex;
  flex-direction: column;
  margin-top: ${spacing[4]}px;

  ${mq({
    boxShadow: ['none', baseBoxShadow],
    borderRadius: ['0px', '7px'],
    marginLeft: ['-24px', 'unset'],
    marginRight: ['-24px', 'unset'],
    width: [
      'inherit',
      'inherit',
      'inherit',
      `${pageContainerWidth.dataGraphic}px`,
    ],
  })}
`;

const componentContainer = css`
  padding: ${spacing[6]}px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  min-height: 400px;

  ${mq({
    padding: [`${spacing[4]}px`, `${spacing[6]}px`],
    minHeight: ['200px', '400px'],
  })}
`;

const componentContainerDarkMode = css`
  border-bottom: 1px solid ${uiColors.gray.dark2};
`;

interface SelectConfigInterface<T> {
  type: 'select';
  options: Array<T | undefined>;
  default: T;
  isRequired?: boolean;
  label: string;
  shouldDisable?: (props: any) => boolean;
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
  min?: number;
  max?: number;
  step?: number;
}

interface TextConfigInterface {
  type: 'text';
  options?: undefined;
  default: string;
  label: string;
}

interface AreaConfigInterface {
  type: 'area';
  options?: undefined;
  default: string;
  label: string;
}

export type PropsType<T = string> =
  | BooleanConfigInterface
  | NumberConfigInterface
  | TextConfigInterface
  | AreaConfigInterface
  | SelectConfigInterface<T>;

interface ComponentPropsInterface {
  darkMode?: boolean;
  isRequired?: boolean;
  [key: string]: unknown;
}

export type KnobsConfigInterface<
  ComponentProps extends ComponentPropsInterface,
> = {
  [K in keyof ComponentProps]: Extract<
    PropsType<ComponentProps[K]>,
    {
      default: ComponentProps[K];
    }
  >;
};

interface LiveExampleInterface<ComponentProps extends ComponentPropsInterface> {
  knobsConfig: KnobsConfigInterface<ComponentProps>;
  children: (props: ComponentProps) => JSX.Element;
}

function LiveExample<ComponentProps extends ComponentPropsInterface>({
  knobsConfig,
  children,
}: LiveExampleInterface<ComponentProps>) {
  const initialProps = Object.keys(knobsConfig).reduce(
    (acc: Partial<ComponentProps>, val) => {
      const value = val as keyof ComponentProps;

      acc[value] = knobsConfig[value].default;

      return acc;
    },
    {},
  ) as ComponentProps;

  const [props, setProps] = useState<ComponentProps>(initialProps);

  const onChange = <T extends PropsType['default']>(
    prop: string,
    value?: T,
  ) => {
    setProps({ ...props, [prop]: value });
  };

  const renderKnobs = () => {
    if (!Object.keys(knobsConfig).length) {
      return null;
    }

    const knobs = Object.entries(knobsConfig).map(entry => {
      const propName = entry[0] as string;
      const knobConfig = entry[1] as PropsType;

      const sharedProps = {
        onChange,
        propName,
        label: knobConfig.label,
        prop: propName,
        key: propName,
        darkMode: !!props.darkMode,
      };

      switch (knobConfig.type) {
        case Knob.Boolean:
          return (
            <Boolean {...sharedProps} value={props[propName] as boolean} />
          );

        case Knob.Number:
          return (
            <Number
              {...sharedProps}
              value={props[propName] as number}
              min={knobConfig?.min}
              max={knobConfig?.max}
              step={knobConfig?.step}
            />
          );

        case Knob.Text:
          return <Text {...sharedProps} value={props[propName] as string} />;

        case Knob.Area:
          return <Area {...sharedProps} value={props[propName] as string} />;

        case Knob.Select:
          return (
            <Select
              {...sharedProps}
              isRequired={knobConfig?.isRequired}
              options={knobConfig?.options as Array<string>}
              value={props[propName] as string}
              // Allows us to disable Select dropdown based on current component props
              disabled={knobConfig.shouldDisable?.(props)}
            />
          );

        default:
          enforceExhaustive(knobConfig);
      }
    });

    return <div>{knobs}</div>;
  };

  return (
    <div>
      <div className={backdrop} />
      <Card
        darkMode={props?.darkMode}
        className={cx(previewStyle, {
          [css`
            background-color: ${uiColors.gray.dark3};
          `]: !!props.darkMode,
        })}
      >
        <div
          className={cx(componentContainer, {
            [componentContainerDarkMode]: !!props.darkMode,
          })}
        >
          {children(props)}
        </div>

        {renderKnobs()}
      </Card>
    </div>
  );
}

LiveExample.displayName = 'LiveExample';

export default LiveExample;
