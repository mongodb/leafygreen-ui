import React, { useState } from 'react';
import { enforceExhaustive } from '@leafygreen-ui/lib';
import { cx, css } from '@leafygreen-ui/emotion';
import Card from '@leafygreen-ui/card';
import { spacing } from '@leafygreen-ui/tokens';
import { uiColors } from '@leafygreen-ui/palette';
import {
  KnobType,
  BooleanKnob,
  TextKnob,
  NumberKnob,
  SelectKnob,
} from './Knobs';

const previewStyle = css`
  display: flex;
  flex-direction: column;
  margin-top: ${spacing[5]}px;
`;

const componentContainer = css`
  border-bottom: 1px solid ${uiColors.gray.light2};
  padding: ${spacing[6]}px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

const componentContainerDarkMode = css`
  border-bottom: 1px solid ${uiColors.gray.dark2};
`;

const knobContainer = css`
  padding-left: ${spacing[4]}px;
  padding-right: ${spacing[4]}px;
  padding-top: 42px;
`;

interface SelectConfigInterface<T> {
  type: 'select';
  options: Array<T | undefined>;
  default: T;
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

export type PropsType<T = string> =
  | BooleanConfigInterface
  | NumberConfigInterface
  | TextConfigInterface
  | SelectConfigInterface<T>;

interface ComponentPropsInterface {
  darkMode?: boolean;
  [key: string]: unknown;
}

export type KnobsConfigInterface<
  ComponentProps extends ComponentPropsInterface
> = {
  [K in keyof ComponentProps]: Extract<
    PropsType<ComponentProps[K]>,
    { default: ComponentProps[K] }
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

  const onChange = <T extends PropsType['default']>(value: T, prop: string) => {
    setProps({ ...props, [prop]: value });
  };

  const renderKnobs = () => {
    return Object.entries(knobsConfig).map(entry => {
      const propName = entry[0] as string;
      const knobConfig = entry[1] as KnobsConfigInterface<
        ComponentProps
      >[keyof ComponentProps];

      const sharedProps = {
        onChange,
        propName,
        label: knobConfig.label,
        prop: propName,
        key: propName,
        options: knobConfig?.options,
        darkMode: !!props.darkMode,
      };

      switch (knobConfig.type) {
        case KnobType.Boolean:
          return (
            <BooleanKnob {...sharedProps} value={props[propName] as boolean} />
          );
        case KnobType.Number:
          return (
            <NumberKnob {...sharedProps} value={props[propName] as number} />
          );
        case KnobType.Text:
          return (
            <TextKnob {...sharedProps} value={props[propName] as string} />
          );
        case KnobType.Select:
          return (
            <SelectKnob
              {...sharedProps}
              options={knobConfig?.options as Array<string>}
              value={props[propName] as string}
            />
          );
        default:
          enforceExhaustive(knobConfig.type);
      }
    });
  };

  return (
    <div>
      <Card
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
        {Object.keys(knobsConfig).length > 0 && (
          <div className={knobContainer}>{renderKnobs()}</div>
        )}
      </Card>
    </div>
  );
}

LiveExample.displayName = 'LiveExample';

export default LiveExample;
