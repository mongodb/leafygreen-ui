import type { OneOf } from '@leafygreen-ui/lib';
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
  const [container, setContainer] = useState(props.container);

  useEffect(() => {
    if (!container) {
      setContainer(
        // Render needs to be idempotent, meaning it can't have side-effects.
        // In stict mode, React will call render more than once to exercise,
        // this which will result in multiple DOM elements being created if
        // the container element is created directly in render.
        // https://github.com/facebook/react/issues/15074#issuecomment-471197572
        createPortalContainer(props.className),
      );
    }
  }, []);

  useEffect(
    () => () => {
      if (!props.container && container) {
        container.remove();
      }
    },
    [container],
  );

  // TODO(PD-702): Investigate using `usePrevious` hook from mongo-nav
  const prevPropsRef = useRef(props);

  useEffect(() => {
    const prevProps = prevPropsRef.current;
    prevPropsRef.current = props;

    if (prevProps.container !== props.container) {
      // Sending consumer console error to control how this component is used
      // eslint-disable-next-line no-console
      console.error(
        'Changing the Portal container is not supported behavior and may cause unintended side effects. Instead, create a new Portal instance.',
      );
      return;
    }

    if (prevProps.className !== props.className && container) {
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
