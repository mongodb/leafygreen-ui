import React from 'react';
import PropTypes from 'prop-types';

export interface TabProps {
  /**
   * Content that will appear as the title in the Tab List.
   */
  name: string | React.ReactNode;

  /**
   * Content that will appear inside of Tab Panel.
   */
  children?: React.ReactNode;

  /**
   * Boolean that determines if the Tab is disabled.
   */
  disabled?: boolean;

  /**
   * If Tabs component is uncontrolled, this determines what Tab will be active on first render.
   */
  default?: boolean;

  /**
   * Adds a className to the root element.
   */
  className?: string;

  /**
   * Destination when name is rendered as `a` tag.
   */
  href?: string;

  /**
   * Destination when name is rendered as `Link` tag.
   */
  to?: string;

  active?: boolean;

  ariaControl?: string;

  // Done in order to support any Router system, such that TabTitle component can accept any URL destination prop.
  [key: string]: any;
}

/**
 * # Tab
 *
 * Tab panel component
 *
 * ```
  <Tab name='First Tab'>Tab 1</Tab>
```
 * @param props.children Content that will appear inside of Tab panel.
 * @param props.disabled Boolean that determines if the Tab is disabled.
 * @param props.name Name that will appear in Tab List.
 * @param props.className Adds a className to the root element.
 * @param props.default If Tabs component is uncontrolled, this determines what Tab will be active on first render.
 * @param props.href Destination when name is rendered as `a` tag.
 * @param props.to Destination when name is rendered as `Link` tag.
 *
 */
function Tab({
  active,
  children,
  disabled = false,
  ariaControl,
  ...rest
}: TabProps) {
  if (!active) {
    return null;
  }

  // default and name are not an HTML properties
  delete rest.default, delete rest.name;

  return (
    <div
      {...rest}
      aria-disabled={disabled}
      aria-selected={active}
      aria-controls={ariaControl}
      role="tabpanel"
    >
      {children}
    </div>
  );
}

Tab.displayName = 'Tab';

Tab.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  content: PropTypes.node,
  disabled: PropTypes.bool,
  ariaControl: PropTypes.string,
};

export default Tab;
