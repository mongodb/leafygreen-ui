import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ccClassName, emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';

const { css } = emotion;

const height = 20;
const width = 600;

const grooveStyle = css`
  transition: 300ms opacity ease-in-out;
  height: 32\px;
  width: 64px;
  display: inline-block;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
  opacity: 0.9;
`;

const checkboxStyle = css`
  height: ${height}px;
  width: ${width}px;
  background-size: contain;
  background-repeat: no-repeat;
`;

const inputStyle = css`
  margin: 0;
  position: absolute;
  left: 100%;
  top: 100%;
  pointer-events: none;
  opacity: 0;

  &:checked:not(:indeterminate):not(:disabled) + .${grooveStyle} {
    opacity: 1;

    & > .${checkboxStyle} {
      transition: 500ms transform steps(29);
      transform: translate3d(${-width + height}px, 0, 0);
    }
  }

  &:focus + .${grooveStyle}:after {
    content: '';
    bottom: 0;
    left: 3px;
    right: 3px;
    height: 2px;
    position: absolute;
    background-color: #43b1e5;
    border-radius: 2px;
  }
`;

const containerStyle = css`
  position: relative;
  display: inline-flex;
  align-items: flex-start;
  justify-content: flex-start;
  cursor: pointer;

  &:hover > .${grooveStyle} {
    opacity: 1;
  }

  /* Use [disabled] instead of &:disabled as this isn't an input element */
  &[disabled] {
    cursor: not-allowed;
  }
`;

export default class Checkbox extends PureComponent {
  static displayName = 'Checkbox';

  static defaultProps = {
    variant: 'default',
    label: '',
    disabled: false,
    indeterminate: false,
    className: '',
    onChange: () => {},
  };

  static propTypes = {
    variant: PropTypes.oneOf(['default', 'light']),
    checked: PropTypes.bool,
    label: PropTypes.node,
    disabled: PropTypes.bool,
    indeterminate: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
  };

  state = { checked: false };

  componentDidMount() {
    this.inputRef.current.indeterminate = this.props.indeterminate;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.indeterminate !== this.props.indeterminate) {
      this.inputRef.current.indeterminate = this.props.indeterminate;
    }
  }

  inputRef = React.createRef();
  checkboxId = `checkbox-${Math.floor(Math.random() * 10000000)}`;

  onClick = e => {
    const { onClick } = this.props;

    if (onClick) {
      onClick(e);
    }

    // For Microsoft Edge and IE, when checkbox is indeterminate, change event does not fire when clicked.
    // Explicitly call onChange for this case
    if (this.inputRef && this.inputRef.indeterminate) {
      this.onChange(e);
      e.stopPropagation();
    }
  };

  onChange = e => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(e);
    }

    this.setState({ checked: e.target.checked });
  };

  render() {
    const {
      name = `${this.checkboxId}`,
      checked = this.state.checked,
      className,
      label,
      disabled,
      ...rest
    } = this.props;

    // Indeterminate isn't a valid HTML prop
    delete rest.indeterminate;

    return (
      <label
        className={ccClassName(className, containerStyle)}
        htmlFor={this.checkboxId}
        disabled={disabled}
      >
        <input
          {...rest}
          id={this.checkboxId}
          ref={this.inputRef}
          className={inputStyle}
          type="checkbox"
          role="checkbox"
          name={name}
          disabled={disabled}
          checked={checked}
          aria-disabled={disabled}
          aria-checked={checked}
          onClick={this.onClick}
          onChange={this.onChange}
        />

        <div className={grooveStyle}>
          <div className={checkboxStyle} />
        </div>
      </label>
    );
  }
}
