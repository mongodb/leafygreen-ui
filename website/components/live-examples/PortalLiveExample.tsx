import React from 'react';
import { css } from 'emotion';
import Portal from '@leafygreen-ui/portal';
import LiveExample from '@leafygreen-ui/live-example';

const portalChildrenStyle = css`
  text-align: center;
`;

export default function PortalLiveExample() {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <LiveExample knobsConfig={{}}>
      {() => (
        <>
          <div ref={ref} />
          <Portal container={ref.current}>
            <div className={portalChildrenStyle}>
              Portals transport their children to a <code>div</code> that is
              appended to the end of the <code>document.body</code> to or a{' '}
              <code>node</code> that can be specified with a{' '}
              <code>container</code> prop.
            </div>
          </Portal>
        </>
      )}
    </LiveExample>
  );
}
