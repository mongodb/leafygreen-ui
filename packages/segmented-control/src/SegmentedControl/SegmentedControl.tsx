import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import isNull from 'lodash/isNull';
import once from 'lodash/once';
import PropTypes from 'prop-types';

import { css, cx } from '@leafygreen-ui/emotion';
import { useDynamicRefs, useIdAllocator } from '@leafygreen-ui/hooks';
import {
  useDarkMode,
  useUsingKeyboardContext,
} from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';
import { Overline } from '@leafygreen-ui/typography';

import { SegmentedControlContext } from '../SegmentedControlContext';
import { useEffectOnceOnMount } from '../useEffectOnceOnMount';

import {
  hoverIndicatorStyle,
  labelBaseStyles,
  labelThemeStyle,
  optionsWrapperStyle,
  selectionIndicatorStyle,
  wrapperStyle,
} from './SegmentedControl.styles';
import {
  DeprecatedSize,
  SegmentedControlProps,
  Size,
} from './SegmentedControl.types';

/**
 * Segmented controls act as a toggle between a current state and related states, often changing the view of information within a single page.
 */
export const SegmentedControl = forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>(function SegmentedControl(
  {
    children,
    name: nameProp,
    size: sizeProp = Size.Default,
    darkMode: darkModeProp,
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

  const { theme } = useDarkMode(darkModeProp);

  const getOptionRef = useDynamicRefs<HTMLDivElement>({ prefix: 'option' });

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

  useEffect(() => {
    if (isControlled) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue, isControlled]);

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
        if (child == null) {
          return child;
        }

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

  // deprecated size "small" no longer supported, but we want to gracefully degrade the prop value
  const size = sizeProp === DeprecatedSize.Small ? Size.XSmall : sizeProp;

  /**
   * Return
   */
  return (
    <SegmentedControlContext.Provider
      value={{ size, theme, name, followFocus }}
    >
      <div
        ref={segmentedContainerRef}
        className={cx(wrapperStyle, className)}
        {...rest}
      >
        {label && (
          <Overline className={cx(labelBaseStyles, labelThemeStyle[theme])}>
            {label}
          </Overline>
        )}

        <div
          role="tablist"
          aria-label={name}
          aria-owns={childrenIdList}
          className={cx(optionsWrapperStyle({ theme, size }))}
          ref={forwardedRef}
          onKeyDownCapture={handleKeyDown}
        >
          {renderedChildren}
          {/**
           * The selection and hover indicators are absolutely positioned elements that move underneath the text.
           * This allows us to achieve the sliding effect.
           */}
          <div
            className={cx(
              selectionIndicatorStyle,
              getIndicatorDynamicStyles(selectedIndex),
            )}
          />
          <div
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

const errorOnce = once(console.error);
const warnOnce = once(console.warn);

SegmentedControl.propTypes = {
  darkMode: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(Size)),
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  followFocus: PropTypes.bool,
  className: PropTypes.string,
};
