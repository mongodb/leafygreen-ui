import React, {
  FocusEventHandler,
  ForwardedRef,
  KeyboardEventHandler,
} from 'react';
import isEmpty from 'lodash/isEmpty';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { consoleOnce, keyMap } from '@leafygreen-ui/lib';

import { useSegmentRefs } from '../hooks';
import {
  InputSegmentChangeEventHandler,
  isInputSegment,
  Size,
} from '../shared.types';
import {
  createExplicitSegmentValidator,
  getRelativeSegment,
  getRelativeSegmentRef,
  getValueFormatter,
  isElementInputSegment,
} from '../utils';

import {
  getSegmentPartsWrapperStyles,
  getSeparatorLiteralStyles,
} from './InputBox.styles';
import { InputBoxComponentType, InputBoxProps } from './InputBox.types';

const InputBoxWithRef = <Segment extends string>(
  {
    className,
    labelledBy,
    segmentRefs: segmentRefsProp,
    onSegmentChange,
    onKeyDown,
    setSegment,
    disabled,
    formatParts,
    segmentEnum,
    segmentRules,
    segmentComponent,
    segments,
    size = Size.Default,
    ...rest
  }: InputBoxProps<Segment>,
  fwdRef: ForwardedRef<HTMLDivElement>,
) => {
  const { theme } = useDarkMode();

  /** If segmentRefs are provided, use them. Otherwise, create them using the segments. */
  const segmentRefs = useSegmentRefs({
    segments,
    segmentRefs: segmentRefsProp,
  });

  if (isEmpty(segmentRefs) || isEmpty(segments)) {
    consoleOnce.error('Error in Leafygreen InputBox: segments is required');
    return null;
  }

  /** Create a validator for explicit segment values. */
  const isExplicitSegmentValue = createExplicitSegmentValidator({
    segmentEnum,
    rules: segmentRules,
  });

  /** Get the maximum number of characters per segment. */
  const getCharsPerSegment = (segment: Segment) =>
    segmentRules[segment].maxChars;

  /** Formats and sets the segment value. */
  const getFormattedSegmentValue = (
    segmentName: (typeof segmentEnum)[keyof typeof segmentEnum],
    segmentValue: string,
    allowZero: boolean,
  ): string => {
    const formatter = getValueFormatter({
      charsPerSegment: getCharsPerSegment(segmentName),
      allowZero,
    });
    const formattedValue = formatter(segmentValue);
    return formattedValue;
  };

  /** Fired when an individual segment value changes */
  const handleSegmentInputChange: InputSegmentChangeEventHandler<
    Segment,
    string
  > = segmentChangeEvent => {
    let segmentValue = segmentChangeEvent.value;
    const { segment: segmentName, meta } = segmentChangeEvent;
    const changedViaArrowKeys =
      meta?.key === keyMap.ArrowDown || meta?.key === keyMap.ArrowUp;
    const minSegmentValue = meta?.min as number;
    const allowZero = minSegmentValue === 0;

    // Auto-format the segment if it is explicit and was not changed via arrow-keys e.g. up/down arrows.
    if (
      !changedViaArrowKeys &&
      isExplicitSegmentValue({
        segment: segmentName,
        value: segmentValue,
        allowZero,
      })
    ) {
      segmentValue = getFormattedSegmentValue(
        segmentName,
        segmentValue,
        allowZero,
      );

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

  /** Triggered when a segment is blurred. Formats the segment value and sets it. */
  const handleSegmentInputBlur: FocusEventHandler<HTMLInputElement> = e => {
    const segmentName = e.target.getAttribute('id');
    const segmentValue = e.target.value;
    const minValue = Number(e.target.getAttribute('min'));
    const allowZero = minValue === 0;

    if (isInputSegment(segmentName, segmentEnum)) {
      const formattedValue = getFormattedSegmentValue(
        segmentName,
        segmentValue,
        allowZero,
      );
      setSegment(segmentName, formattedValue);
    }
  };

  /** Called on any keydown within the input element. Manages arrow key navigation. */
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
        // increment/decrement logic implemented by InputSegment
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
    <>
      {/* We want to allow keydown events to be captured by the parent so that the parent can handle the event. */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className={getSegmentPartsWrapperStyles({ className })}
        onKeyDown={handleInputKeyDown}
        ref={fwdRef}
        {...rest}
      >
        {formatParts?.map((part, i) => {
          if (part.type === 'literal') {
            return (
              <span
                className={getSeparatorLiteralStyles({ theme, disabled })}
                key={'literal-' + i}
              >
                {part.value}
              </span>
            );
          } else if (isInputSegment(part.type, segmentEnum)) {
            const Segment = segmentComponent;
            return (
              <Segment
                key={part.type}
                segment={part.type}
                aria-labelledby={labelledBy}
                onChange={handleSegmentInputChange}
                onBlur={handleSegmentInputBlur}
                segmentEnum={segmentEnum}
                value={segments[part.type]}
                ref={segmentRefs[part.type]}
                disabled={disabled}
                charsCount={getCharsPerSegment(part.type)}
                size={size}
              />
            );
          }
        })}
      </div>
    </>
  );
};

/**
 * Generic controlled input box component that renders multiple input segments with separators.
 *
 * Supports auto-formatting, auto-advance focus, keyboard navigation (arrow keys), value increment/decrement,
 * validation, and blur formatting. It is designed primarily for date and time inputs.
 */
export const InputBox = React.forwardRef(
  InputBoxWithRef,
) as InputBoxComponentType;

InputBox.displayName = 'InputBox';
