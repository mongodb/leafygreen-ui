import React, { useRef, useState } from 'react';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { cx, css } from '@leafygreen-ui/emotion';
import { isComponentType } from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';
import InteractionRing from '@leafygreen-ui/interaction-ring';

/**
 * Styles
 */

const wrapperStyle = css`
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 2px;
  align-items: center;
  padding: 3px;
  border-radius: 6px;
  background-color: ${uiColors.gray.light3};
  box-shadow: 0px 1px 1px #e7eeec, 0px 1px 2px rgba(0, 0, 0, 0.3) inset;
`;

/**
 * Types
 */

const Size = {
  Small: 'small',
  Default: 'default',
  Large: 'large',
} as const;

type Size = typeof Size[keyof typeof Size];
export interface SegmentedControlProps {
  children: React.ReactNode;
  name?: string;
  size?: 'default';
  darkMode?: boolean;
  defaultValue?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

/**
 * Component
 */
const SegmentedControl = React.forwardRef(function SegmentedControl(
  {
    children,
    name: nameProp,
    size = Size.Default,
    darkMode = false,
    defaultValue = '',
    value: controlledValue,
    onChange,
    className,
  }: SegmentedControlProps,
  forwardedRef,
) {
  // If a value is given, then it's controlled
  let isControlled = controlledValue != null ? true : false;

  React.Children.forEach(children, (child, i) => {
    if (isComponentType(child, 'SegmentedControlOption')) {
      // If one of the options has been programatically checked, then it's controlled
      if (child.props.checked != null) {
        isControlled = true;
      }

      // If there's no default value given, then we fall back to the first option
      if (!defaultValue && i == 0) {
        defaultValue = child.props.value;
      }

      // TODO log warning if defaultValue is set but does not match any child value
    }
  });

  // Keep track of the uncontrolled value
  const [uncontrolledValue, setUncontrolledValue] = useState<string>(
    defaultValue,
  );

  const name = useIdAllocator({ prefix: 'radio-group', id: nameProp });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }

    if (!isControlled) {
      setUncontrolledValue(e.target.value);
    }
  };

  const renderedChildren = React.Children.map(children, (child, index) => {
    if (!isComponentType(child, 'SegmentedControlOption')) {
      console.warn(`${child} is not a SegmentedControlOption`);
      return child;
    }

    const _checked: boolean = isControlled
      ? child.props.value === controlledValue || !!child.props.checked
      : child.props.value === uncontrolledValue;

    const { value } = child.props;

    console.log({ value, _checked, uncontrolledValue });

    return React.cloneElement(child, {
      id: child.props.id || `${name}-${index}`,
      darkMode,
      size,
      _checked,
      _name: name,
      _onChange: handleChange,
    });
  });

  return (
    <InteractionRing>
      <div
        role="group"
        aria-label={name}
        ref={forwardedRef}
        className={cx(wrapperStyle, className)}
      >
        {renderedChildren}
      </div>
    </InteractionRing>
  );
});

export default SegmentedControl;
