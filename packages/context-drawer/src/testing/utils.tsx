import React from 'react';
import {
  renderAsyncTest,
  type RenderAsyncTestReturnType,
} from '@lg-tools/test-harnesses';
import { render, type RenderResult } from '@testing-library/react';

import { LgIdString } from '@leafygreen-ui/lib';

import { ContextDrawer, type ContextDrawerProps } from '../ContextDrawer';
import { ContextDrawerButton } from '../ContextDrawerButton';

export const DEFAULT_LGID_ROOT = 'lg-context_drawer';

export const getLgIds = (root: LgIdString = DEFAULT_LGID_ROOT) => {
  return {
    root,
    toggleButton: `${root}-toggle_button`,
  } as const;
};

const MockContextDrawer = (props: Partial<ContextDrawerProps> = {}) => {
  return (
    <ContextDrawer
      reference={<div>Reference</div>}
      content={<div>Drawer content</div>}
      trigger={<ContextDrawerButton>Trigger</ContextDrawerButton>}
      {...props}
    />
  );
};

export const renderAsyncContextDrawer = (
  props: Partial<ContextDrawerProps> = {},
): RenderAsyncTestReturnType => {
  return renderAsyncTest(<MockContextDrawer {...props} />, render);
};

export const renderContextDrawer = (
  props: Partial<ContextDrawerProps> = {},
): RenderResult => {
  return render(<MockContextDrawer {...props} />);
};

export const renderMultipleContextDrawers = (): RenderResult => {
  return render(
    <>
      <MockContextDrawer
        data-lgid="lg-context_drawer-1"
        trigger={<ContextDrawerButton>Trigger 1</ContextDrawerButton>}
      />
      <MockContextDrawer
        data-lgid="lg-context_drawer-2"
        trigger={<ContextDrawerButton>Trigger 2</ContextDrawerButton>}
      />
    </>,
  );
};
