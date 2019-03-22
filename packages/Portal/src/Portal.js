import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

export default class Portal extends Component {
  static displayName = 'portal';

  static propTypes = {
    children: PropTypes.node,
    container: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  };

  static defaultProps = {
    container: document.createElement('div'),
  };

  componentDidMount = () => {
    const { container } = this.props;
    document.body.appendChild(container);
    this.forceUpdate();
  };

  componentWillUnmount = () => {
    const { container } = this.props;
    document.body.removeChild(container);
  };

  render() {
    const { container } = this.props;
    return createPortal(this.props.children, container);
  }
}
