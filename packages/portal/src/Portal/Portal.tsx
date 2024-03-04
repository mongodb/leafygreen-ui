import React, { MutableRefObject } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { useIsomorphicLayoutEffect } from '@leafygreen-ui/hooks';

import { PortalProps } from './Portal.types';

export function usePortalContainer(
  customContainer?: HTMLElement,
  portalRef?: MutableRefObject<HTMLElement>,
) {
  // Make container initially undefined so that the portal is not created
  // or rendered on initial render. This allows server-side rendering since:
  //  - ReactDOMServer cannot render portals
  //  - A component's initial hydrated render should match the server render
  const [container, setContainer] = React.useState<HTMLElement | undefined>();

  useIsomorphicLayoutEffect(() => {
    if (customContainer) {
      setContainer(customContainer);
    } else {
      // const element = React.createElement('div', {})
      const defaultContainer = document.createElement('div');

      if (portalRef) {
        portalRef.current = defaultContainer;
      }

      document.body.appendChild(defaultContainer);

      setContainer(defaultContainer);

      return () => {
        defaultContainer.remove();
      };
    }
  }, [customContainer, portalRef]);

  return container;
}

/**
 * Portals transport their children to a div that is appended to the end of `document.body` to or a node that can be specified with a container prop.
 */
function Portal({
  container,
  className,
  children,
  _ref,
}: PortalProps): React.ReactPortal | null {
  const portalContainer = usePortalContainer(container ?? undefined, _ref);

  useIsomorphicLayoutEffect(() => {
    if (portalContainer && !container) {
      portalContainer.className = className ?? '';
    }
  }, [container, portalContainer, className]);

  if (!portalContainer) {
    return null;
  }

  return createPortal(children, portalContainer);
}

Portal.displayName = 'Portal';

Portal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  container: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
};

export default Portal;
