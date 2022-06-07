import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { transparentize } from 'polished';
import isNull from 'lodash/isNull';
import once from 'lodash/once';
import { useDynamicRefs, useIdAllocator } from '@leafygreen-ui/hooks';
import { cx, css } from '@leafygreen-ui/emotion';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { createDataProp, isComponentType } from '@leafygreen-ui/lib';
import { palette, uiColors } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { Overline } from '@leafygreen-ui/typography';
import { Size, Mode } from './types';
import { useEffectOnceOnMount } from './useEffectOnceOnMount';

/**
 * The selection and hover indicators are absolutely positioned elements that move underneath the text.
 * This allows us to achieve the sliding effect.
 */
const selectionIndicatorDataAttr = createDataProp('selection-indicator');
const hoverIndicatorDataAttr = createDataProp('hover-indicator');

/**
 * Styles
 */
const wrapperStyle = css`
  display: flex;
  gap: 8px;
  align-items: center;
  z-index: 0;
  font-family: ${fontFamilies.default};
`;

const labelStyle: {
  [key in Mode]: string;
} = {
  light: css`
    letter-spacing: 1.4px;
    color: ${palette.gray.dark1};
  `,
  dark: css`
    color: ${uiColors.gray.light1};
  `,
};

const optionsWrapperStyleSize: Record<Size, string> = {
  [Size.Small]: css`
    --segment-gap: 1px; // space between segments
    --wrapper-padding: 0px;
    --outer-radius: 6px;
    --indicator-radius: 6px;
    --indicator-height: 100%;
  `,
  [Size.Default]: css`
    --segment-gap: 5px; // space between segments
    --wrapper-padding: 3px;
    --outer-radius: 8px;
    --indicator-radius: 6px;
    --indicator-height: calc(100% - 2 * var(--wrapper-padding));
  `,
  [Size.Large]: css`
    --segment-gap: 5px; // space between segments
    --wrapper-padding: 3px;
    --outer-radius: 12px;
    --indicator-radius: 6px;
    --indicator-height: calc(100% - 2 * var(--wrapper-padding));
  `,
};

const optionsWrapperStyleMode: Record<Mode, string> = {
  [Mode.Light]: css`
    --background-color: ${palette.gray.light3};
    --border-color: transparent;
    --border-width: 0px;
    --inner-shadow: 0px 1px 2px ${transparentize(0.7, palette.black)} inset;
    --outer-shadow: 0px 1px 1px ${palette.gray.light2};
    // Hover indicator
    --hover-background-color: ${palette.white};
    // Selection indicator
    --indicator-background-color: ${palette.black};
    --indicator-border-color: ${palette.black};
    --indicator-shadow: 0px 1px 2px ${transparentize(0.7, palette.gray.dark3)};
  `,
  [Mode.Dark]: css`
    --background-color: ${uiColors.gray.dark3};
    --border-color: ${uiColors.gray.dark1};
    --border-width: 1px;
    --inner-shadow: unset;
    --outer-shadow: unset;
    --hover-background-color: ${uiColors.gray.dark2};
    --indicator-background-color: ${uiColors.gray.dark1};
    --indicator-border-color: ${uiColors.gray.base};
    --indicator-shadow: 0px 1px 2px ${transparentize(0.7, uiColors.gray.dark3)};
  `,
};

const optionsWrapperStyleSizeDarkModeOverrides: Record<Size, string> = {
  [Size.Small]: css`
    --segment-gap: 1px;
    --wrapper-padding: 0px;
    --outer-radius: 4px;
    --indicator-radius: 4px;
    --indicator-height: 100%;
  `,
  [Size.Default]: css`
    --segment-gap: 5px;
    --wrapper-padding: 3px;
    --outer-radius: 6px;
    --indicator-radius: 6px;
    --indicator-height: calc(100% - 2 * var(--wrapper-padding));
  `,
  [Size.Large]: css`
    --segment-gap: 5px;
    --wrapper-padding: 3px;
    --outer-radius: 6px;
    --indicator-radius: 6px;
    --indicator-height: calc(100% - 2 * var(--wrapper-padding));
  `,
};

