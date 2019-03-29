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

  constructor(props) {
    super(props);

    if (!this.props.container) {
      document.body.appendChild(this.defaultContainer);
    }
  }

  // Checking to see if the container rendering the Portal has changed and if we'd created the inital container
  // If so, we remove the previously created container
  componentDidUpdate(prevProps) {
    if (!prevProps.container && this.props.container) {
      document.body.removeChild(this.defaultContainer);
    }
  }

  componentWillUnmount = () => {
    if (!this.props.container) {
      document.body.removeChild(this.defaultContainer);
    }
  };


  render() {
    const { container = this.defaultContainer, children } = this.props;

    return createPortal(children, container);
  }
}
