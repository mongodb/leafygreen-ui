import React from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';

import { Size } from '../types';

import { radioGroupStyles } from './RadioGroup.styles';
import { RadioGroupProps } from './RadioGroup.types';

/**
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
 * @param props.className className applied to RadioGroup container.
 * @param props.name Name passed to each Radio belonging to the RadioGroup.
 * @param props.darkMode Determines whether or not the RadioGroup will appear in dark mode.
 * @param props.size Determines the size of the Radio components Can be 'small' or 'default.
 */
function RadioGroup({
  darkMode: darkModeProp,
  size = Size.Default,
  className,
  onChange,
  children,
  value: controlledValue,
  name: nameProp,
  bold = true,
  ...rest
}: RadioGroupProps) {
  let isControlled = controlledValue != null ? true : false,
    defaultChecked = '';

  const { darkMode } = useDarkMode(darkModeProp);

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
      bold,
    });
  });

  return (
    <div
      className={cx(radioGroupStyles, className)}
      role="group"
      aria-label={name}
      {...rest}
    >
      {renderedChildren}
    </div>
  );
}

RadioGroup.propTypes = {
  darkMode: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(Size)),
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  children: PropTypes.node,
  name: PropTypes.string,
};

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
