import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

export default class Portal extends Component {
  static displayName = 'Portal';

  static propTypes = {
    children: PropTypes.node,
    container: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  };

  defaultContainer = document.createElement('div');

  componentDidMount = () => {
    if (!this.props.container) {
      document.body.appendChild(this.defaultContainer);
      this.forceUpdate();
    }
  };

  componentWillUnmount = () => {
    if (!this.props.container) {
      document.body.removeChild(this.defaultContainer);
    }
  };

  render() {
    const { container = this.defaultContainer, children } = this.props;

    return children && createPortal(children, container);
  }
}
