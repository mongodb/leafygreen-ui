import React from 'react';

export type PanelGridProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'children'
> & {
  children: React.ReactNode;
};
