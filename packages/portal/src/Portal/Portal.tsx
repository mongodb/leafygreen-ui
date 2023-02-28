import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { useIsomorphicLayoutEffect } from '@leafygreen-ui/hooks';

import { PortalProps } from './Portal.types';

export function usePortalContainer(customContainer?: HTMLElement) {
  // Make container initially undefined so that the portal is not created
  // or rendered on initial render. This allows server-side rendering since:
  //  - ReactDOMServer cannot render portals
  //  - A component's initial hydrated render should match the server render
  const [container, setContainer] = React.useState<HTMLElement | undefined>();

  useIsomorphicLayoutEffect(() => {
    if (customContainer) {
      setContainer(customContainer);
    } else {
      const defaultContainer = document.createElement('div');
      document.body.appendChild(defaultContainer);

      setContainer(defaultContainer);

      return () => {
        defaultContainer.remove();
      };
    }
  }, [customContainer]);

  return container;
}

/**
 * Portals transport their children to a div that is appended to the end of `document.body` to or a node that can be specified with a container prop.
 */
function Portal(props: PortalProps) {
  const container = usePortalContainer(props.container ?? undefined);

  useIsomorphicLayoutEffect(() => {
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
