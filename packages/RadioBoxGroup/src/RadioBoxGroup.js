import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import RadioBox from './RadioBox';

const baseGroupStyle = css`
  display: flex;
`;

export default class RadioBoxGroup extends PureComponent {
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

  state = {
    value: '',
  };

  defaultName = `radio-box-group-${Math.floor(Math.random() * 1000000)}`;

  handleChange = e => {
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
      if (child.type.displayName !== RadioBox.displayName) {
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
