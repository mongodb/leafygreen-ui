import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

export default class Portal extends Component {
  static displayName = 'Portal';

  static propTypes = {
    children: PropTypes.node,
    container: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  };

  componentWillUnmount = () => {
    const { container } = this.props;
    if (!container) {
      document.body.removeChild(this.defaultContainer);
    }
  };

  render() {
    const { container } = this.props;

    if (!container) {
      this.defaultContainer = document.createElement('div');
      document.body.appendChild(this.defaultContainer);
    }

    return createPortal(
      this.props.children,
      container || this.defaultContainer,
    );
  }
}
