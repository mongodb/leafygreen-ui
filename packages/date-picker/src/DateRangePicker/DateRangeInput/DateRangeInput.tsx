import React, {
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
} from 'react';

import { keyMap } from '@leafygreen-ui/lib';

import { DateInputBox } from '../../DateInput';
import { DateFormField } from '../../DateInput/DateFormField';
import { useDatePickerContext } from '../../DatePickerContext';
import { useSegmentRefs } from '../../hooks/useSegmentRefs';
import { isElementInputSegment, isZeroLike } from '../../utils';
import { getRangeSegmentToFocus } from '../utils/getRangeSegmentToFocus';
import { getRelativeRangeSegment } from '../utils/getRelativeRangeSegment';

import { inputWrapperStyles } from './DateRangeInput.styles';
import { DateRangeInputProps } from './DateRangeInput.types';

const EN_DASH = '–';

export const DateRangeInput = forwardRef<HTMLDivElement, DateRangeInputProps>(
  ({ start, end, handleValidation, ...rest }: DateRangeInputProps, fwdRef) => {
    const { disabled, formatParts, setOpen } = useDatePickerContext();

    const startSegmentRefs = useSegmentRefs();
    const endSegmentRefs = useSegmentRefs();

    /** Called when the input, or any of its children, is clicked */
    const handleInputClick: MouseEventHandler<HTMLElement> = ({ target }) => {
      if (!disabled) {
        setOpen(true);
      }

      const segmentToFocus = getRangeSegmentToFocus({
        target,
        formatParts,
        segmentRefs: [startSegmentRefs, endSegmentRefs],
      });

      segmentToFocus?.focus();
    };

    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = e => {
      const { target: _target, key } = e;
      const target = _target as HTMLElement;
      const isSegment =
        isElementInputSegment(target, startSegmentRefs) ||
        isElementInputSegment(target, endSegmentRefs);

      // if target is not a segment, do nothing
      if (!isSegment) return;

      const isInputEmpty = isZeroLike(target.value);
      const cursorPosition = target.selectionEnd;

      switch (key) {
        case keyMap.ArrowLeft:
          // TODO:
          getRelativeRangeSegment();
          break;
        case keyMap.ArrowRight:
          // TODO:
          break;
        case keyMap.ArrowDown:
          // TODO:
          break;
        case keyMap.ArrowUp:
          // TODO:
          break;
        case keyMap.Backspace: {
          // TODO:
          break;
        }

        case keyMap.Enter:
          handleValidation?.([start || null, end || null]);
          break;

        case keyMap.Escape:
          setOpen(false);
          handleValidation?.([start || null, end || null]);
          break;

        default:
          // any other keydown should open the menu
          setOpen(true);
      }
    };

    return (
      <DateFormField
        ref={fwdRef}
        onKeyDown={handleKeyDown}
        onInputClick={handleInputClick}
        {...rest}
      >
        <div className={inputWrapperStyles}>
          <DateInputBox segmentRefs={startSegmentRefs} />
          <span>{EN_DASH}</span>
          <DateInputBox segmentRefs={endSegmentRefs} />
        </div>
      </DateFormField>
    );
  },
);

DateRangeInput.displayName = 'DateRangeInput';
