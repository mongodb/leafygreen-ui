import React, { useEffect, useState } from 'react';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { cx, css } from '@leafygreen-ui/emotion';
import { createDataProp, isComponentType } from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';
import InteractionRing from '@leafygreen-ui/interaction-ring';
import useDynamicRefs from './useDynamicRefs';
import { Size, Mode } from './types';
import { Overline } from '@leafygreen-ui/typography';

const selectionIndicatorDataAttr = createDataProp('selection-indicator');

/**
 * Styles
 */

const wrapperStyle = css`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const labelStyle: {
  [key in Mode]: string;
} = {
  light: css`
    color: ${uiColors.gray.dark1};
  `,
  dark: css`
    color: ${uiColors.gray.light1};
  `,
};

// The border color is slightly different from the base gray for accessibility reasons
const selectionBorderColor = '#869499';

const frameStyleFromSize: {
  [key in Size]: string;
} = {
  small: css`
    --segment-gap: 1px;
    --padding: 0px;
    --radius: 4px;
  `,
  default: css`
    --segment-gap: 5px;
    --padding: 3px;
    --radius: 6px;
  `,
  large: css`
    --segment-gap: 5px;
    --padding: 3px;
    --radius: 6px;
  `,
};

const frameStyleFromMode: {
  [key in Mode]: string;
} = {
  light: css`
    --background-color: ${uiColors.gray.light3}; // color
    --border-color: transparent; // color
    --border-width: 0px;
    --inner-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3) inset; // color
    --outer-shadow: 0px 1px 1px #e7eeec;
  `,
  dark: css`
    --background-color: ${uiColors.gray.dark3}; // color
    --border-color: ${uiColors.gray.dark1}; // color: ;
    --border-width: 1px;
    --inner-shadow: unset;
    --outer-shadow: unset;
  `,
};

const frameStyleBase = css`
  position: relative;
  display: grid;
  padding: var(--padding);
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: var(--segment-gap);
  align-items: center;
  background-color: var(--background-color);
  border-width: var(--border-width);
  border-style: solid;
  border-radius: var(--radius);
  border-color: var(--border-color);

  &:after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    border-radius: var(--radius);
    box-shadow: var(--inner-shadow), var(--outer-shadow);
    z-index: 2;
    pointer-events: none;
  }
`;

const indicatorStyleFromSize: {
  [key in Size]: string;
} = {
  small: css`
    --indicator-height: 100%;
  `,
  default: css`
    --indicator-height: calc(100% - 2 * var(--padding));
  `,
  large: css`
    --indicator-height: calc(100% - 2 * var(--padding));
  `,
};

const indicatorStyleFromMode: {
  [key in Mode]: string;
} = {
  light: css`
    --indicator-background-color: ${uiColors.gray.light2}; // color
    --indicator-border-color: ${selectionBorderColor}; // color
  `,
  dark: css`
    --indicator-background-color: ${uiColors.gray.dark1}; // color
    --indicator-border-color: ${uiColors.gray.base}; // color
  `,
};

const selectionIndicatorBase = css`
  position: absolute;
  height: var(--indicator-height);
  /* TODO - fix the shadow overhang over the frame */
  box-shadow: 0px 1px 2px rgba(6, 22, 33, 0.3);
  transition: transform 150ms ease-in-out;
  z-index: 0;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  background-color: var(--indicator-background-color);
  border-color: var(--indicator-border-color);
`;

const interactionRingStyle = css`
  z-index: 3;
`;

/**
 * Types
 */
export interface SegmentedControlProps {
  children: React.ReactNode;
  name?: string;
  size?: Size;
  darkMode?: boolean;
  defaultValue?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  label?: string;
}

/**
 * Component
 */
const SegmentedControl = React.forwardRef(function SegmentedControl(
  {
    children,
    name: nameProp,
    size = 'default',
    darkMode = false,
    defaultValue = '',
    value: controlledValue,
    onChange,
    className,
    label,
  }: SegmentedControlProps,
  forwardedRef,
) {
  // TODO log warning if defaultValue is set but does not match any child value

  const [getRef, setRef] = useDynamicRefs<HTMLInputElement>();

  const mode = darkMode ? 'dark' : 'light';

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
    }
  });

  // Keep track of the uncontrolled value
  const [uncontrolledValue, setUncontrolledValue] = useState<string>(
    defaultValue,
  );

  const name = useIdAllocator({ prefix: 'radio-group', id: nameProp });

  // Change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }

    if (!isControlled) {
      setUncontrolledValue(e.target.value);
    }
  };

  // Add internal props to children passed in
  const renderedChildren = React.Children.map(children, (child, index) => {
    if (!isComponentType(child, 'SegmentedControlOption')) {
      console.warn(`${child} is not a SegmentedControlOption`);
      return child;
    }

    const _checked: boolean = isControlled
      ? child.props.value === controlledValue || !!child.props.checked
      : child.props.value === uncontrolledValue;

    return React.cloneElement(child, {
      id: child.props.id || `${name}-${index}`,
      darkMode,
      size,
      _checked,
      _name: name,
      _onChange: handleChange,
      ref: setRef(`${name}-${index}`),
    });
  });

  const selectedIndex = React.Children.toArray(
    renderedChildren,
  ).findIndex(child =>
    isControlled
      ? (child as React.ReactElement).props.value === controlledValue
      : (child as React.ReactElement).props.value === uncontrolledValue,
  );

  /**
   * Dynamically set the size & position of the selection indicator
   */
  const [selectionStyleDynamic, setSelectionStyleDynamic] = useState<string>();

  // Update dynamic styles of the selection indicator
  useEffect(() => {
    const selectedElement = (getRef(
      `${name}-${selectedIndex}`,
    ) as React.RefObject<HTMLInputElement>).current;

    if (selectedElement) {
      const { offsetWidth: width, offsetLeft: left } = selectedElement;
      setSelectionStyleDynamic(css`
        width: ${width}px;
        transform: translateX(${left}px);
      `);
    }
  }, [selectedIndex, getRef, name, renderedChildren]);

  /**
   * TODO
   * - remove hover focus ring
   */

  return (
    <div className={cx(wrapperStyle)}>
      <Overline className={cx(labelStyle[mode])}>{label}</Overline>

      <InteractionRing
        darkMode={darkMode}
        borderRadius={size == 'small' ? '4px' : '6px'}
        className={interactionRingStyle}
      >
        <div
          role="group"
          aria-label={name}
          className={cx(
            frameStyleBase,
            frameStyleFromSize[size],
            frameStyleFromMode[mode],
            className,
          )}
          ref={forwardedRef}
        >
          {renderedChildren}
          <div
            {...selectionIndicatorDataAttr.prop}
            className={cx(
              selectionIndicatorBase,
              indicatorStyleFromSize[size],
              indicatorStyleFromMode[mode],
              selectionStyleDynamic,
            )}
          />
        </div>
      </InteractionRing>
    </div>
  );
});

export default SegmentedControl;
