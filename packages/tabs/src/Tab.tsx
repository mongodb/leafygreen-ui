import React from 'react';
import PropTypes from 'prop-types';

export interface TabProps {
  /**
   * Value supplied to the data-tab-id attribute. Used to determine what Tab is active.
   */
  value: string;

  /**
   * Content that will appear as the title in the Tab list.
   */
  tabTitle: string;

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
   * Destination when TabTitle is rendered as `a` tag.
   */
  href?: string;

  /**
   * Destination when TabTitle is rendered as `Link` tag.
   */
  to?: string;

  active?: boolean;

  index?: number;

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
  <Tab value='tab-1' title='First Tab'>Tab 1</Tab>
```
 * @param props.value Value supplied to the data-tab-id attribute. Used to determine what Tab is active.
 * @param props.active Set internally. Used to determine if the Tab is active.
 * @param props.children Content that will appear inside of Tab panel.
 * @param props.disabled Boolean that determines if the Tab is disabled.
 * @param props.tabTitle Title that will appear in Tab List.
 * @param props.ariaControl Value supplied to aria-control attribute.
 * @param props.default If Tabs component is uncontrolled, this determines what Tab will be active on first render.
 * @param props.href Destination when TabTitle is rendered as `a` tag.
 * @param props.to Destination when TabTitle is rendered as `Link` tag.
 *
 */
function Tab(props: TabProps) {
  const {
    value,
    active,
    children,
    disabled = false,
    ariaControl,
    ...rest
  } = props;

  if (!active) {
    return null;
  }

  // default and title are not an HTML properties
  delete rest.default, delete rest.tabTitle;

  const renderTab = () => (
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

  return renderTab();
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
