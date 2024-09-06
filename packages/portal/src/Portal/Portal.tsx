import React, { MutableRefObject } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { useIsomorphicLayoutEffect } from '@leafygreen-ui/hooks';

import { PortalProps } from './Portal.types';

/**
 * We can't pass a ref to a `createPortal` function, so we attach the ref manually
 */
function attachPortalRef(
  container: HTMLElement,
  portalRef?: MutableRefObject<HTMLElement | null>,
) {
  if (!portalRef) {
    return;
  }
  portalRef.current = container;
}

export function usePortalContainer(
  customContainer?: HTMLElement,
  portalRef?: MutableRefObject<HTMLElement | null>,
) {
  // Make container initially null so that the portal is not created
  // or rendered on initial render. This allows server-side rendering since:
  //  - ReactDOMServer cannot render portals
  //  - A component's initial hydrated render should match the server render
  const [containerNode, setContainerNode] = React.useState<HTMLElement | null>(
    null,
  );
  const containerNodeRef = React.useRef<HTMLElement | null>(null);

  // remove the container node when the portal is unmounted
  useIsomorphicLayoutEffect(() => {
    return () => {
      // if the custom container is passed, do not remove it when the portal unmounts
      if (customContainer?.contains(containerNode)) {
        return;
      }
      containerNode?.remove();
    };
  }, [containerNode]);

  // if a `portalRef` is passed to portal component, wait to set the portalReference
  // until after the initial render
  useIsomorphicLayoutEffect(() => {
    if (customContainer) {
      attachPortalRef(customContainer, portalRef);
      containerNodeRef.current = customContainer;

      setContainerNode(customContainer);
      return;
    }

    if (containerNodeRef.current) {
      return;
    }

    const defaultContainer = document.createElement('div');
    document.body.appendChild(defaultContainer);

    attachPortalRef(defaultContainer, portalRef);
    containerNodeRef.current = defaultContainer;

    setContainerNode(defaultContainer);
  }, [containerNode, customContainer, portalRef]);

  return containerNode;
}

/**
 * Portals transport their children to a div that is appended to the end of `document.body` to or a node that can be specified with a container prop.
 */
function Portal({
  children,
  className,
  container,
  portalRef,
}: PortalProps): React.ReactPortal | null {
  const portalContainer = usePortalContainer(container ?? undefined, portalRef);

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
  portalRef: PropTypes.shape({
    current:
      typeof window !== 'undefined'
        ? PropTypes.instanceOf(Element)
        : PropTypes.any,
  }),
};

export default Portal;
