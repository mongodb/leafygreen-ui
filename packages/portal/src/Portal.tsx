import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

type PortalProps = {
  children?: React.ReactNode;
} & (
  | { container: HTMLElement; className?: never }
  | { container?: never; className?: string }
);

interface PortalState {
  container: HTMLElement;
}

function createPortalContainer(className?: string): HTMLElement {
  const el = document.createElement('div');

  if (className) {
    el.className = className;
  }
  document.body.appendChild(el);

  return el;
}

export default class Portal extends Component<PortalProps, PortalState> {
  static displayName = 'Portal';

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    container: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  };

  constructor(props: PortalProps) {
    super(props);
    this.state = {
      container: props.container ?? createPortalContainer(props.className),
    };
  }

  shouldComponentUpdate(nextProps: PortalProps) {
    if (
      this.props.container !== nextProps.container ||
      this.props.className !== nextProps.className
    ) {
      // Sending consumer console error to control how this component is used
      // and prevent unintended side-effects
      // eslint-disable-next-line no-console
      console.error(
        'Changing the Portal container or className is not supported behavior and \
        may cause unintended side effects. Instead, create a new Portal instance',
      );
      return false;
    }

    return true;
  }

  componentWillUnmount() {
    if (!this.props.container) {
      this.state.container.remove();
    }
  }

  render() {
    return createPortal(this.props.children, this.state.container);
  }
}
