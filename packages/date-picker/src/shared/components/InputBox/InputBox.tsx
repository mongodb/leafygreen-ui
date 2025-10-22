import React, {
  FocusEventHandler,
  ForwardedRef,
  KeyboardEventHandler,
} from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { keyMap } from '@leafygreen-ui/lib';

import {
  getRelativeSegment,
  getValueFormatter,
  getRelativeSegmentRef,
} from '../../utils';
import { InputSegmentChangeEventHandler } from '../InputSegment/InputSegment.types';

import {
  segmentPartsWrapperStyles,
  separatorLiteralDisabledStyles,
  separatorLiteralStyles,
} from './InputBox.styles';
import { InputBoxComponentType, InputBoxProps } from './InputBox.types';
import { createExplicitSegmentValidator } from '../../utils/isExplicitSegmentValue';

export function isInputSegment<T extends Record<string, string>>(
  str: any,
  segmentObj: T,
): str is T[keyof T] {
  if (typeof str !== 'string') return false;
  return Object.values(segmentObj).includes(str);
}

export const isElementInputSegment = <
  T extends Record<string, React.RefObject<HTMLInputElement>>,
>(
  element: HTMLElement,
  segmentRefs: T,
): element is HTMLInputElement => {
  const segmentsArray = Object.values(segmentRefs).map(
    ref => ref.current,
  ) as Array<HTMLElement | null>;
  const isSegment = segmentsArray.includes(element);
  return isSegment;
};

/**
 * Generic controlled input box component
 * Renders a styled input box with appropriate segment order & separator characters.
 *
 * @internal
 */
export const InputBoxWithRef = <T extends Record<string, string>>(
  {
    className,
    labelledBy,
    segmentRefs,
    onSegmentChange,
    onKeyDown,
    segments,
    setSegment,
    disabled,
    charsPerSegment,
    formatParts,
    segmentObj,
    segmentRules,
    renderSegment,
    ...rest
  }: InputBoxProps<T>,
  fwdRef: ForwardedRef<HTMLDivElement>,
) => {
  const { theme } = useDarkMode();

  const isExplicitSegmentValue = createExplicitSegmentValidator(
    segmentObj,
    segmentRules,
  );

  /** Formats and sets the segment value */
  const getFormattedSegmentValue = (
    segmentName: (typeof segmentObj)[keyof typeof segmentObj],
    segmentValue: string,
  ): string => {
    const formatter = getValueFormatter(segmentName, charsPerSegment);
    const formattedValue = formatter(segmentValue);
    return formattedValue;
  };

  /** Fired when an individual segment value changes */
  const handleSegmentInputChange: InputSegmentChangeEventHandler<
    T[keyof T],
    string
  > = segmentChangeEvent => {
    let segmentValue = segmentChangeEvent.value;
    const { segment: segmentName, meta } = segmentChangeEvent;
    const changedViaArrowKeys =
      meta?.key === keyMap.ArrowDown || meta?.key === keyMap.ArrowUp;

    // Auto-format the segment if it is explicit and was not changed via arrow-keys
    if (
      !changedViaArrowKeys &&
      isExplicitSegmentValue(segmentName, segmentValue)
    ) {
      segmentValue = getFormattedSegmentValue(segmentName, segmentValue);

      // Auto-advance focus (if possible)
      const nextSegmentName = getRelativeSegment('next', {
        segment: segmentName,
        formatParts,
      });

      if (nextSegmentName) {
        const nextSegmentRef = segmentRefs[nextSegmentName];
        nextSegmentRef?.current?.focus();
        nextSegmentRef?.current?.select();
      }
    }

    setSegment(segmentName, segmentValue);
    onSegmentChange?.(segmentChangeEvent);
  };

  /** Triggered when a segment is blurred */
  const handleSegmentInputBlur: FocusEventHandler<HTMLInputElement> = e => {
    const segmentName = e.target.getAttribute('id');
    const segmentValue = e.target.value;

    if (isInputSegment(segmentName, segmentObj)) {
      const formattedValue = getFormattedSegmentValue(
        segmentName,
        segmentValue,
      );
      setSegment(segmentName, formattedValue);
    }
  };

  /** Called on any keydown within the input element */
  const handleInputKeyDown: KeyboardEventHandler<HTMLDivElement> = e => {
    const { target: _target, key } = e;
    const target = _target as HTMLElement;
    const isSegment = isElementInputSegment(target, segmentRefs);

    // if target is not a segment, do nothing
    if (!isSegment) return;

    const isSegmentEmpty = !target.value;

    switch (key) {
      case keyMap.ArrowLeft: {
        // Without this, the input ignores `.select()`
        e.preventDefault();
        // if input is empty,
        // set focus to prev input (if it exists)
        const segmentToFocus = getRelativeSegmentRef('prev', {
          segment: target,
          formatParts,
          segmentRefs,
        });

        segmentToFocus?.current?.focus();
        segmentToFocus?.current?.select();
        // otherwise, use default behavior

        break;
      }

      case keyMap.ArrowRight: {
        // Without this, the input ignores `.select()`
        e.preventDefault();
        // if input is empty,
        // set focus to next. input (if it exists)
        const segmentToFocus = getRelativeSegmentRef('next', {
          segment: target,
          formatParts,
          segmentRefs,
        });

        segmentToFocus?.current?.focus();
        segmentToFocus?.current?.select();
        // otherwise, use default behavior

        break;
      }

      case keyMap.ArrowUp:
      case keyMap.ArrowDown: {
        // increment/decrement logic implemented by DateInputSegment
        break;
      }

      case keyMap.Backspace: {
        if (isSegmentEmpty) {
          // prevent the backspace in the previous segment
          e.preventDefault();

          const segmentToFocus = getRelativeSegmentRef('prev', {
            segment: target,
            formatParts,
            segmentRefs,
          });
          segmentToFocus?.current?.focus();
          segmentToFocus?.current?.select();
        }
        break;
      }

      case keyMap.Space:
      case keyMap.Enter:
      case keyMap.Escape:
      case keyMap.Tab:
        // Behavior handled by parent or menu
        break;
    }

    // call any handler that was passed in
    onKeyDown?.(e);
  };

  return (
    <div
      className={cx(segmentPartsWrapperStyles, className)}
      onKeyDown={handleInputKeyDown}
      ref={fwdRef}
      {...rest}
    >
      {formatParts?.map((part, i) => {
        if (part.type === 'literal') {
          return (
            <span
              className={cx(separatorLiteralStyles, {
                [separatorLiteralDisabledStyles[theme]]: disabled,
              })}
              key={'literal-' + i}
            >
              {part.value}
            </span>
          );
        } else if (isInputSegment(part.type, segmentObj)) {
          const segmentProps = {
            onChange: handleSegmentInputChange,
            onBlur: handleSegmentInputBlur,
            partType: part.type,
          };
          return renderSegment(segmentProps);
        }
      })}
    </div>
  );
};

export const InputBox = React.forwardRef(
  InputBoxWithRef,
) as InputBoxComponentType;

InputBox.displayName = 'InputBox';
