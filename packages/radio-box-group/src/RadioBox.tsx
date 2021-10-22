import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { HTMLElementProps, createDataProp } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import InteractionRing from '@leafygreen-ui/interaction-ring';
import { uiColors } from '@leafygreen-ui/palette';
import Size from './Size';
import { useRadioBoxGroupContext, RadioBoxGroupContext } from './context';

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

const getInteractionRingStyles = (_: StateForStyles) => {
  const baseStyles = css`
    width: 100%;
    height: 100%;
    // Display behind border
    z-index: -1;
  `;

  return baseStyles;
};

const getBorderStyles = ({ checked, disabled, size }: StateForStyles) => {
  const baseStyles = cx(
    css`
      border: 1px solid ${checked ? 'transparent' : uiColors.gray.base};
      border-radius: 4px;
      cursor: pointer;
      position: relative;
      pointer-events: none;
      transition: border 100ms ease-in-out;
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
    overflow-wrap: break-word;
    background-color: white;
    border-radius: 4px;
    color: ${uiColors.gray.dark2};
    pointer-events: auto;
    z-index: 2;

    display: flex;
    align-items: center;
    justify-content: center;
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
export default function RadioBox({
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
  ...rest
}: RadioBoxProps & Omit<HTMLElementProps<'input', never>, 'size'>) {
  const radioBoxGroupContext = useRadioBoxGroupContext();

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

      <div
        className={cx(
          css`
            height: 100%;
          `,
          getBorderStyles({ checked, disabled, size }),
        )}
      >
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
