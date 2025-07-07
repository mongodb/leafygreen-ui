import React from 'react';
import {
  renderAsyncTest,
  type RenderAsyncTestReturnType,
} from '@lg-tools/test-harnesses';
import { render, type RenderResult } from '@testing-library/react';

import { PreviewCard } from '../PreviewCard';

export const DEFAULT_LGID_ROOT = 'lg-preview_card';

export const getLgIds = (root: `lg-${string}` = DEFAULT_LGID_ROOT) => {
  return {
    root,
    toggle: `${root}-toggle`,
    content: `${root}-content`,
  } as const;
};

export const renderAsyncPreviewCard = (): RenderAsyncTestReturnType => {
  return renderAsyncTest(
    <PreviewCard>
      <div>Content</div>
      <button>Focusable</button>
    </PreviewCard>,
    render,
  );
};

export const renderPreviewCard = (props = {}): RenderResult => {
  return render(
    <PreviewCard {...props}>
      <div>Content</div>
      <button>Focusable</button>
    </PreviewCard>,
  );
};

export const renderMultiplePreviewCards = (): RenderResult => {
  return render(
    <>
      <PreviewCard data-lgid="lg-preview_card">Content 1</PreviewCard>
      <PreviewCard
        data-lgid="lg-preview_card-2"
        isOpen={true}
        onOpenChange={() => {}}
      >
        Content 2
      </PreviewCard>
    </>,
  );
};
