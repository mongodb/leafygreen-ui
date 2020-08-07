import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { IdAllocator } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';
import { css, cx } from '@leafygreen-ui/emotion';
import Variant from './Variant';
import Radio, { RadioProps } from './Radio';

const groupVariants: { [K in Variant]: string } = {
  default: css`
    color: ${colors.gray[2]};
  `,

  light: css`
    color: ${colors.gray[6]};
  `,
};

const baseStyle = css`
  padding: 5px;
`;

function isRadioElement(
  element: React.ReactNode,
): element is React.ReactElement<RadioProps, typeof Radio> {
  return (
    element != null &&
    typeof element === 'object' &&
    'type' in element &&
    (element.type as any).displayName === 'Radio'
  );
}

interface RadioGroupProps {
  /**
   * Determines if the component will appear in default or light mode.
   */
  variant: Variant;

  /**
   * className supplied to RadioGroup container.
   */
  className: string;

  /**
   * Callback to be executed when a Radio is selected.
   */
  onChange: React.ChangeEventHandler<HTMLInputElement>;

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
}

interface RadioGroupState {
  value: string | number | null;
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
 * @param props.variant Variant to determine if component will appear `default` or `light`.
 */
export default class RadioGroup extends PureComponent<
  RadioGroupProps,
  RadioGroupState
> {
  static displayName = 'RadioGroup';

  static propTypes = {
    variant: PropTypes.oneOf(['default', 'light']),
    className: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    children: PropTypes.node,
    name: PropTypes.string,
  };

  static defaultProps = {
    variant: Variant.Default,
    className: '',
    onChange: () => {},
  };

  state: RadioGroupState = {
    value: null,
  };

  private static idAllocator = IdAllocator.create('radio-group');
  private _defaultName?: string;

  private get defaultName(): string {
    if (!this._defaultName) {
      this._defaultName = RadioGroup.idAllocator.generate();
    }

    return this._defaultName;
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange, value } = this.props;

    if (onChange) {
      onChange(e);
    }

    if (!value) {
      this.setState({ value: e.target.value });
    }
  };

  render() {
    const {
      children,
      name = this.defaultName,
      className,
      variant,
      value = this.state.value,
    } = this.props;

    // React.Children.map allows us to not pass key as prop while iterating over children
    const renderChildren = React.Children.map(children, (child, index) => {
      if (!isRadioElement(child)) {
        return child;
      }

      const checked =
        this.props.value === child.props.value || value
          ? value === child.props.value
          : child.props.default;

      return React.cloneElement(child, {
        onChange: this.handleChange,
        id: child.props.id || `${this.defaultName}-button-${index}`,
        checked,
        variant,
        name,
      });
    });

    const variantStyle = groupVariants[variant];

    return (
      <div
        className={cx(
          css`
            ${variantStyle} ${baseStyle}
          `,
          className,
        )}
        role="group"
        aria-label={name}
      >
        {renderChildren}
      </div>
    );
  }
}
