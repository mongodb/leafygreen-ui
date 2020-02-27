import React, { useContext } from 'react';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import valueContext, { ValueContextProps } from './valueContext';

export type OptionProps<OptionT> =
  | {
      value: OptionT;
      children: React.ReactNode;
    }
  | {
      value?: undefined;
      children: OptionT & React.ReactNode;
    };

export default function Option<OptionT>(props: OptionProps<OptionT>) {
  const { children } = props;
  const value: OptionT = props.value ?? (props.children as OptionT);

  const context: ValueContextProps<OptionT> = useContext(valueContext);
  const {
    value: selectedValue,
    valueIsEqual,
    highlightedValue,
    getItemProps,
    selectedOptionRef,
  } = context;

  const isHighlighted =
    highlightedValue != null && valueIsEqual(value, highlightedValue);
  const isSelected =
    selectedValue != null && valueIsEqual(value, selectedValue);

  return (
    <div
      {...getItemProps({
        item: value,
        ref: isSelected ? selectedOptionRef : undefined,
        className: css`
          ${isHighlighted &&
            css`
              background: ${uiColors.blue.light2};
            `}
        `,
      })}
    >
      {children}
    </div>
  );
}
