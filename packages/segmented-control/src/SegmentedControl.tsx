import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { cx, css } from '@leafygreen-ui/emotion';
import { createDataProp, isComponentType } from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';
import InteractionRing from '@leafygreen-ui/interaction-ring';
import { Overline } from '@leafygreen-ui/typography';
import useDynamicRefs from './useDynamicRefs';
import { Size, Mode } from './types';
import { render } from 'react-dom';

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
  /**
   * Defines whether the selection should automatically follow focus.
   * If set to true, the arrow keys can be used to switch selection,
   * otherwise a keyboard user will need to press enter to make a selection.
   *
   * default: `false`
   */
  followFocus?: boolean;

  /**
   * Identifies the element(s) whose contents/presence is controlled by the segmented control.
   *
   * Required as a prop on the control, or on each individual option.
   */
  'aria-controls'?: string;
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
    followFocus,
    'aria-controls': ariaControls,
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

  const [focusedOptionValue, setFocusedOptionValue] = useState<string>(
    defaultValue,
  );

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
          setFocusedOptionValue(child.props.value);

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

  // Add internal props to children passed in
  const renderedChildren: React.ReactNode = useMemo(
    () =>
      React.Children.map(children, (child, index) => {
        if (!isComponentType(child, 'SegmentedControlOption')) {
          console.error(`${child} is not a SegmentedControlOption`);
          return child;
        }

        // Ensure `aria-controls` is set
        if (!ariaControls && !child.props['aria-controls']) {
          console.error(
            `The property \`aria-controls\` is required on each Segmented Control option, or on the Segmented Control parent.`,
          );
        }

        const _checked: boolean = isControlled
          ? child.props.value === controlledValue || !!child.props.checked
          : child.props.value === internalValue;

        const _focused: boolean = child.props.value === focusedOptionValue;

        return React.cloneElement(child, {
          id: child.props.id ?? `${name}-${index}`,
          darkMode,
          size,
          _checked,
          _focused,
          _name: name,
          _index: index,
          _followFocus: followFocus,
          'aria-controls': child.props['aria-controls'] ?? ariaControls,
          _onClick: updateValue,
          ref: setRef(`${name}-${index}`),
        });
      }),
    [
      children,
      isControlled,
      controlledValue,
      internalValue,
      focusedOptionValue,
      name,
      darkMode,
      size,
      followFocus,
      ariaControls,
      updateValue,
      setRef,
    ],
  );

  // Maintain a list of child `id`s to link the `tablist` to individual `tab` elements
  // See https://www.w3.org/TR/wai-aria-1.1/#tab
  const childrenIdList: string = useMemo(() => {
    if (renderedChildren) {
      return React.Children.map(
        renderedChildren as React.ReactElement,
        child => child?.props?.id,
      ).join(' ');
    }

    return '';
  }, [renderedChildren]);

  // Keep track of the index of the selected value
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

  // When the value changes, update the focus tracker
  useEffect(() => {
    setFocusedOptionValue(controlledValue ?? internalValue);
  }, [controlledValue, internalValue]);

  // Keep track of the index of the focused value
  const focusedIndex = useMemo(
    () =>
      (React.Children.toArray(
        renderedChildren,
      ) as Array<React.ReactElement>).findIndex(
        child => child.props.value === focusedOptionValue,
      ),
    [renderedChildren, focusedOptionValue],
  );

  const updateFocusedIndex = (newIndex: number): void => {
    const children = (React.Children.toArray(
      renderedChildren,
    ) as Array<React.ReactElement>).filter(child => !child.props.disabled);
    const length = children.length;
    newIndex =
      newIndex >= length
        ? newIndex % length
        : newIndex < 0
        ? length + newIndex
        : newIndex;

    const { value } = children[newIndex].props;
    setFocusedOptionValue(value);
  };

  /**
   * Handle keyboard navigation
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Note: Arrow keys don't fire a keyPress event — need to use keyDown
    e.stopPropagation();
    // We only handle right and left arrow keys
    // Up & down should be left to control scroll
    switch (e.key) {
      case 'ArrowRight':
        updateFocusedIndex(focusedIndex + 1);
        break;
      case 'ArrowLeft':
        updateFocusedIndex(focusedIndex - 1);
        break;
      default:
        break;
    }
  };

  // Dynamically set the size & position of the selection indicator
  const [selectionStyleDynamic, setSelectionStyleDynamic] = useState<string>();

  // Update dynamic styles of the selection indicator
  useEffect(() => {
    const selectedRef = getRef(`${name}-${selectedIndex}`);

    if (selectedRef && selectedRef.current) {
      // The ref refers to the button element
      const selectedElement = selectedRef.current;

      if (selectedElement) {
        const { offsetWidth: width, offsetLeft: left } = selectedElement;
        setSelectionStyleDynamic(css`
          width: ${width}px;
          transform: translateX(${left}px);
        `);
      }
    }
  }, [selectedIndex, getRef, name, renderedChildren]);

  /**
   * Return
   */
  return (
    <div className={cx(wrapperStyle, className)} {...rest}>
      {label && <Overline className={labelStyle[mode]}>{label}</Overline>}

      <div
        role="tablist"
        aria-label={name}
        aria-owns={childrenIdList}
        className={cx(
          frameStyleBase,
          frameStyleFromSize[size],
          frameStyleFromMode[mode],
        )}
        ref={forwardedRef}
        onKeyDownCapture={handleKeyDown}
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
    </div>
  );
});

SegmentedControl.displayName = 'SegmentedControl';

export default SegmentedControl;
