import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

import { FormField, FormFieldInputContainer } from '@leafygreen-ui/form-field';
import { useIdAllocator, useValidation } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import { LGIDS_TEXT_AREA } from '../constants';

import { textAreaContainerStyles, textAreaStyles } from './TextArea.styles';
import { State, TextAreaProps } from './TextArea.types';

/**
 * # TextArea
 *
 * TextArea component
 *
 * ```
<TextArea label='Input Label' onChange={() => execute when value of input field changes}/>
```
 * @param props.id ID associated with the TextArea component.
 * @param props.label Text shown in bold above the input element.
 * @param props.description Text that gives more detail about the requirements for the input.
 * @param props.disabled Whether or not the field is currently disabled.
 * @param props.onChange Callback to be executed when the value of the input field changes.
 * @param props.onBlur Callback to be executed when the input stops being focused.
 * @param props.placeholder The placeholder text shown in the input field before the user begins typing.
 * @param props.errorMessage The error message shown below the input element if the value is invalid.
 * @param props.successMessage The success message shown below the input element if the value is valid.
 * @param props.state The current state of the TextArea. This can be `none` or `error`.
 * @param props.value The current value of the input field. If a value is passed to this prop, component will be controlled by consumer.
 * @param props.className ClassName supplied to the TextArea container.
 * @param props.darkMode Determines whether or not the component appears in dark theme.
 * @param props.handleValidation Validation callback used to validate input.
 * @param props.baseFontSize Override the global `baseFontSize` set in LeafygreenProvider. This will only change the font size of the input text, not the label or description.
 * @param props.defaultValue The default value of the input field. Unlike value, component will not be controlled if defaultValue is passed.
 */

type TextArea = React.ForwardRefExoticComponent<TextAreaProps>;
export const TextArea: TextArea = forwardRef<
  HTMLTextAreaElement,
  TextAreaProps
>(function TextArea(
  {
    label,
    description,
    className,
    errorMessage = 'This input needs your attention',
    successMessage = 'Success',
    darkMode: darkModeProp,
    disabled = false,
    state = State.None,
    id: idProp,
    value: controlledValue,
    onChange,
    onBlur,
    handleValidation,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-invalid': ariaInvalid,
    baseFontSize: baseFontSizeProp,
    'data-lgid': dataLgId = LGIDS_TEXT_AREA.root,
    defaultValue = '',
    ...rest
  }: TextAreaProps,
  forwardedRef: React.Ref<HTMLTextAreaElement>,
) {
  const baseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);
  const id = useIdAllocator({ prefix: 'textarea', id: idProp });
  const { darkMode } = useDarkMode(darkModeProp);

  const isControlled = typeof controlledValue === 'string';
  const [uncontrolledValue, setValue] = useState(defaultValue);
  const value = isControlled ? controlledValue : uncontrolledValue;

  // Validation
  const validation = useValidation<HTMLTextAreaElement>(handleValidation);

  const handleBlur: React.FocusEventHandler<HTMLTextAreaElement> = e => {
    if (onBlur) {
      onBlur(e);
    }

    validation.onBlur(e);
  };

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = e => {
    if (onChange) {
      onChange(e);
    }

    if (!isControlled) {
      setValue(e.target.value);
    }

    validation.onChange(e);
  };

  if (!label && !ariaLabelledby) {
    console.error(
      'For screen-reader accessibility, label or aria-labelledby must be provided to TextArea.',
    );
  }

  const ariaProps = {
    'aria-invalid': ariaInvalid,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
  } as const;

  const formFieldProps = {
    baseFontSize,
    className,
    darkMode,
    'data-lgid': dataLgId,
    description,
    disabled,
    errorMessage,
    id,
    label,
    state,
    successMessage,
    ...ariaProps,
  } as const;

  const textAreaProps = {
    className: textAreaStyles,
    onBlur: handleBlur,
    onChange: handleChange,
    ref: forwardedRef,
    title: label != null ? label : undefined,
    value,
    ...rest,
  } as const;

  return (
    <FormField {...formFieldProps}>
      <FormFieldInputContainer className={textAreaContainerStyles}>
        <textarea {...textAreaProps} />
      </FormFieldInputContainer>
    </FormField>
  );
});

TextArea.displayName = 'TextArea';

TextArea.propTypes = {
  id: PropTypes.string,
  darkMode: PropTypes.bool,
  label: PropTypes.string,
  description: PropTypes.string,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  state: PropTypes.oneOf(Object.values(State)),
};
