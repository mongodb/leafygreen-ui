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
  animate = true,
  'aria-label': ariaLabel = 'checkbox',
  baseFontSize: baseFontSizeProp,
  bold: boldProp,
  checked: checkedProp,
  className,
  darkMode: darkModeProp,
  'data-lgid': dataLgId = LGIDS_CHECKBOX.root,
  description,
  disabled = false,
  id: idProp,
  indeterminate: indeterminateProp,
  label = '',
  onClick: onClickProp,
  onChange: onChangeProp,
  name,
  style,
  ...rest
}: CheckboxProps) {
  const { darkMode, theme } = useDarkMode(darkModeProp);
  const baseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);

  const [checked, setChecked] = React.useState(false);
  const isChecked = React.useMemo(
    () => (checkedProp != null ? checkedProp : checked),
    [checkedProp, checked],
  );

  const checkboxId = useIdAllocator({ prefix: 'checkbox', id: idProp });
  const labelId = `${checkboxId}-label`;

  // If a prop is passed, use the prop
  // otherwise default bold if there's a description
  const bold = boldProp ?? !!description;

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

    // For Microsoft Edge and IE, when checkbox is indeterminate, change event does not fire when clicked.
    // Explicitly call onChange for this case
    if (indeterminateProp) {
      onChange(e);
      e.stopPropagation();
    }
  };

  return (
    <LeafyGreenProvider
      baseFontSize={baseFontSize === 16 ? baseFontSize : 14}
      darkMode={darkMode}
    >
      <div
        className={cx(
          containerStyle,
          {
            [disabledContainerStyle]: disabled,
          },
          className,
        )}
        data-lgid={dataLgId}
        style={style}
      >
        <Label
          id={labelId}
          htmlFor={checkboxId}
          disabled={disabled}
          className={cx(labelStyle, labelHoverStyle[theme], {
            [disabledLabelStyle]: disabled,
          })}
        >
          <input
            {...rest}
            id={checkboxId}
            className={cx(inputClassName, inputStyle, inputFocusStyles[theme])}
            type="checkbox"
            name={name}
            checked={isChecked}
            aria-label={ariaLabel}
            aria-disabled={disabled}
            aria-checked={indeterminateProp ? 'mixed' : isChecked}
            aria-labelledby={labelId}
            onClick={onClick}
            onChange={onChange}
          />

          <Check
            theme={theme}
            isChecked={isChecked}
            indeterminate={indeterminateProp}
            disabled={disabled}
            animate={animate}
            selector={checkWrapperClassName}
          />

          {label && (
            <span
              className={cx(labelTextStyle, {
                [css`
                  font-weight: ${fontWeights.regular};
                `]: !bold,
              })}
            >
              {label}
            </span>
          )}
        </Label>

        {description && (
          <Description className={descriptionStyle} disabled={disabled}>
            {description}
          </Description>
        )}
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
  disabled: PropTypes.bool,
  indeterminate: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  animate: PropTypes.bool,
};

export default Checkbox;
