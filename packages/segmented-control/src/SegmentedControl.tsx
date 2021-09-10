import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { cx, css } from '@leafygreen-ui/emotion';
import { createDataProp, isComponentType } from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';
import InteractionRing from '@leafygreen-ui/interaction-ring';
import { Overline } from '@leafygreen-ui/typography';
import useDynamicRefs from './useDynamicRefs';
import { Size, Mode } from './types';

const selectionIndicatorDataAttr = createDataProp('selection-indicator');

/**
 * Styles
 */
const wrapperStyle = css`
  display: flex;
  gap: 8px;
  align-items: center;
  z-index: 0;
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
    --background-color: ${uiColors.gray.light3};
    --border-color: transparent;
    --border-width: 0px;
    --inner-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3) inset;
    --outer-shadow: 0px 1px 1px #e7eeec;
  `,
  dark: css`
    --background-color: ${uiColors.gray.dark3};
    --border-color: ${uiColors.gray.dark1};
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
  border-radius: var(--radius);
  border-width: var(--border-width);
  border-style: solid;
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

  &:focus {
    outline: none;
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
    --indicator-background-color: ${uiColors.gray.light2};
    --indicator-border-color: ${selectionBorderColor};
  `,
  dark: css`
    --indicator-background-color: ${uiColors.gray.dark1};
    --indicator-border-color: ${uiColors.gray.base};
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
  onChange?: (value: string) => void;
  className?: string;
  label?: string;
}

/**
 * Component
 */
const SegmentedControl = React.forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>(function SegmentedControl(
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
    ...rest
  }: SegmentedControlProps,
  forwardedRef,
) {
  // TODO log warning if defaultValue is set but does not match any child value

  const [getRef, setRef] = useDynamicRefs<HTMLInputElement>();

  const mode = darkMode ? 'dark' : 'light';

  const name = useIdAllocator({ prefix: 'segmented-control', id: nameProp });

  // If a value is given, then it's controlled
  const [isControlled, setIsControlled] = useState(controlledValue != null);

  useEffect(() => {
    setIsControlled(controlledValue != null);
  }, [controlledValue]);

  // Keep track of the value internally
  const [internalValue, setInternalValue] = useState<string>(defaultValue);

  // Run through the children and determine whether this is controlled,
  // and update the default value if needed
  useEffect(() => {
    React.Children.forEach(children, (child, index) => {
      if (isComponentType(child, 'SegmentedControlOption')) {
        // If one of the options has been programatically checked, then it's controlled
        if (child.props.checked != null) {
          setIsControlled(true);
        }

        // If there's no default value given, then we fall back to the first option
        if (!defaultValue && index === 0) {
          setInternalValue(child.props.value);

          // TODO Potential bug: if `defaultValue` is changed to be falsy between renders,
          // then the value of the control will change
        }
      }
    });
  }, [children, defaultValue]);

  const updateValue = useCallback(
    (value: string) => {
      setInternalValue(value);
      onChange?.(value);
    },
    [onChange],
  );

  // Fires a click event on the selected index
  // Used to ensure native click default events fire when using keyboard navigation
  const simulateClickOnIndex = (index: number) => {
    const ref = getRef(`${name}-${index}`);

    if (ref && ref.current) {
      ref.current.click();
    }
  };

  // Add internal props to children passed in
  const renderedChildren = useMemo(
    () =>
      React.Children.map(children, (child, index) => {
        if (!isComponentType(child, 'SegmentedControlOption')) {
          console.warn(`${child} is not a SegmentedControlOption`);
          return child;
        }

        const _checked: boolean = isControlled
          ? child.props.value === controlledValue || !!child.props.checked
          : child.props.value === internalValue;

        return React.cloneElement(child, {
          id: child.props.id || `${name}-${index}`,
          darkMode,
          size,
          _checked,
          _name: name,
          _onClick: updateValue,
          ref: setRef(`${name}-${index}`),
        });
      }),
    [
      children,
      isControlled,
      controlledValue,
      internalValue,
      name,
      darkMode,
      size,
      updateValue,
      setRef,
    ],
  );

  const selectedIndex = useMemo(
    () =>
      (React.Children.toArray(
        renderedChildren,
      ) as Array<React.ReactElement>).findIndex(child =>
        isControlled
          ? child.props.value === controlledValue
          : child.props.value === internalValue,
      ),
    [controlledValue, isControlled, renderedChildren, internalValue],
  );

  const setSelectedIndex = (newIndex: number): void => {
    const children = React.Children.toArray(renderedChildren);
    const length = children.length;
    newIndex =
      newIndex >= length
        ? newIndex % length
        : newIndex < 0
        ? length + newIndex
        : newIndex;
    simulateClickOnIndex(newIndex);
  };

  /**
   * Handle keyboard navigation
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // Note: Arrow keys don't fire a keyPress event
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        setSelectedIndex(selectedIndex + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        setSelectedIndex(selectedIndex - 1);
        break;
      default:
        break;
    }
  };

  /**
   * Dynamically set the size & position of the selection indicator
   */
  const [selectionStyleDynamic, setSelectionStyleDynamic] = useState<string>();

  // Update dynamic styles of the selection indicator
  useEffect(() => {
    const selectedRef = getRef(`${name}-${selectedIndex}`);

    if (selectedRef && selectedRef.current) {
      const selectedElement = selectedRef.current;
      const { offsetWidth: width, offsetLeft: left } = selectedElement;
      setSelectionStyleDynamic(css`
        width: ${width}px;
        transform: translateX(${left}px);
      `);
    }
  }, [selectedIndex, getRef, name, renderedChildren]);

  /**
   * Return
   */

  return (
    <div className={cx(wrapperStyle, className)} {...rest}>
      {label && <Overline className={labelStyle[mode]}>{label}</Overline>}
      <InteractionRing
        darkMode={darkMode}
        borderRadius={size == 'small' ? '4px' : '6px'}
        className={interactionRingStyle}
      >
        <div
          role="radiogroup"
          aria-label={name}
          tabIndex={0}
          className={cx(
            frameStyleBase,
            frameStyleFromSize[size],
            frameStyleFromMode[mode],
          )}
          ref={forwardedRef}
          onKeyDown={handleKeyDown}
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

SegmentedControl.displayName = 'SegmentedControl';

export default SegmentedControl;
