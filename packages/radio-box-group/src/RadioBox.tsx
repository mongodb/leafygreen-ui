import React, { HTMLProps, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { HTMLElementProps, createDataProp } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import Size from './Size';
import { useRadioBoxGroupContext, RadioBoxGroupContext } from './context';

const radioBoxWrapper = createDataProp('radio-box-wrapper');
const radioBoxInput = createDataProp('radio-box-input');

export const radioBoxSizes: { [K in Size]: string } = {
  [Size.Default]: css`
    width: 169px;
  `,

  [Size.Compact]: css`
    padding-right: 12px;
    padding-left: 12px;
  `,

  [Size.Full]: css`
    flex: 1;
  `,
};

const inputStyles = css`
  opacity: 0;
  position: absolute;
  pointer-events: none;
`;

interface StateForStyles {
  checked: boolean;
  disabled: boolean;
  size: Size;
  showFocus: boolean;
}

const getRadioDisplayStyles = ({
  checked,
  disabled,
  size,
  showFocus,
}: StateForStyles) => {
  return cx(
    css`
      display: flex;
      align-items: center;
      justify-content: center;

      padding: 16px 24px;

      font-size: 13px;
      font-weight: 700;
      text-align: center;
      overflow-wrap: break-word;
      background-color: ${palette.white};
      border-radius: 6px;
      color: ${palette.black};
      border: 1px solid ${palette.gray.base};

      cursor: pointer;
      pointer-events: auto;
      transition: 150ms ease-in-out;
      transition-property: border-color, box-shadow;

      &:hover,
      &:active {
        box-shadow: 0 0 0 3px ${palette.gray.light2};
      }
    `,
    {
      [css`
        border-color: transparent;
        box-shadow: 0 0 0 3px ${palette.green.dark1};
        &:hover,
        &:active {
          box-shadow: 0 0 0 3px ${palette.green.dark1};
        }
      `]: checked,
      [css`
        color: ${palette.gray.light1};
        background: ${palette.gray.light3};
        font-weight: 400;
        border-color: ${palette.gray.light2};
        cursor: not-allowed;
        &:hover,
        &:active {
          box-shadow: unset;
        }
      `]: disabled,
      [css`
        input:focus + & {
          border-color: ${palette.gray.base};
          box-shadow: 0 0 0 2px ${palette.white},
            0 0 0 4px ${palette.blue.light1};
        }
      `]: showFocus,
    },
    radioBoxSizes[size],
  );
};

export const radioWrapper = css`
  font-family: ${fontFamilies.default};
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    margin-right: 12px;
  }
`;

export interface RadioBoxProps extends Omit<HTMLElementProps<'input'>, 'size'> {
  /**
   * Indicates whether or not the box will be checked
   * @default false
   */
  checked?: boolean;

  /**
   * Callback to be executed when a RadioBox is selected.
   * @default () => {}
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * Name passed to each RadioBox belonging to the RadioGroup.
   */
  name?: string;

  /**
   * Determines size of RadioBox components ['default', 'compact', 'full'].
   * @default 'default''
   */
  size?: Size;

  /**
   * Determines what RadioBox will be checked on default. Component will be controlled if this prop is used.
   */
  value: string | number;

  /**
   * className supplied to RadioBox container.
   */
  className?: string;

  /**
   * Boolean that determines if the RadioBox is disabled.
   */
  disabled?: boolean;

  /**
   * Id for RadioBox and respective label.
   */
  id?: string;

  /**
   * Content that will appear inside of the RadioBox component's label.
   */
  children?: React.ReactNode;

  /**
   * If RadioBoxGroup is uncontrolled, the default property makes this RadioBox checked on the initial render.
   */
  default?: boolean;
}

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
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onClick,
  ...rest
}: RadioBoxProps) {
  const radioBoxGroupContext = useRadioBoxGroupContext();
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();

  const localId = useIdAllocator({
    prefix: 'radio-box',
  });

  const id = useMemo(() => idProp ?? localId, [idProp, localId]);

  const size = radioBoxGroupContext?.size ?? sizeProp;
  const name = radioBoxGroupContext?.name ?? nameProp;
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
    showFocus,
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
      {...radioBoxWrapper.prop}
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
        {...radioBoxInput.prop}
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
};
