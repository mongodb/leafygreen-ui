import React from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { Provider } from './context';
import { baseGroupStyle } from './RadioBoxGroup.styles';
import { RadioBoxGroupProps, Size } from './types';

/**
 *
 * ```
<RadioBoxGroup onChange={() => execute callback onChange}>
  <RadioBox value='RadioBox-1'>RadioBox 1</RadioBox>
  <RadioBox value='RadioBox-2'>RadioBox 2</RadioBox>
</RadioBoxGroup>
```
 * @param props.children Content to appear inside of RadioBoxGroup component.
 * @param props.onChange Callback to be executed when a RadioBox is selected.
 * @param props.name Name passed to each RadioBox belonging to the RadioBoxGroup.
 * @param props.value RadioBox that should appear checked. If value passed, component will be controlled by consumer.
 * @param props.className className applied to RadioBoxGroup container.
 * @param props.size Determines size of RadioBox components ['default', 'compact', 'full'].
 */
export function RadioBoxGroup({
  children,
  className,
  size = Size.Default,
  onChange = () => {},
  name, // = this.defaultName,
  value: controlledValue,
  darkMode: darkModeProp,
  ...rest
}: RadioBoxGroupProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<
    string | number | undefined
  >();

  const { darkMode } = useDarkMode(darkModeProp);

  const defaultName = useIdAllocator({
    prefix: 'radio-box-group',
    id: name,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      // Stopped propagation to prevent event from bubbling with new target, and thus value coming back as undefined
      e.stopPropagation();
      onChange(e);
    }

    if (!controlledValue) {
      setUncontrolledValue(e.target.value);
    }
  };

  return (
    <Provider
      value={{
        value: controlledValue ?? uncontrolledValue,
        name: defaultName,
        size,
        onChange: handleChange,
        darkMode,
      }}
    >
      <div
        {...rest}
        className={cx(baseGroupStyle, className)}
        role="group"
        aria-label={name}
      >
        {children}
      </div>
    </Provider>
  );
}

RadioBoxGroup.displayName = 'RadioBoxGroup';

RadioBoxGroup.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOf(Object.values(Size)),
  className: PropTypes.string,
  darkMode: PropTypes.bool,
};