const optionsWrapperStyle = ({
  mode = 'light',
  size = 'default',
}: {
  mode: Mode;
  size: Size;
}) =>
  cx(
    optionsWrapperStyleSize[size],
    optionsWrapperStyleMode[mode],
    css`
      position: relative;
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
      gap: var(--segment-gap);
      align-items: center;
      padding: var(--wrapper-padding);
      border: var(--border-width) solid var(--border-color);
      border-radius: var(--outer-radius);
      --indicator-radius: 6px;
      background-color: var(--background-color);

      &:focus {
        outline: none;
      }

      // Frame shadow
      &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        box-shadow: var(--inner-shadow), var(--outer-shadow);
        z-index: 1;
        pointer-events: none;
      }
    `,
    {
      // TODO: Refresh - remove darkMode overrides
      [optionsWrapperStyleSizeDarkModeOverrides[size]]: mode === 'dark',
    },
  );

const selectionIndicatorStyle = css`
  position: absolute;
  width: 100%;
  height: var(--indicator-height);
  z-index: 2;
  box-shadow: var(--indicator-shadow-color);
  border-radius: var(--indicator-radius);
  border-width: 1px;
  border-style: solid;
  background-color: var(--indicator-background-color);
  border-color: var(--indicator-border-color);
  transition: transform 150ms ease-in-out;
`;

const hoverIndicatorStyle = css`
  position: absolute;
  height: var(--indicator-height);
  width: 100%;
  border-radius: var(--indicator-radius);
  background-color: var(--hover-background-color);
  z-index: 0;
  opacity: 0;
  transition: opacity 100ms ease-in-out;
`;

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
  /**
   * Children must be SegmentedControlOptions
   */
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
   * Callback that gets called when a user makes a new selection.
   */
  onChange?: (value: string) => void;

  /**
   * Styling prop
   */
  className?: string;
}

