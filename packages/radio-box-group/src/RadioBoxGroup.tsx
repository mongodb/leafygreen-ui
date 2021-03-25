import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import RadioBox, { RadioBoxProps } from './RadioBox';
import Size from './Size';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { useIdAllocator } from '@leafygreen-ui/hooks';

const baseGroupStyle = css`
  display: flex;
`;

interface RadioBoxGroupProps extends HTMLElementProps<'div', never> {
  /**
   * Content that will appear inside of RadioBoxGroup component.
   */
  children?: React.ReactNode;

  /**
   * Callback to be executed when a RadioBox is selected.
   */
  onChange: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * Name passed to each RadioBox belonging to the RadioGroup.
   */
  name?: string;

  /**
   * Determines what RadioBox will be checked on default. Component will be controlled if this prop is used.
   */
  value?: string | number;

  /**
   * Determines size of RadioBox components ['default', 'compact', 'full'].
   */
  size: Size;

  /**
   * className supplied to RadioBoxGroup container.
   */
  className?: string;
}

function isRadioBoxElement(
  element: React.ReactNode,
): element is React.ReactElement<RadioBoxProps, typeof RadioBox> {
  return (
    element != null &&
    typeof element === 'object' &&
    'type' in element &&
    (element.type as any).displayName === 'RadioBox'
  );
}

/**
 * # RadioBoxGroup
 *
 * RadioBoxGroup component
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
 * @param props.className classname applied to RadioBoxGroup container.
 * @param props.size Determines size of RadioBox components ['default', 'compact', 'full'].
 */
function RadioBoxGroup({
  children,
  className,
  size = Size.Default,
  onChange = () => {},
  name, // = this.defaultName,
  value: controlledValue,
  ...rest
}: RadioBoxGroupProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<
    string | null
  >(null);

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

  const renderedChildren = React.Children.map(children, (child, index) => {
    if (!isRadioBoxElement(child)) {
      return child;
    }

    let checked;

    if (controlledValue) {
      checked = controlledValue === child.props.value;
    } else {
      checked = uncontrolledValue
        ? uncontrolledValue === child.props.value
        : child.props.default;
    }

    return React.cloneElement(child, {
      onChange: handleChange,
      id: child.props.id || `${defaultName}-button-${index}`,
      checked,
      size,
      name: defaultName,
    });
  });

  return (
    <div
      {...rest}
      className={cx(baseGroupStyle, className)}
      role="group"
      aria-label={defaultName}
    >
      {renderedChildren}
    </div>
  );
}

RadioBoxGroup.displayName = 'RadioBoxGroup';

RadioBoxGroup.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOf(['compact', 'default', 'full']),
  className: PropTypes.string,
};

export default RadioBoxGroup;
