import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { colors } from '@leafygreen-ui/theme';
import { css, cx } from '@leafygreen-ui/emotion';
import Variant from './Variant';

const labelStyle = css`
  cursor: pointer;
  margin-bottom: 5px;
  display: block;
`;

const inputStyle = css`
  margin-right: 0.5em;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

const disabledButtonVariant = {
  default: css`
    color: ${colors.gray[5]};
    cursor: not-allowed;
  `,

  light: css`
    color: ${colors.gray[4]};
    cursor: not-allowed;
  `,
};

const textStyle = css`
  line-height: 0.9em;
`;

export const RadioProps = {};
export interface RadioProps {
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
  variant: Variant;

  /**
   * Boolean that determines if the Radio is disabled.
   */
  disabled: boolean;

  /**
   * className supplied to Radio container.
   */
  className: string;

  /**
   * Used to determine what Radio is checked.
   */
  value: string | number;

  /**
   * Id for Radio and respective label.
   */
  id?: string;

  /**
   * If RadioGroup is uncontrolled, the default property makes this Radio checked on the initial render.
   */
  default?: boolean;

  /**
   * Content that will appear inside of the Radio component's label.
   */
  children?: React.ReactNode;
}

/**
 * # Radio
 *
 * Radio component
 *
 * ```
  <Radio value='radio-1'>Radio 1</Radio>
```
 * @param props.disabled Boolean that determines if the Radio is disabled.
 * @param props.children Content that will appear inside of Radio.
 * @param props.value Used to determine what Radio is active.
 * @param props.id Id for Radio and respective label.
 * @param props.default If RadioGroup is uncontrolled, the default property makes this Radio checked on the initial render.
 * @param props.className className supplied to Radio container.
 */
export default class Radio extends PureComponent<
  RadioProps & React.InputHTMLAttributes<HTMLInputElement>
> {
  static displayName = 'Radio';

  static propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    id: PropTypes.string,
    name: PropTypes.string,
    variant: PropTypes.oneOf(['default', 'light']),
    default: PropTypes.bool,
  };

  static defaultProps = {
    checked: false,
    disabled: false,
    className: '',
    onChange: () => {},
    variant: Variant.Default,
  };

  render() {
    const {
      children,
      className,
      onChange,
      value,
      checked,
      disabled,
      id,
      name,
      variant,
      ...rest
    } = this.props;

    return (
      <label htmlFor={id} className={cx(labelStyle, className)}>
        <input
          {...rest}
          id={id}
          name={name}
          type="radio"
          className={cx(inputStyle, className)}
          onChange={onChange}
          value={value}
          checked={checked}
          aria-checked={checked}
          disabled={disabled}
          aria-disabled={disabled}
        />
        <span
          className={cx(textStyle, {
            [disabledButtonVariant[variant]]: disabled,
          })}
        >
          {children}
        </span>
      </label>
    );
  }
}
