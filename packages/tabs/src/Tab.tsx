import React from 'react';
import PropTypes from 'prop-types';

export interface TabProps {
  value: string;
  active?: boolean;
  title?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  as?: React.ElementType<any>;
  default?: boolean;
  className?: string;
}

function Tab({
  value,
  active,
  children,
  disabled = false,
  as = 'div',
  className,
  ...rest
}: TabProps) {
  if (!active) {
    return null;
  }

  const Root = as;

  // default is not an HTML property
  delete rest.default;

  return (
    <Root
      disabled={disabled}
      aria-disabled={disabled}
      data-tab-id={value}
      className={className}
      {...rest}
    >
      {children}
    </Root>
  );
}

Tab.displayName = 'Tab';

Tab.propTypes = {
  value: PropTypes.string,
  active: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.node,
  disabled: PropTypes.bool,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  className: PropTypes.string,
};

export default Tab;
