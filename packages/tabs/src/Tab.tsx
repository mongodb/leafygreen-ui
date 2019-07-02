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
  index?: number;
}

function Tab({
  value,
  active,
  children,
  disabled = false,
  as = 'div',
  className,
  index,
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
      aria-selected={active}
      aria-controls={`tab-${index}`}
      data-tab-id={value}
      className={className}
      role="tabpanel"
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
