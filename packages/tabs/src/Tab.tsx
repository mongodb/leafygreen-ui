import React from 'react';
import PropTypes from 'prop-types';

export interface TabProps {
  /**
   * Value supplied to the data-tab-id attribute. Used to determine what Tab is active.
   */
  value: string;

  /**
   * Set internally. Used to determine if the Tab is active.
   */
  active?: boolean;

  /**
   * Content that will appear as the title in the Tab list.
   */
  title: string;

  /**
   * Content that will appear inside of Tab panel.
   */
  children?: React.ReactNode;

  /**
   * Boolean that determines if the Tab is disabled.
   */
  disabled?: boolean;

  /**
   * Determines the HTML element the Tab panel will be wrapped in.
   */
  as?: React.ElementType<any>;

  /**
   * If Tabs component is uncontrolled, this determines what Tab will be active on first render.
   */
  default?: boolean;

  /**
   * className supplied to the Tab panel.
   */
  className?: string;

  /**
   * Used internally. Index to determine order of tabs for keyboard navigation.
   */
  index?: number;


  ariaControl: string;
}

/**
 * # Tab
 *
 * Tab panel component
 *
 * ```
  <Tab value='tab-1' title='First Tab'>Tab 1</Tab>
```
 * @param props.value Value supplied to the data-tab-id attribute. Used to determine what Tab is active.
 * @param props.active Set internally. Used to determine if the Tab is active.
 * @param props.children Content that will appear inside of Tab panel.
 * @param props.disabled Boolean that determines if the Tab is disabled.
 * @param props.as Determines the HTML element the Tab panel will be wrapped in.
 * @param props.className Classname applied to Tab panel container.
 * @param props.index Used internally. Index to determine order of tabs for keyboard navigation.
 * @param props.default If Tabs component is uncontrolled, this determines what Tab will be active on first render.
 */
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
      {...rest}
      disabled={disabled}
      aria-disabled={disabled}
      aria-selected={active}
      aria-controls={`tab-${index}`}
      data-tab-id={value}
      className={className}
      role="tabpanel"
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
