import { OneOf } from '@leafygreen-ui/lib';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

type PortalProps = {
  children?: React.ReactNode;
} & OneOf<{ container: HTMLElement }, { className?: string }>;

function createPortalContainer(className?: string): HTMLElement {
  const el = document.createElement('div');

  if (className) {
    el.className = className;
  }
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
      const defaultContainer =
        // Render needs to be idempotent, meaning it can't have side-effects.
        // In strict mode, React will call render more than once to exercise,
        // this which will result in multiple DOM elements being created if
        // the container element is created directly in render.
        // https://github.com/facebook/react/issues/15074#issuecomment-471197572
        createPortalContainer(props.className);

      setContainer(defaultContainer);

      return () => {
        defaultContainer.remove();
      };
    }
  }, [props.container]);

  // TODO(PD-702): Investigate using `usePrevious` hook from mongo-nav
  const prevPropsRef = useRef(props);

  useEffect(() => {
    const prevProps = prevPropsRef.current;
    prevPropsRef.current = props;

    if (
      prevProps.className !== props.className &&
      !props.container &&
      container
    ) {
      container.className = props.className ?? '';
    }
  });

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
