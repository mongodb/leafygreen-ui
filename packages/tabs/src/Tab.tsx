import React from 'react';
import PropTypes from 'prop-types';

export interface TabProps {
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
   * If Tabs component is uncontrolled, this determines what Tab will be active on first render.
   */
  default?: boolean;

  /**
   * Value supplied to aria-control attribute.
   */
  className?: string;

  /**
   * Destination when title is rendered as `a` tag.
   */
  href?: string;

  /**
   * Destination when title is rendered as `Link` tag.
   */
  to?: string;

  active?: boolean;

  ariaControl?: string;

  // Done in order to support any Router system, such that title component can accept any URL destination prop.
  [key: string]: any;
}

/**
 * # Tab
 *
 * Tab panel component
 *
 * ```
  <Tab value='tab-1' title='First Tab'>Tab 1</Tab>
```
 * @param props.children Content that will appear inside of Tab panel.
 * @param props.disabled Boolean that determines if the Tab is disabled.
 * @param props.title Title that will appear in Tab List.
 * @param props.className Value supplied to aria-control attribute.
 * @param props.default If Tabs component is uncontrolled, this determines what Tab will be active on first render.
 * @param props.href Destination when title is rendered as `a` tag.
 * @param props.to Destination when title is rendered as `Link` tag.
 *
 */
function Tab({
  value,
  active,
  children,
  disabled = false,
  ariaControl,
  ...rest
}: TabProps) {
  if (!active) {
    return null;
  }

  // default and title are not an HTML properties
  delete rest.default, delete rest.title;

  return (
    <div
      {...rest}
      aria-disabled={disabled}
      aria-selected={active}
      aria-controls={ariaControl}
      data-tab-id={value}
      role="tabpanel"
    >
      {children}
    </div>
  );
}

Tab.displayName = 'Tab';

Tab.propTypes = {
  value: PropTypes.string,
  active: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string,
  content: PropTypes.node,
  disabled: PropTypes.bool,
  ariaControl: PropTypes.string,
};

export default Tab;
