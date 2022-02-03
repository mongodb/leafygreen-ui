import { OneOf } from '@leafygreen-ui/lib';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useIsomorphicLayoutEffect } from '@leafygreen-ui/hooks';

type PortalProps = {
  children?: React.ReactNode;
} & OneOf<
  { container: HTMLElement; className?: never },
  { className?: string; container?: null }
>;

function usePortalContainer(customContainer?: HTMLElement) {
  // Make container initially undefined so that the portal is not created
  // or rendered on initial render. This allows server-side rendering since:
  //  - ReactDOMServer cannot render portals
  //  - A component's initial hydrated render should match the server render
  const [container, setContainer] = useState<HTMLElement | undefined>();

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
