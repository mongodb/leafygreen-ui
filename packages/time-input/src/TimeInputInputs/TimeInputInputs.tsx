import React, { forwardRef } from 'react';

import { unitOptions } from '../constants';
import { useTimeInputContext } from '../Context/TimeInputContext/TimeInputContext';
import { useTimeInputDisplayContext } from '../Context/TimeInputDisplayContext/TimeInputDisplayContext';
import { useSelectUnit } from '../hooks';
import { TimeSegmentsState } from '../shared.types';
import { TimeFormField, TimeFormFieldInputContainer } from '../TimeFormField';
import { TimeInputBox } from '../TimeInputBox/TimeInputBox';
import { TimeInputSelect } from '../TimeInputSelect/TimeInputSelect';
import { UnitOption } from '../TimeInputSelect/TimeInputSelect.types';
import { getFormatPartsValues } from '../utils';

import { wrapperBaseStyles } from './TimeInputInputs.styles';
import { TimeInputInputsProps } from './TimeInputInputs.types';
import { useObjectDependency } from '@leafygreen-ui/hooks';
import { DateType, LocaleString } from '@leafygreen-ui/date-utils';
import { useTimeSegments } from '../hooks/useTimeSegments';

/**
 * @internal
 */
export const TimeInputInputs = forwardRef<HTMLDivElement, TimeInputInputsProps>(
  (_props: TimeInputInputsProps, forwardedRef) => {
    const { is12HourFormat, timeZone, locale } = useTimeInputDisplayContext();
    const { value } = useTimeInputContext();

    const handleSelectChange = (unit: UnitOption) => {
      setSelectUnit(unit);
    };

    /**
     * Gets the time parts from the value
     */
    const timeParts = getFormatPartsValues({
      locale: locale,
      timeZone: timeZone,
      value: value,
    });

    const { hour, minute, second, dayPeriod, month, day, year } = timeParts;

    /**
     * Creates time segments object
     *
     * // TODO: these are temp
     */
    // const derivedSegments: TimeSegmentsState = {
    //   hour,
    //   minute,
    //   second,
    // };

    // const derivedSegmentsDependency = useObjectDependency(derivedSegments);

    const { segments, setSegment } = useTimeSegments({
      date: value,
      locale,
      timeZone,
      options: {
        onUpdate: (newSegments, prevSegments) => {
          console.log('TimeInputInputs 🍉🍉🍉', {
            newSegments,
            prevSegments,
            selectUnit: selectUnit.displayName,
            is12HourFormat,
            date: {
              day,
              month,
              year,
              hour: newSegments.hour,
              minute: newSegments.minute,
              second: newSegments.second,
            },
          });
        },
      },
    });

    // console.log('TimeInputInputs 🍉', { segments });

    /**
     * Hook to manage the select unit
     */
    const { selectUnit, setSelectUnit } = useSelectUnit({
      dayPeriod,
      value,
      unitOptions,
      options: {
        onUpdate: (newSelectUnit, prevSelectUnit) => {
          console.log('TimeInputInputs Select Unit 🪼🪼🪼', {
            newSelectUnit,
            prevSelectUnit,
            is12HourFormat,
            date: {
              day,
              month,
              year,
              hour: segments.hour,
              minute: segments.minute,
              second: segments.second,
            },
          });
        },
      },
    });

    // // eslint-disable-next-line no-console
    // console.log('TimeInputInputs 🍉', {
    //   value: value?.toUTCString(),
    //   segmentObj,
    // });

    return (
      <TimeFormField ref={forwardedRef}>
        <div className={wrapperBaseStyles}>
          <TimeFormFieldInputContainer>
            <TimeInputBox
              segments={segments}
              setSegment={(segment, value) => {
                // eslint-disable-next-line no-console
                setSegment(segment, value);
                console.log({ segment, value });
              }}
            />
          </TimeFormFieldInputContainer>
          {is12HourFormat && (
            <TimeInputSelect
              unit={selectUnit.displayName}
              onChange={unit => {
                handleSelectChange(unit);
              }}
            />
          )}
        </div>
      </TimeFormField>
    );
  },
);

TimeInputInputs.displayName = 'TimeInputInputs';
