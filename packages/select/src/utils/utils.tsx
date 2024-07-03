import React, { useCallback, useMemo, useRef, useState } from 'react';
import { isFragment } from 'react-is';

import { consoleOnce, isComponentType } from '@leafygreen-ui/lib';
import { breakpoints } from '@leafygreen-ui/tokens';

import {
  InternalOption,
  InternalProps as InternalOptionProps,
  OptionElement,
  ReactEmpty,
} from '../Option';
import { InternalOptionGroup, OptionGroupElement } from '../OptionGroup';

// Any screen smaller than a tablet with no pointer, or a coarse pointer and no hover capability (i.e. touch screen)
// For more details, see: https://css-tricks.com/touch-devices-not-judged-size/
const _baseQuery = `@media only screen and (max-width: ${breakpoints.Tablet}px) and (hover: none)`;
export const MobileMediaQuery = `${_baseQuery} and (pointer: coarse), ${_baseQuery} and (pointer: none)`;

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
  if (
    !(
      React.Children.toArray(children).every(child =>
        isComponentType<OptionElement>(child, 'Option'),
      ) ||
      React.Children.toArray(children).every(child =>
        isComponentType<OptionGroupElement>(child, 'OptionGroup'),
      )
    )
  ) {
    consoleOnce.warn(
      `LeafyGreen Select: Combining grouped and ungrouped Select Options can cause styling issues`,
    );
  }

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

  if (Array.isArray(option.props.children)) {
    return option.props.children.filter(child => !isReactEmpty(child)).join('');
  }

  if (option.props.children) {
    return option.props.children.toString();
  }

  return '';
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

export function useObservedRef<T>(
  callback: (value: T) => void,
  initialValue: T,
  options: { initialValue: T; deps?: React.DependencyList },
): React.MutableRefObject<T>;
export function useObservedRef<T>(
  callback: (value: T) => void,
  options?: { initialValue: T | null; deps?: React.DependencyList },
): React.RefObject<T>;
export function useObservedRef<T>(
  callback: (value: T | undefined) => void,
  options?: { deps?: React.DependencyList },
): React.MutableRefObject<T>;
export function useObservedRef<T>(
  callback: (value: T | null | undefined) => void,
  {
    initialValue,
    deps = [],
  }: { initialValue?: T | null; deps?: React.DependencyList } = {},
) {
  const ref = useRef(initialValue);

  return useMemo(
    () => ({
      get current() {
        return ref.current;
      },
      set current(nextValue) {
        ref.current = nextValue;
        callback(nextValue);
      },
    }),
    [
      callback,
      ref,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ...deps,
    ],
  );
}

type SettableRef<T> = React.RefCallback<T> | React.MutableRefObject<T>;

type ValueOrArray<T> = T | ReadonlyArray<T>;

export function useForwardedRef<T>(
  forwardedRefOrRefs: ValueOrArray<SettableRef<T> | null>,
  initialValue: T,
): React.MutableRefObject<T>;
export function useForwardedRef<T>(
  forwardedRefOrRefs: ValueOrArray<SettableRef<T | null> | null>,
  initialValue: T | null,
): React.RefObject<T>;
export function useForwardedRef<T>(
  forwardedRefOrRefs: ValueOrArray<SettableRef<T | null | undefined> | null>,
  initialValue?: T | null,
): React.MutableRefObject<T | null | undefined> {
  const forwardValueToRefs = useCallback(
    <T,>(
      forwardedRefOrRefs: ValueOrArray<SettableRef<T> | null>,
      nextValue: T,
    ) => {
      if (Array.isArray(forwardedRefOrRefs)) {
        forwardedRefOrRefs.forEach(forwardValueToRefs);
      } else if (typeof forwardedRefOrRefs === 'function') {
        forwardedRefOrRefs(nextValue);
      } else if (forwardedRefOrRefs) {
        // @ts-expect-error https://github.com/microsoft/TypeScript/issues/40527
        forwardedRefOrRefs.current = nextValue;
      }
    },
    [],
  );

  return useObservedRef(
    useCallback(
      value => forwardValueToRefs(forwardedRefOrRefs, value),
      [forwardedRefOrRefs, forwardValueToRefs],
    ),
    { initialValue },
  );
}

/**
 * TODO: Explore obsoleting `useElementNode` in favor of this
 */
export const useStateRef: typeof useRef = <T,>(initialValue?: T) => {
  const [value, setValue] = useState(initialValue);
  return useObservedRef(setValue, { initialValue, deps: [value] });
};
