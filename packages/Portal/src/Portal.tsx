import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

interface PortalContainer {
  el: Element;
  remove: () => Element;
}

interface PortalProps {
  children?: React.ReactNode;
  container?: HTMLElement;
}

interface PortalState {
  defaultContainer: PortalContainer | null;
}

export default class Portal extends Component<PortalProps, PortalState> {
  static displayName = 'Portal';

  static propTypes = {
    children: PropTypes.node,
    container: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  };

  static createPortalContainer(
    nodeType: keyof HTMLElementTagNameMap = 'div',
  ): PortalContainer {
    const el = document.createElement(nodeType);
    document.body.appendChild(el);

    return {
      el,
      remove: () => document.body.removeChild(el),
    };
  }

  state: PortalState = { defaultContainer: null };

  componentDidMount() {
    if (!this.props.container) {
      this.setState({ defaultContainer: Portal.createPortalContainer() });
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.container !== nextProps.container) {
      // Sending consumer console error to control how this component is used
      // and prevent unintended side-effects
      // eslint-disable-next-line no-console
      console.error(
        'Changing the Portal container is not supported behavior and \
        may cause unintended side effects. Instead, create a new \
        Portal instance',
      );
      return false;
    }

    return true;
  }

  componentWillUnmount() {
    const { defaultContainer } = this.state;

    if (defaultContainer) {
      defaultContainer.remove();
    }
  }

  render() {
    const { defaultContainer } = this.state;
    const {
      container = defaultContainer && defaultContainer.el,
      children,
    } = this.props;

    return container && createPortal(children, container);
  }
}
