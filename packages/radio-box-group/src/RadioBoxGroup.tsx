import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import Size from './Size';
import { IdAllocator, HTMLElementProps } from '@leafygreen-ui/lib';
import { Provider } from './context';

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

interface RadioBoxGroupState {
  value: string | number | undefined;
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
export default class RadioBoxGroup extends PureComponent<
  RadioBoxGroupProps,
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
    value: undefined,
  };

  private static idAllocator = IdAllocator.create('radio-box-group');
  private _defaultName?: string;

  private get defaultName(): string {
    if (!this._defaultName) {
      this._defaultName = RadioBoxGroup.idAllocator.generate();
    }

    return this._defaultName;
  }

  private _defaultNameIdAllocator?: IdAllocator;
  private get defaultNameIdAllocator(): IdAllocator {
    if (!this._defaultNameIdAllocator) {
      this._defaultNameIdAllocator = IdAllocator.create(
        `${this.defaultName}-button`,
      );
    }

    return this._defaultNameIdAllocator;
  }

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

    return (
      <Provider
        value={{
          value,
          getNextId: () => this.defaultNameIdAllocator.generate(),
          name,
          size,
          onChange: this.handleChange,
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
}
