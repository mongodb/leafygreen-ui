import React from 'react';
import PropTypes from 'prop-types';
import { DarkModeProps, isComponentType } from '@leafygreen-ui/lib';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { css, cx } from '@leafygreen-ui/emotion';
import { Size } from './types';

export interface RadioGroupProps extends DarkModeProps {

  /**
   * className supplied to RadioGroup container.
   */
  className?: string;

  /**
   * Callback to be executed when a Radio is selected.
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * Content that will appear inside of RadioGroup component.
   */
  children: React.ReactNode;

  /**
   * Name passed to each Radio belonging to the RadioGroup.
   */
  name?: string;

  /**
   * Determines what radio will be checked on default. Component will be controlled if this prop is used.
   */
  value?: string | number | null;

  /**
   * Determines the size of the Radio components Can be 'small' or 'default.
   *
   * @default default
   */
  size?: Size;
}

/**
 * # RadioGroup
 *
 * RadioGroup component
 *
 * ```
<RadioGroup onChange={() => execute callback onChange}>
  <Radio value='Radio-1'>Radio 1</Radio>
  <Radio value='Radio-2'>Radio 2</Radio>
</RadioGroup>
```
 * @param props.children Content to appear inside of RadioGroup component.
 * @param props.onChange Callback to be executed when a Radio is selected.
 * @param props.value Radio that should appear checked. If value passed, component will be controlled by consumer.
 * @param props.className classname applied to RadioGroup container.
 * @param props.name Name passed to each Radio belonging to the RadioGroup.
 * @param props.darkMode Determines whether or not the RadioGroup will appear in dark mode.
 * @param props.size Determines the size of the Radio components Can be 'small' or 'default.
 */
function RadioGroup({
  darkMode = false,
  size = Size.Default,
  className,
  onChange,
  children,
  value: controlledValue,
  name: nameProp,
}: RadioGroupProps) {
  let isControlled = controlledValue != null ? true : false,
    defaultChecked = '';

  React.Children.forEach(children, child => {
    if (isComponentType(child, 'Radio')) {
      if (child.props.checked != null) {
        isControlled = true;
      }

      if (child.props.default) {
        defaultChecked = child.props.value;
      }
    }
  });

  const [uncontrolledValue, setUncontrolledValue] =
    React.useState<string>(defaultChecked);

  const name = useIdAllocator({ prefix: 'radio-group', id: nameProp });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }

    if (!isControlled) {
      setUncontrolledValue(e.target.value);
    }
  };

  const renderedChildren = React.Children.map(children, (child, index) => {
    if (!isComponentType(child, 'Radio')) {
      return child;
    }

    const checked = isControlled
      ? child.props.value === controlledValue || child.props.checked
      : child.props.value === uncontrolledValue;

    return React.cloneElement(child, {
      onChange: handleChange,
      id: child.props.id || `${name}-${index}`,
      checked,
      darkMode,
      name,
      size,
    });
  });

  return (
    <div
      className={cx(
        css`
          width: 700px;
        `,
        className,
      )}
      role="group"
      aria-label={name}
    >
      {renderedChildren}
    </div>
  );
}

RadioGroup.propTypes = {
  darkMode: PropTypes.bool,
  size: PropTypes.oneOf(['xsmall', 'small', 'default']),
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  children: PropTypes.node,
  name: PropTypes.string,
};

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
