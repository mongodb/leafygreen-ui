import React, { useMemo, useRef, useState } from 'react';
import { isComponentType } from '@leafygreen-ui/lib';
import {
  InternalOption,
  InternalProps as InternalOptionProps,
  OptionElement,
  ReactEmpty,
} from './Option';
import { InternalOptionGroup, OptionGroupElement } from './OptionGroup';
import { isFragment } from 'react-is';

function isReactEmpty(value: React.ReactNode): value is ReactEmpty {
  return (
    value === undefined || value === null || value === false || value === ''
  );
}

export function traverseSelectChildren(
  children: React.ReactNode,
  optionFn: (child: OptionElement, group?: OptionGroupElement) => void,
): void {
  React.Children.forEach(children, child => {
    if (isComponentType<OptionElement>(child, 'Option')) {
      optionFn(child);
    } else if (isComponentType<OptionGroupElement>(child, 'OptionGroup')) {
      traverseSelectChildren(child.props.children, option =>
        optionFn(option, child),
      );
    } else if (isFragment(child)) {
      traverseSelectChildren(child.props.children, optionFn);
    }
  });
}

export function convertToInternalElements(
  children: React.ReactNode,
  optionFn: (
    child: OptionElement,
    group?: OptionGroupElement,
  ) => InternalOptionProps,
  fallbackFn?: (child: React.ReactNode) => void,
): React.ReactNode {
  return React.Children.map(children, child => {
    if (isComponentType<OptionElement>(child, 'Option')) {
      return <InternalOption {...optionFn(child)} />;
    } else if (isComponentType<OptionGroupElement>(child, 'OptionGroup')) {
      const { children: options, ...rest } = child.props;
      return (
        <InternalOptionGroup className={undefined} {...rest}>
          {convertToInternalElements(
            options,
            option => optionFn(option, child),
            fallbackFn,
          )}
        </InternalOptionGroup>
      );
    } else if (isFragment(child)) {
      return convertToInternalElements(
        child.props.children,
        optionFn,
        fallbackFn,
      );
    } else if (!isReactEmpty(child)) {
      fallbackFn?.(child);
    }

    return null;
  });
}

export function getOptionValue(option: OptionElement | null): string {
  if (option === null) {
    return '';
  }

  if (option.props.value !== undefined) {
    return option.props.value;
  }

  if (option.props.children instanceof Array) {
    return option.props.children.filter(child => !isReactEmpty(child)).join('');
  }

  return option.props.children.toString();
}

export function isOptionDisabled(
  option: OptionElement,
  group: OptionGroupElement | undefined,
): boolean {
  return (option.props.disabled ?? false) || (group?.props?.disabled ?? false);
}

export function isOptionSelectable(
  option: OptionElement,
  group: OptionGroupElement | undefined,
  value: string,
): boolean {
  return getOptionValue(option) === value && !isOptionDisabled(option, group);
}

/**
 * Given the selected option from a previous render, attempts to find a
 * match among the options of the next render to become the next selected
 * option, so that the state of the component doesn't need to be lost.
 */
export function reconcileOption(
  children: React.ReactNode,
  previousOption: OptionElement,
): OptionElement | null {
  // we disregard `key`s because they should only be compared in
  // the context of the same parent element, which we don't know
  // and would be complex to track. we disregard which option
  // group the previous option was in as well for simplicity.
  let sameInstance: OptionElement | undefined;
  let sameChildrenAndValue: OptionElement | undefined;
  let sameExplicitValue: OptionElement | undefined;
  let sameValue: OptionElement | undefined;

  traverseSelectChildren(children, option => {
    if (option === previousOption) {
      sameInstance = previousOption;
    } else if (
      option.props.children === previousOption.props.children &&
      option.props.value === previousOption.props.value
    ) {
      sameChildrenAndValue ??= option;
    } else if (
      option.props.value !== undefined &&
      option.props.value === previousOption.props.value
    ) {
      sameExplicitValue ??= option;
    } else if (getOptionValue(option) === getOptionValue(previousOption)) {
      sameValue ??= option;
    }
  });

  return (
    sameInstance ??
    sameChildrenAndValue ??
    sameExplicitValue ??
    sameValue ??
    null
  );
}

/**
 * TODO: Explore obsoleting `useElementNode` and moving this into hooks lib
 */
export const useSmartRef: typeof useRef = function <T>(
  initialValue?: T,
): React.MutableRefObject<T | undefined> {
  // eslint-disable-next-line prefer-const
  let [value, setValue] = useState(initialValue);

  return useMemo(
    () => ({
      get current() {
        return value;
      },
      set current(nextValue) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setValue((value = nextValue));
      },
    }),
    [value],
  );
};
