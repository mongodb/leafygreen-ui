import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

export default class Portal extends Component {
  static displayName = 'portal';

  static propTypes = {
    children: PropTypes.node,
    node: PropTypes.any,
  };

  static defaultProps = {
    node: document.createElement('div'),
  };

  componentDidMount = () => {
    const { node } = this.props;
    document.body.appendChild(node);
    this.forceUpdate();
  };

  componentWillUnmount = () => {
    const { node } = this.props;
    document.body.removeChild(node);
  };

  render() {
    const { node } = this.props;
    return createPortal(this.props.children, node);
  }
}
