/* eslint-disable no-console */
import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Toolbar, ToolbarProps } from '../Toolbar';
import { ToolbarIconButton } from '../ToolbarIconButton';

export const renderToolbarIconsButtons = ({
  isActive = true,
  hasExtraButtons = false,
}: {
  isActive?: boolean;
  hasExtraButtons?: boolean;
}) => (
  <>
    <ToolbarIconButton
      label="Code"
      glyph="Code"
      onClick={() => console.log('CODE')}
    />
    <ToolbarIconButton
      label="Key"
      glyph="Key"
      onClick={() => console.log('KEY')}
    />
    <ToolbarIconButton
      label={<div>Megaphone</div>}
      glyph="Megaphone"
      onClick={() => console.log('MEGAPHONE')}
      active={isActive}
    />
    <ToolbarIconButton
      label="List"
      glyph="List"
      onClick={() => console.log('LIST')}
    />
    <ToolbarIconButton
      label="Plus"
      glyph="Plus"
      onClick={() => console.log('Plus')}
      disabled
    />
    {hasExtraButtons && (
      <>
        <ToolbarIconButton
          label="Array"
          glyph="Array"
          onClick={() => console.log('Array')}
        />
        <ToolbarIconButton
          label="Apps"
          glyph="Apps"
          onClick={() => console.log('Apps')}
        />
      </>
    )}
  </>
);

export const renderToolbar = ({
  ...props
}: Omit<ToolbarProps, 'children'>): RenderResult => {
  return render(<Toolbar {...props}>{renderToolbarIconsButtons({})}</Toolbar>);
};
