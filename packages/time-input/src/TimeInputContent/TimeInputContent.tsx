import React, { useState } from 'react';
import { TimeInputContentProps } from './TimeInputContent.types';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { Description, Label, Overline } from '@leafygreen-ui/typography';
import { cx } from '@leafygreen-ui/emotion';
import { Size } from '../TimeInput/TimeInput.types';
import {
  labelDescriptionStyles,
  wrapperBaseStyles,
  wrapperSizeStyles,
  wrapperGapStyles,
  unitBaseStyles,
  getUnitThemeStyles,
  getUnitDisabledStyles,
} from './TimeInputContent.styles';
import { UnitOption } from '../TimeInputSelect/TimeInputSelect.types';
import { TimeInputSelect } from '../TimeInputSelect';
import { TimeInputInput } from '../TimeInputInput';
import { unitOptions } from '../shared/constants';

export function TimeInputContent({
  label,
  description,
  className,
  disabled,
  size = Size.Default,
  id: idProp,
  ...props
}: TimeInputContentProps) {
  const { darkMode, theme } = useDarkMode();
  const [selectUnit, setSelectUnit] = useState<UnitOption>(unitOptions[0]);

  const renderUnitOnly = false;
  const renderSelectOnly = true;

  const prefix = 'lg-time-input';
  const inputId = useIdAllocator({ prefix, id: idProp });
  // const feedbackId = useIdAllocator({ prefix, id: ariaDescribedbyProp });
  const descriptionId = useIdAllocator({ prefix });
  const selectId = useIdAllocator({ prefix });

  const unit = '24 hours';

  const handleSelectChange = (unit: UnitOption) => {
    console.log(unit);
    setSelectUnit(unit);
  };

  return (
    <div className={className}>
      {(label || description) && (
        <div className={labelDescriptionStyles}>
          {label && (
            <Label htmlFor={inputId} disabled={disabled}>
              {label}
            </Label>
          )}
          {description && (
            <Description id={descriptionId} disabled={disabled}>
              {description}
            </Description>
          )}
        </div>
      )}
      <div
        className={cx(wrapperBaseStyles, wrapperSizeStyles[size], {
          [wrapperGapStyles]: renderUnitOnly,
        })}
      >
        <TimeInputInput />
        {renderUnitOnly && (
          <Overline
            className={cx(unitBaseStyles, getUnitThemeStyles(theme), {
              [getUnitDisabledStyles(theme)]: disabled,
            })}
          >
            {unit}
          </Overline>
        )}
        {renderSelectOnly && (
          <TimeInputSelect
            id={selectId}
            unit={selectUnit.displayName}
            onChange={unit => {
              handleSelectChange(unit);
            }}
          />
        )}
      </div>
      {/* <FormFieldFeedback {...formFieldFeedbackProps} /> */}
    </div>
  );
}

TimeInputContent.displayName = 'TimeInputContent';
