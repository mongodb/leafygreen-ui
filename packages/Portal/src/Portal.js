import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

export default class Portal extends PureComponent {
  static displayName = 'Portal';

  static propTypes = {
    children: PropTypes.node,
    container: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  };

  constructor(props){
    super(props)

    if (!this.props.container) {
      document.body.appendChild(this.defaultContainer);
    }
  }

  componentWillUnmount = () => {
    if (!this.props.container) {
      document.body.removeChild(this.defaultContainer);
    }
  };

  defaultContainer = document.createElement('div');

  render() {
    const { container, children } = this.props;

    return createPortal(children, container || this.defaultContainer);
  }
}
