import React, { HTMLProps, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { RadioBoxGroupContext, useRadioBoxGroupContext } from '../context';
import { RadioBoxProps, Size } from '../types';

import {
  getRadioDisplayStyles,
  inputStyles,
  radioBoxSizes,
  radioWrapper,
} from './RadioBox.styles';

function isChecked({
  checkedProp,
  defaultProp,
  radioBoxGroupContext,
  value,
}: {
  checkedProp?: boolean;
  defaultProp: boolean;
  radioBoxGroupContext: RadioBoxGroupContext | null;
  value: string | number;
}): boolean {
  const contextValue = radioBoxGroupContext?.value;

  if (contextValue == null) {
    return checkedProp ?? defaultProp;
  }

  return contextValue === value;
}

/**
 * # RadioBox
 *
 * RadioBox component
 *
 * ```
  <RadioBox value='radio-box-1'>RadioBox 1</RadioBox>
```
 * @param props.className className supplied to RadioBox container.
 * @param props.value Used to determine what RadioBox is active.
 * @param props.disabled Boolean that determines if the RadioBox is disabled.
 * @param props.id Id for RadioBox and respective label.
 * @param props.children Content that will appear inside of RadioBox.
 * @param props.default If RadioBoxGroup is uncontrolled, the default property makes this RadioBox checked on the initial render.
 */
export function RadioBox({
  className = '',
  onChange: onChangeProp,
  value,
  checked: checkedProp,
  default: defaultProp = false,
  disabled = false,
  id: idProp,
  size: sizeProp = Size.Default,
  children,
  name: nameProp,
  darkMode: darkModeProp,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onClick,
  ...rest
}: RadioBoxProps) {
  const radioBoxGroupContext = useRadioBoxGroupContext();
  const { darkMode: darkModeContext } = useDarkMode(darkModeProp);

  const localId = useIdAllocator({
    prefix: 'radio-box',
  });

  const id = useMemo(() => idProp ?? localId, [idProp, localId]);

  const size = radioBoxGroupContext?.size ?? sizeProp;
  const name = radioBoxGroupContext?.name ?? nameProp;
  const darkMode = radioBoxGroupContext?.darkMode ?? darkModeContext;
  const checked = isChecked({
    value,
    checkedProp,
    defaultProp,
    radioBoxGroupContext,
  });
  const contextOnChange = radioBoxGroupContext?.onChange;
  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      onChangeProp?.(e);
      contextOnChange?.(e);
    },
    [onChangeProp, contextOnChange],
  );

  const radioDisplayStyle = getRadioDisplayStyles({
    checked,
    disabled,
    size,
    darkMode,
  });

  const tooltipTriggerHandlers = {
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    onClick,
  } as HTMLProps<HTMLLabelElement>;

  return (
    <label
      {...tooltipTriggerHandlers}
      htmlFor={id}
      className={cx(
        radioWrapper,
        {
          [radioBoxSizes['full']]: size === Size.Full,
        },
        className,
      )}
    >
      <input
        {...rest}
        type="radio"
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        checked={checked}
        aria-checked={checked}
        disabled={disabled}
        aria-disabled={disabled}
        className={inputStyles}
      />

      <div className={radioDisplayStyle}>{children}</div>
    </label>
  );
}

RadioBox.displayName = 'RadioBox';

RadioBox.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.node,
  default: PropTypes.bool,
  darkMode: PropTypes.bool,
};
