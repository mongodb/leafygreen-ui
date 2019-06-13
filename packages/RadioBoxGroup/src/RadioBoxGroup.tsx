import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import RadioBox, { RadioBoxProps } from './RadioBox';
import Size from './Size';

const baseGroupStyle = css`
  display: flex;
`;

interface RadioBoxGroupProps {
  children?: React.ReactNode;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
  value?: string | number;
  size: Size;
  className?: string;
}

interface RadioBoxGroupState {
  value: string | number;
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

export default class RadioBoxGroup extends PureComponent<
  RadioBoxGroupProps & React.HTMLAttributes<HTMLDivElement>,
  RadioBoxGroupState
> {
  static displayName = 'RadioBoxGroup';

  static propTypes = {
    children: PropTypes.node,
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    size: PropTypes.oneOf(['compact', 'default', 'full']),
    className: PropTypes.string,
  };

  static defaultProps = {
    onChange: () => {},
    size: 'default',
  };

  state: RadioBoxGroupState = {
    value: '',
  };

  defaultName = `radio-box-group-${Math.floor(Math.random() * 1000000)}`;

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange, value } = this.props;

    if (onChange) {
      // Stopped propagation to prevent event from bubbling with new target, and thus value coming back as undefined
      e.stopPropagation();
      onChange(e);
    }

    if (!value) {
      this.setState({ value: e.target.value });
    }
  };

  render() {
    const {
      children,
      className,
      size,
      name = this.defaultName,
      value = this.state.value,
      ...rest
    } = this.props;

    const renderedChildren = React.Children.map(children, (child, index) => {
      if (!isRadioBoxElement(child)) {
        return child;
      }

      return React.cloneElement(child, {
        onChange: this.handleChange,
        checked: value === child.props.value,
        id: child.props.id || `${this.defaultName}-button-${index}`,
        size,
        name,
      });
    });

    return (
      <div {...rest} className={cx(baseGroupStyle, className)}>
        {renderedChildren}
      </div>
    );
  }
}
