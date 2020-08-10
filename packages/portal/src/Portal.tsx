import { OneOf } from '@leafygreen-ui/lib';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

type PortalProps = {
  children?: React.ReactNode;
} & OneOf<{ container: HTMLElement }, { className?: string }>;

function createPortalContainer(): HTMLElement {
  const el = document.createElement('div');
  document.body.appendChild(el);
  return el;
}

function Portal(props: PortalProps) {
  // Make container initially undefined so that the portal is not created
  // or rendered on initial render. This allows server-side rendering since:
  //  - ReactDOMServer cannot render portals
  //  - A component's initial hydrated render should match the server render
  const [container, setContainer] = useState<HTMLElement | undefined>();

  useEffect(() => {
    if (props.container) {
      setContainer(props.container);
    } else {
      const defaultContainer = createPortalContainer();
      setContainer(defaultContainer);
      return () => {
        defaultContainer.remove();
      };
    }
  }, [props.container]);

  useEffect(() => {
    if (container && !props.container) {
      container.className = props.className ?? '';
    }
  }, [container, props.container, props.className]);

  if (!container) {
    return null;
  }

  return createPortal(props.children, container);
}

Portal.displayName = 'Portal';

Portal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  container: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
};

export default Portal;