/**
 * Segmented controls act as a toggle between a current state and related states, often changing the view of information within a single page.
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
    defaultValue,
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
  // TODO: log warning if defaultValue is set but does not match any child value
  const { usingKeyboard } = useUsingKeyboardContext();
  const segmentedContainerRef = useRef<null | HTMLDivElement>(null);
  const [isfocusInComponent, setIsfocusInComponent] = useState<boolean>(false);

  const getOptionRef = useDynamicRefs<HTMLDivElement>({ prefix: 'option' });

  const mode: Mode = darkMode ? 'dark' : 'light';

  const name = useIdAllocator({
    prefix: 'segmented-control',
    id: nameProp ?? label,
  });

  // If a value is given, then it's controlled
  const isControlled = useMemo(
    () => controlledValue != null,
    [controlledValue],
  );

  // Keep track of the value internally
  const [internalValue, setInternalValue] = useState<string | undefined>(
    defaultValue ?? controlledValue,
  );

  const [focusedOptionValue, setFocusedOptionValue] = useState<
    string | undefined
  >(defaultValue ?? controlledValue);

  // If no default or controlled value is given, set it to the first option
  useEffectOnceOnMount(() => {
    const firstChild = React.Children.toArray(children)[0];

    if (
      !internalValue &&
      isComponentType(firstChild, 'SegmentedControlOption')
    ) {
      setInternalValue(firstChild.props.value);
      setFocusedOptionValue(firstChild.props.value);
    }
  });

  // Check if the organic focus is inside of this component. We'll use this to check if the focus should be programmatically set in SegmentedControlOption.
  const handleFocusIn = useCallback(() => {
    if (
      segmentedContainerRef.current?.contains(
        document.activeElement as HTMLElement,
      )
    ) {
      setIsfocusInComponent(true);
    } else {
      setIsfocusInComponent(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('focusin', handleFocusIn);
    return () => {
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, [handleFocusIn]);

  // Handle value updates
  const updateValue = useCallback(
    (value: string) => {
      if (internalValue !== value) {
        setInternalValue(value);
        onChange?.(value);
      }
    },
    [internalValue, onChange],
  );

  /**
   * Main render function.
   * Add internal props to children passed in
   */
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

        const _onHover = (hovered: boolean) => {
          if (hovered) setHoveredIndex(index);
          else setHoveredIndex(null);
        };

        return React.cloneElement(child, {
          _id,
          _checked,
          _focused,
          _index: index,
          'aria-controls': child.props['aria-controls'] ?? ariaControls,
          _onClick: updateValue,
          _onHover,
          ref: getOptionRef(`${index}`),
          isfocusInComponent,
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
      getOptionRef,
      isfocusInComponent,
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

  // Keep track of which element is hovered
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Keep track of the index of the selected value
  const selectedIndex = useMemo(
    () =>
      (
        React.Children.toArray(renderedChildren) as Array<React.ReactElement>
      ).findIndex(child =>
        isControlled
          ? child.props.value === controlledValue
          : child.props.value === internalValue,
      ),
    [controlledValue, isControlled, renderedChildren, internalValue],
  );

  /**
   * Focus Management
   */

  // Keep track of the index of the focused value
  const focusedIndex = useMemo(
    () =>
      (
        React.Children.toArray(renderedChildren) as Array<React.ReactElement>
      ).findIndex(child => child.props.value === focusedOptionValue),
    [renderedChildren, focusedOptionValue],
  );

  const updateFocusedIndex = (newIndex: number): void => {
    const children = (
      React.Children.toArray(renderedChildren) as Array<React.ReactElement>
    ).filter(child => !child.props.disabled);
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

  // When the value changes via click, we update the internal focus tracker so the correct element gets focused on tab press
  useEffect(() => {
    if (!usingKeyboard) {
      setFocusedOptionValue(internalValue);
    }
  }, [internalValue, usingKeyboard]);

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

  /**
   * Dynamic Styles.
   * Dynamically set the size & position of the selection indicator
   */

  const getIndicatorDynamicStyles = useCallback(
    (index: number | null = 0) => {
      if (isNull(index))
        return css`
          width: 0;
        `;

      const count = React.Children.count(renderedChildren);
      const widthPct = (1 / count) * 100;
      const transformPct = index * 100;

      return css`
        opacity: 1;
        width: calc(${widthPct}% - 2 * var(--wrapper-padding));
        transform: translateX(
          calc(${transformPct}% + ${2 * index + 1} * var(--wrapper-padding))
        );
      `;
    },
    [renderedChildren],
  );

  /**
   * Return
   */
  return (
    <SegmentedControlContext.Provider value={{ size, mode, name, followFocus }}>
      <div
        ref={segmentedContainerRef}
        className={cx(
          wrapperStyle,
          {
            // TODO: Refresh - remove darkmode font override
            [css`
              font-family: ${fontFamilies.legacy};
            `]: darkMode,
          },
          className,
        )}
        {...rest}
      >
        {label && <Overline className={labelStyle[mode]}>{label}</Overline>}

        <div
          role="tablist"
          aria-label={name}
          aria-owns={childrenIdList}
          className={cx(optionsWrapperStyle({ mode, size }))}
          ref={forwardedRef}
          onKeyDownCapture={handleKeyDown}
        >
          {renderedChildren}
          <div
            {...selectionIndicatorDataAttr.prop}
            className={cx(
              selectionIndicatorStyle,
              getIndicatorDynamicStyles(selectedIndex),
            )}
          />
          <div
            {...hoverIndicatorDataAttr.prop}
            className={cx(
              hoverIndicatorStyle,
              getIndicatorDynamicStyles(hoveredIndex),
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
