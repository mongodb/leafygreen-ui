import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HTMLElementProps, createDataProp } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import InteractionRing from '@leafygreen-ui/interaction-ring';
import { uiColors } from '@leafygreen-ui/palette';
import Size from './Size';

const radioBoxWrapper = createDataProp('radio-box-wrapper');
const radioBoxInput = createDataProp('radio-box-input');

export const radioBoxSizes: { [K in Size]: string } = {
  [Size.Default]: css`
    width: 169px;
  `,

  [Size.Compact]: css`
    padding-right: 4px;
    padding-left: 4px;
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
}

const getInteractionRingStyles = ({ checked }: StateForStyles) => {
  const baseStyles = css`
    width: 100%;
    // Display behind border
    z-index: -1;
  `;

  if (checked) {
    return cx(
      baseStyles,
      css`
        // Bring in front of border (covering it)
        z-index: 0;
      `,
    );
  }

  return baseStyles;
};

const getBorderStyles = ({ disabled, size }: StateForStyles) => {
  const baseStyles = cx(
    css`
      border: 1px solid ${uiColors.gray.light1};
      border-radius: 4px;
      cursor: pointer;
      position: relative;
      pointer-events: none;
    `,
    {
      [radioBoxSizes[size]]: size === Size.Full,
    },
  );

  if (disabled) {
    return cx(
      baseStyles,
      css`
        border-color: ${uiColors.gray.light2};
        cursor: not-allowed;
      `,
    );
  }

  return baseStyles;
};

const getRadioDisplayStyles = ({ disabled }: StateForStyles) => {
  const baseStyles = css`
    transition: box-shadow 150ms ease-in-out;
    padding: 15px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    vertical-align: top;
    overflow-wrap: break-word;
    background-color: white;
    border-radius: 4px;
    color: ${uiColors.gray.dark2};
    pointer-events: auto;
    z-index: 2;
  `;

  if (disabled) {
    return cx(
      baseStyles,
      css`
        color: ${uiColors.gray.light1};
        background: ${uiColors.gray.light3};
      `,
    );
  }

  return baseStyles;
};

export const radioWrapper = css`
  display: flex;
  position: relative;

  // Establishes the root element as a new stacking context
  // so that the z-index of the span within the button doesn't
  // appear above other elements on the page that it shouldn't.
  z-index: 0;

  &:not(:last-of-type) {
    margin-right: 12px;
  }
`;

export interface RadioBoxProps {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  checked?: boolean;
  size?: Size;
  name?: string;

  /**
   * className supplied to RadioBox container.
   */
  className?: string;

  /**
   * Used to determine what RadioBox is checked.
   */
  value: string | number;

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
export default function RadioBox({
  className = '',
  onChange,
  value,
  checked = false,
  disabled = false,
  id,
  size = Size.Default,
  children,
  name,
  ...rest
}: RadioBoxProps & Omit<HTMLElementProps<'input', never>, 'size'>) {
  const radioDisplayStyle = getRadioDisplayStyles({ checked, disabled, size });
  const interactionContainerStyle = getInteractionRingStyles({
    checked,
    disabled,
    size,
  });

  const [inputElement, setInputElement] = useState<HTMLElement | null>(null);

  return (
    <label
      {...radioBoxWrapper.prop}
      htmlFor={id}
      className={cx(
        radioWrapper,
        {
          [radioBoxSizes['full']]: size === 'full',
        },
        className,
      )}
    >
      <input
        {...rest}
        {...radioBoxInput.prop}
        ref={setInputElement}
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

      <div className={getBorderStyles({ checked, disabled, size })}>
        <InteractionRing
          className={interactionContainerStyle}
          disabled={disabled}
          focusTargetElement={inputElement}
          borderRadius="3px"
          color={{ hovered: checked ? uiColors.green.base : undefined }}
          forceState={{
            hovered: checked ? true : undefined,
          }}
        >
          <div className={cx(radioDisplayStyle, radioBoxSizes[size])}>
            {children}
          </div>
        </InteractionRing>
      </div>
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
