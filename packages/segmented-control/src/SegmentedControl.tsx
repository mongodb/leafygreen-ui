import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { cx, css } from '@leafygreen-ui/emotion';
import { createDataProp, isComponentType } from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';
import { Overline } from '@leafygreen-ui/typography';
import useDynamicRefs from './useDynamicRefs';
import { Size, Mode } from './types';
import { once } from 'lodash';

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

const frameStyleSize: {
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

const frameStyleMode: {
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

const frameStyle = ({
  mode = 'light',
  size = 'default',
}: {
  mode: Mode;
  size: Size;
}) =>
  cx(
    frameStyleSize[size],
    frameStyleMode[mode],
    css`
      position: relative;
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
      gap: var(--segment-gap);
      align-items: center;
      padding: var(--padding);
      border: var(--border-width) solid var(--border-color);
      border-radius: var(--radius);
      background-color: var(--background-color);
      box-shadow: var(--inner-shadow), var(--outer-shadow);

      &:focus {
        outline: none;
      }
    `,
  );

const indicatorStyleSize: {
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

const indicatorStyleMode: {
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

const selectionIndicatorStyle = ({
  mode = 'light',
  size = 'default',
}: {
  mode: Mode;
  size: Size;
}) =>
  cx(
    indicatorStyleSize[size],
    indicatorStyleMode[mode],
    css`
      position: absolute;
      grid-column: 1/2; // position the selector in the grid until it gets positioned
      width: 100%;
      height: var(--indicator-height);
      z-index: 0;
      box-shadow: 0px 1px 2px rgba(6, 22, 33, 0.3);
      border-radius: 4px;
      border-width: 1px;
      border-style: solid;
      background-color: var(--indicator-background-color);
      border-color: var(--indicator-border-color);
      transition: transform 150ms ease-in-out;
    `,
  );

/**
 * Types
 */

interface SCContext {
  size: Size;
  mode: Mode;
  name: string;
  followFocus: boolean;
}
export const SegmentedControlContext = React.createContext<SCContext>({
  size: 'default',
  mode: 'light',
  name: '',
  followFocus: true,
});

export interface SegmentedControlProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  children: React.ReactNode;

  /**
   * Defines the size of the segmented control. Can be either `small`, `default`, or `large`
   */
  size?: Size;

  /**
   * Toggles dark mode
   */
  darkMode?: boolean;

  /**
   * Defines the default, or initial value of the component. Ignored if `value` is also provided.
   */
  defaultValue?: string;

  /**
   * Controls the value of the component.
   * If provided, you must update the value in the `onChange` method,
   * or other user actions (such as routing)
   */
  value?: string;

  /**
   * A text label to the left of the segmented control. Sets the `name` prop if none is provided.
   */
  label?: string;

  /**
   * Identifies the segmented control group to screen readers. Auto-generated if no `name` or `label` is provided.
   *
   * It's recommended for accessability to set this to a meaningful value.
   */
  name?: string;

  /**
   * Callback that gets called when a user makes a new selection.
   */
  onChange?: (value: string) => void;

  /**
   * Defines whether the selection should automatically follow focus.
   * If set to true, the arrow keys can be used to switch selection,
   * otherwise a keyboard user will need to press enter to make a selection.
   *
   * Default: `true`
   */
  followFocus?: boolean;

  /**
   * Identifies the element(s) whose contents/presence is controlled by the segmented control.
   *
   * Required as a prop on the control, or on each individual option.
   */
  'aria-controls'?: string;

  /**
   * Styling prop
   */
  className?: string;
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
    followFocus = true,
    'aria-controls': ariaControls,
    ...rest
  }: SegmentedControlProps,
  forwardedRef,
) {
  // TODO log warning if defaultValue is set but does not match any child value

  const [getRef, setRef] = useDynamicRefs<HTMLInputElement>();

  const mode = darkMode ? 'dark' : 'light';

  const name = useIdAllocator({
    prefix: 'segmented-control',
    id: nameProp ?? label,
  });

  // If a value is given, then it's controlled
  const [isControlled, setIsControlled] = useState(controlledValue != null);

  useEffect(() => {
    setIsControlled(controlledValue != null);
  }, [controlledValue]);

  // Keep track of the value internally
  const [internalValue, setInternalValue] = useState<string>(
    defaultValue ?? controlledValue,
  );

  const [focusedOptionValue, setFocusedOptionValue] = useState<string>(
    defaultValue ?? controlledValue,
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
          errorOnce(
            `Error in Segmented Control: ${child} is not a SegmentedControlOption`,
          );
          return child;
        }

        // Ensure `aria-controls` is set
        if (!ariaControls && !child.props['aria-controls']) {
          warnOnce(
            `The property \`aria-controls\` is required on each Segmented Control option, or on the Segmented Control parent.`,
          );
        }

        const _id = child.props.id ?? `${name}-${index}`;

        const _checked: boolean = isControlled
          ? child.props.value === controlledValue || !!child.props.checked
          : child.props.value === internalValue;

        const _focused: boolean = child.props.value === focusedOptionValue;

        return React.cloneElement(child, {
          _id,
          _checked,
          _focused,
          _index: index,
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
        child => child?.props?._id,
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
          grid-column: unset;
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
    <SegmentedControlContext.Provider value={{ size, mode, name, followFocus }}>
      <div className={cx(wrapperStyle, className)} {...rest}>
        {label && <Overline className={labelStyle[mode]}>{label}</Overline>}

        <div
          role="tablist"
          aria-label={name}
          aria-owns={childrenIdList}
          className={cx(frameStyle({ mode, size }))}
          ref={forwardedRef}
          onKeyDownCapture={handleKeyDown}
        >
          {renderedChildren}
          <div
            {...selectionIndicatorDataAttr.prop}
            className={cx(
              selectionIndicatorStyle({ mode, size }),
              selectionStyleDynamic,
            )}
          />
        </div>
      </div>
    </SegmentedControlContext.Provider>
  );
});

SegmentedControl.displayName = 'SegmentedControl';

export default SegmentedControl;

const errorOnce = once(console.error);
const warnOnce = once(console.warn);
