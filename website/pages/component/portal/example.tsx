import React, { useState } from 'react';

import LiveExample from 'components/live-example';

import Portal from '@leafygreen-ui/portal';

import { css } from '@emotion/css';

const portalChildrenStyle = css`
  text-align: center;
`;

export default function PortalLiveExample() {
  const [node, setNode] = useState<HTMLDivElement | null>();

  return (
    <LiveExample knobsConfig={{}}>
      {() => (
        <>
          <div ref={setNode} />
          <Portal container={node}>
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
