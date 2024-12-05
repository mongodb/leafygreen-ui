import React from 'react';
import PropTypes from 'prop-types';

import { css, cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { fontWeights } from '@leafygreen-ui/tokens';
import {
  Description,
  Label,
  useUpdatedBaseFontSize,
} from '@leafygreen-ui/typography';

import { Check } from '../Check';
import { LGIDS_CHECKBOX } from '../constants';

import {
  checkWrapperClassName,
  containerStyle,
  descriptionStyle,
  disabledContainerStyle,
  disabledLabelStyle,
  inputClassName,
  inputFocusStyles,
  inputStyle,
  labelHoverStyle,
  labelStyle,
  labelTextStyle,
} from './Checkbox.style';
import { CheckboxProps } from './Checkbox.types';

/**
 * Checkboxes should be used whenever a user has an option they’d like to opt in or out of.
 *
 * Unlike toggles, checkboxes are used for actions, or features, that don’t immediately turn on or off. Checkboxes are usually found in forms as opposed to config pages.
 */
function Checkbox({
  'aria-label': ariaLabel = 'checkbox',
  checked: checkedProp,
  className,
  darkMode: darkModeProp,
  id: idProp,
  label = '',
  onClick: onClickProp,
  onChange: onChangeProp,
  name,
  style,
  ...rest
}: CheckboxProps) {
  const { darkMode, theme } = useDarkMode(darkModeProp);

  const [checked, setChecked] = React.useState(false);
  const isChecked = React.useMemo(
    () => (checkedProp != null ? checkedProp : checked),
    [checkedProp, checked],
  );

  const checkboxId = useIdAllocator({ prefix: 'checkbox', id: idProp });
  const labelId = `${checkboxId}-label`;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeProp) {
      onChangeProp(e);
    }

    if (checkedProp == null) {
      setChecked(e.target.checked);
    }
  };

  const onClick = (
    e: React.MouseEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => {
    if (onClickProp) {
      onClickProp(e);
    }
  };

  return (
    <LeafyGreenProvider baseFontSize={14} darkMode={darkMode}>
      <div className={cx(containerStyle, className)} style={style}>
        <Label
          id={labelId}
          htmlFor={checkboxId}
          className={cx(labelStyle, labelHoverStyle[theme])}
        >
          <input
            {...rest}
            id={checkboxId}
            className={cx(inputClassName, inputStyle, inputFocusStyles[theme])}
            type="checkbox"
            name={name}
            checked={isChecked}
            aria-checked={isChecked}
            aria-label={ariaLabel}
            aria-labelledby={labelId}
            onClick={onClick}
            onChange={onChange}
          />

          <Check
            theme={theme}
            isChecked={isChecked}
            selector={checkWrapperClassName}
          />

          {label && <span className={cx(labelTextStyle)}>{label}</span>}
        </Label>
      </div>
    </LeafyGreenProvider>
  );
}

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
  darkMode: PropTypes.bool,
  description: PropTypes.string,
  checked: PropTypes.bool,
  label: PropTypes.node,
  className: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Checkbox;
