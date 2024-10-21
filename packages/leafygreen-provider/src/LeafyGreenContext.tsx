import React, { PropsWithChildren, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { DarkModeProps } from '@leafygreen-ui/lib';

import { RenderMode } from './PopoverContext/PopoverContext.types';
import DarkModeProvider, { useDarkModeContext } from './DarkModeContext';
import {
  PopoverProvider,
  PopoverProviderProps,
  usePopoverContext,
} from './PopoverContext';
import TypographyProvider, {
  TypographyProviderProps,
  useBaseFontSize,
} from './TypographyContext';
import UsingKeyboardProvider from './UsingKeyboardContext';

type PopoverPortalContainerType = Pick<
  PopoverProviderProps,
  'portalContainer' | 'scrollContainer'
>;

export type LeafyGreenProviderProps = {
  /**
   * Define a container HTMLElement for components that utilize the `Portal` component
   */
  popoverPortalContainer?: PopoverPortalContainerType;
} & TypographyProviderProps &
  DarkModeProps;

function LeafyGreenProvider({
  children,
  baseFontSize: fontSizeProp,
  popoverPortalContainer: popoverPortalContainerProp,
  darkMode: darkModeProp,
}: PropsWithChildren<LeafyGreenProviderProps>) {
  /**
   * If `darkMode` prop is provided, use that. Otherwise, use context value
   */
  const { contextDarkMode: inheritedDarkMode } = useDarkModeContext();
  const [darkModeState, setDarkMode] = useState(
    darkModeProp ?? inheritedDarkMode,
  );

  useEffect(() => {
    setDarkMode(darkModeProp ?? inheritedDarkMode);
  }, [darkModeProp, inheritedDarkMode]);

  /**
   * If `baseFontSize` prop is provided, use that. Otherwise, use context value
   */
  const inheritedFontSize = useBaseFontSize();
  const baseFontSize = fontSizeProp ?? inheritedFontSize;

  /**
   * If `popoverPortalContainer` prop is provided, use that. Otherwise, use context value
   */
  const popoverContext = usePopoverContext();
  const inheritedPopoverContextContainers: PopoverPortalContainerType =
    Object.fromEntries(
      Object.entries(popoverContext).filter(([key, _]) =>
        ['portalContainer', 'scrollContainer'].includes(key),
      ),
    );
  const { portalContainer, scrollContainer } =
    popoverPortalContainerProp ?? inheritedPopoverContextContainers;
  const popoverProviderProps =
    portalContainer || scrollContainer
      ? { renderMode: RenderMode.Portal, portalContainer, scrollContainer }
      : ({
          renderMode: RenderMode.TopLayer,
        } as const);

  return (
    <UsingKeyboardProvider>
      <TypographyProvider baseFontSize={baseFontSize}>
        <DarkModeProvider
          contextDarkMode={darkModeState}
          setDarkMode={setDarkMode}
        >
          <PopoverProvider {...popoverProviderProps}>
            {children}
          </PopoverProvider>
        </DarkModeProvider>
      </TypographyProvider>
    </UsingKeyboardProvider>
  );
}

LeafyGreenProvider.displayName = 'LeafyGreenProvider';

LeafyGreenProvider.propTypes = {
  popoverPortalContainer: PropTypes.shape({
    popover: PropTypes.shape({
      portalContainer: PropTypes.elementType,
      scrollContainer: PropTypes.elementType,
    }),
  }),
  baseFontSize: PropTypes.oneOf([14, 16]),
  darkMode: PropTypes.bool,
};

export default LeafyGreenProvider;
