import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { colors } from '@leafygreen-ui/theme';
import { ccClassName, emotion } from '@leafygreen-ui/lib';
import Variant from './Variant';
import Radio, { RadioProps } from './Radio';

const { css } = emotion;

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
  variant: Variant;
  className: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  children: React.ReactNode;
  name?: string;
  value?: string | number | null;
}

interface RadioGroupState {
  value: string | number | null;
}

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

  defaultName = `radio-group-${Math.floor(Math.random() * 1000000)}`;

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

      return React.cloneElement(child, {
        onChange: this.handleChange,
        checked: value === child.props.value,
        id: child.props.id || `${this.defaultName}-button-${index}`,
        variant,
        name,
      });
    });

    const variantStyle = groupVariants[variant];

    return (
      <div
        className={ccClassName(
          css`
            ${variantStyle} ${baseStyle}
          `,
          className,
        )}
      >
        {renderChildren}
      </div>
    );
  }
}
