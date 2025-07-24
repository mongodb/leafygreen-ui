import { LayoutComponentProps } from '../LayoutComponent/LayoutComponent.types';

export type OverlayDrawerLayoutProps = Omit<LayoutComponentProps, 'drawer'> & {
  isDrawerOpen?: never;
};
