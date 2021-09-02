import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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

const frameStyle = ({
  mode = 'light',
  size = 'default',
}: {
  mode: Mode;
  size: Size;
}) => {
  const vars: {
    [key: string]: string;
  } = {};

  if (size == 'small') {
    vars.segmentGap = '1px';
    vars.padding = '0px';
    vars.radius = '4px';
  } else if (size == 'large') {
    vars.segmentGap = '5px';
    vars.padding = '3px';
    vars.radius = '6px';
  } else {
    vars.segmentGap = '5px';
    vars.padding = '3px';
    vars.radius = '6px';
  }

  if (mode == 'dark') {
    vars.backgroundColor = uiColors.gray.dark3;
    vars.borderColor = uiColors.gray.dark1;
    vars.borderWidth = '1px';
    vars.innerShadow = 'unset';
    vars.outerShadow = 'unset';
  } else {
    vars.backgroundColor = uiColors.gray.light3;
    vars.borderColor = 'transparent';
    vars.borderWidth = '0px';
    vars.innerShadow = '0px 1px 2px rgba(0, 0, 0, 0.3) inset';
    vars.outerShadow = '0px 1px 1px #e7eeec';
  }

  return css`
    // Variables that are used in child elements get assigned to custom props
    // Otherwise, we simply assign the property to the interpolated JS variable
    --segment-gap: ${vars.segmentGap};
    --padding: ${vars.padding};

    position: relative;
    display: grid;
    padding: var(--padding);
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    gap: var(--segment-gap);
    align-items: center;
    background-color: ${vars.backgroundColor};
    border-radius: ${vars.radius};
    border-width: ${vars.borderWidth};
    border-style: solid;
    border-color: ${vars.borderColor};

    &:after {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      border-radius: ${vars.radius};
      box-shadow: ${vars.innerShadow}, ${vars.outerShadow};
      z-index: 2;
      pointer-events: none;
    }
  `;
};

const indicatorStyle = ({
  mode = 'light',
  size = 'default',
}: {
  mode: Mode;
  size: Size;
}) => {
  const vars: {
    [key: string]: string;
  } = {};

  if (size == 'small') {
    vars.height = '100%';
  } else if (size == 'large') {
    vars.height = 'calc(100% - 2 * var(--padding))';
  } else {
    vars.height = 'calc(100% - 2 * var(--padding))';
  }

  if (mode == 'dark') {
    vars.backgroundColor = uiColors.gray.dark1;
    vars.borderColor = uiColors.gray.base;
  } else {
    vars.backgroundColor = uiColors.gray.light2;
    vars.borderColor = selectionBorderColor;
  }

  return css`
    position: absolute;
    height: ${vars.height};
    box-shadow: 0px 1px 2px rgba(6, 22, 33, 0.3);
    transition: transform 150ms ease-in-out;
    z-index: 0;
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
    background-color: ${vars.backgroundColor};
    border-color: ${vars.borderColor};
  `;
};

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

  const name = useIdAllocator({ prefix: 'radio-group', id: nameProp });

  // If a value is given, then it's controlled
  // let isControlled = controlledValue != null;
  const isControlled = useRef(controlledValue != null);

  // Keep track of the uncontrolled value
  const [uncontrolledValue, setUncontrolledValue] = useState<string>(
    defaultValue,
  );

  // Run through the children and determine whether this is controlled,
  // and update the default value if needed
  useEffect(() => {
    React.Children.forEach(children, (child, index) => {
      if (isComponentType(child, 'SegmentedControlOption')) {
        // If one of the options has been programatically checked, then it's controlled
        if (child.props.checked != null) {
          isControlled.current = true;
        }

        // If there's no default value given, then we fall back to the first option
        if (!defaultValue && index === 0) {
          setUncontrolledValue(child.props.value);

          // TODO Potential bug: if `defaultValue` is changed to be falsy between renders,
          // then the value of the control will change
        }
      }
    });
  }, [children, defaultValue]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      if (!isControlled.current) {
        setUncontrolledValue(e.target.value);
      }
    },
    [isControlled, onChange],
  );

  // Add internal props to children passed in
  const renderedChildren = useMemo(
    () =>
      React.Children.map(children, (child, index) => {
        if (!isComponentType(child, 'SegmentedControlOption')) {
          console.warn(`${child} is not a SegmentedControlOption`);
          return child;
        }

        const _checked: boolean = isControlled.current
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
      }),
    [
      children,
      setRef,
      handleChange,
      isControlled,
      controlledValue,
      uncontrolledValue,
      name,
      size,
      darkMode,
    ],
  );

  const selectedIndex = useMemo(
    () =>
      (React.Children.toArray(
        renderedChildren,
      ) as Array<React.ReactElement>).findIndex(child =>
        isControlled.current
          ? child.props.value === controlledValue
          : child.props.value === uncontrolledValue,
      ),
    [controlledValue, isControlled, renderedChildren, uncontrolledValue],
  );

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
   * TODO
   * - remove hover focus ring
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
          role="group"
          aria-label={name}
          className={frameStyle({ mode, size })}
          ref={forwardedRef}
        >
          {renderedChildren}
          <div
            {...selectionIndicatorDataAttr.prop}
            className={cx(
              indicatorStyle({ mode, size }),
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
