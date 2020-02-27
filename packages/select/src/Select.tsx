import React, {
  Children,
  isValidElement,
  ReactElement,
  useRef,
  useContext,
  useLayoutEffect,
  useMemo,
} from 'react';
import { useSelect } from 'downshift';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import { css, cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { useViewportSize } from '@leafygreen-ui/hooks';
import Popover from '@leafygreen-ui/popover';
import valueContext, {
  ValueContextExternalProps,
  ValueContextProps,
} from './valueContext';
import Option, { OptionProps } from './Option';

const TRANSITION_MS = 150;

export interface SelectProps<OptionT>
  extends ValueContextExternalProps<OptionT> {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
  disabled?: boolean;
  onChange: (val: OptionT | undefined) => unknown;
}

function getValuesFromChildren<OptionT>(
  children: React.ReactNode,
): Array<OptionT> {
  return Children.toArray(children)
    .filter(isValidElement)
    .flatMap((child: ReactElement) => {
      if (child.type === Option) {
        // NOTE(JeT): We don't have any way to actually assert that all the <Option>s will have conforming value props
        return (
          (child.props as OptionProps<OptionT>).value ??
          (child.props.children as OptionT)
        );
      } else if ('children' in child.props) {
        return getValuesFromChildren<OptionT>(child.props.children);
      }

      return null;
    })
    .filter((v: OptionT | null): v is OptionT => v != null);
}

function nodeToString(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  } else if (isValidElement(node)) {
    const children = node.props.children;

    if (
      Array.isArray(children) ||
      isValidElement(children) ||
      typeof children === 'string' ||
      typeof children === 'number'
    ) {
      return nodeToString(node);
    }

    return '';
  } else if (Array.isArray(node)) {
    return node.map(nodeToString).join('');
  }

  return '';
}

const defaultValueToString = (val: unknown): string =>
  val == null ? '' : String(val);

const defaultEqual = (val1: unknown, val2: unknown) => val1 === val2;

/**
 * Interop with both types of ref params, so that we can potentially have multiple refs point to the same element.
 */
const setRef = <T extends HTMLElement>(
  ref: React.Ref<T | null>,
  el: T | null,
) => {
  if (ref == null) {
    return;
  }

  if (typeof ref === 'function') {
    ref(el);
  } else {
    // NOTE(JeT):
    // We need to cast to a mutable ref object here because normally React would be making this assignment internally
    (ref as React.MutableRefObject<T | null>).current = el;
  }
};

function Menu({
  children,
  className,
  innerRef,
  isOpen,
  positioningRef,
  ...rest
}: {
  children: React.ReactNode;
  innerRef: React.Ref<HTMLDivElement>;
  isOpen: boolean;
  positioningRef: React.RefObject<HTMLElement>;
} & HTMLElementProps<'div'>) {
  const { selectedOptionRef, value } = useContext(valueContext);
  const elRef = useRef<HTMLElement | null>();
  const viewportSize = useViewportSize();

  return (
    <Popover
      {...rest}
      ref={el => {
        elRef.current = el;
        setRef(innerRef, el);
      }}
      className={cx(
        className,
        css`
          opacity: ${isOpen ? 1 : 0};
          transition: opacity ${TRANSITION_MS}ms;

          max-height: 500px;

          @media screen and (max-height: 500px) {
            max-height: 100vh;
          }
        `,
      )}
    >
      {children}
    </Popover>
  );
}

function Select<OptionT = any>({
  value,
  valueIsEqual = defaultEqual,
  valueToString = defaultValueToString,
  onChange,
  children,
  placeholder,
  disabled = false,
}: SelectProps<OptionT>) {
  const allValues = getValuesFromChildren<OptionT>(children);
  const {
    getMenuProps,
    getToggleButtonProps,
    getItemProps,
    highlightedIndex,
    isOpen,
  } = useSelect({
    items: allValues,
    selectedItem: value,
    onSelectedItemChange: ({ selectedItem }) => onChange(selectedItem),
    itemToString: valueToString,
  });
  const selectedOptionRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonContentRef = useRef<HTMLDivElement>(null);
  const maxButtonContentWidth = useRef(0);

  useLayoutEffect(() => {
    if (buttonContentRef.current == null) {
      return;
    }

    const currentWidth = buttonContentRef.current.clientWidth;

    if (currentWidth > maxButtonContentWidth.current) {
      // Whenever we do our next render, make sure the button doesn't get any smaller
      maxButtonContentWidth.current = currentWidth;
    }
  });

  const highlightedValue =
    highlightedIndex === -1 ? undefined : allValues[highlightedIndex];
  const buttonContent = value == null ? placeholder : valueToString(value);
  const longestValue = allValues.reduce((prevLongest, val) => {
    const valString = valueToString(val);

    if (valString.length > prevLongest.length) {
      return valString;
    }

    return prevLongest;
  }, nodeToString(placeholder));

  const contextProps: ValueContextProps<OptionT> = {
    value,
    valueIsEqual,
    valueToString,
    getItemProps,
    highlightedValue,
    isOpen,
    selectedOptionRef,
  };

  return (
    <>
      <Button {...getToggleButtonProps({ disabled, ref: buttonRef })}>
        <div
          ref={buttonContentRef}
          className={css`
            min-width: ${maxButtonContentWidth.current}px;
          `}
        >
          {buttonContent}
          {/* width helper to try and avoid excessive layout changes */}
          <div
            aria-hidden
            className={css`
              pointer-events: none;
              visibility: hidden;
              height: 0;
            `}
          >
            {longestValue}
          </div>
        </div>
      </Button>
      <valueContext.Provider value={contextProps}>
        <Menu
          positioningRef={buttonRef}
          isOpen={isOpen}
          {...getMenuProps({ refKey: 'innerRef' })}
        >
          {children}
        </Menu>
      </valueContext.Provider>
    </>
  );
}

Select.displayName = 'Select';

Select.propTypes = {};

export default Select;
