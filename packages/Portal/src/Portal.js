import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

export default class Portal extends Component {
  static displayName = 'Portal';

  static propTypes = {
    children: PropTypes.node,
    container: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  };

  static createPortalContainer = nodeType => {
    const el = document.createElement(nodeType || 'div');
    document.body.appendChild(el);

    return {
      el,
      remove: () => document.body.removeChild(el),
    };
  };

  state = { defaultContainer: null };

  componentDidMount = () => {
    if (!this.props.container) {
      this.setState({ defaultContainer: Portal.createPortalContainer() });
    }
  };

  shouldComponentUpdate = nextProps => {
    if (nextProps.container !== this.props.container) {
      console.error(
        'Changing the Portal container is not supported behavior and may cause unintended side effects. Instead, create a new Portal instance',
      );
      return false;
    }
    return true;
  };

  componentWillUnmount = () => {
    if (this.state.defaultContainer) {
      const {
        defaultContainer: { el, remove },
      } = this.state;
      if (!this.props.container) {
        remove();
      }
    }
  };

  render() {
    const { defaultContainer } = this.state;
    const {
      container = defaultContainer && defaultContainer.el,
      children,
    } = this.props;

    return container && createPortal(children, container);
  }
}
