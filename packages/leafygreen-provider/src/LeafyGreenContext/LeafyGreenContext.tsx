import React, { PropsWithChildren, useEffect, useState } from 'react';

import DarkModeProvider, {
  useDarkModeContext,
} from '../DarkModeContext/DarkModeContext';
import { MigrationProvider, useMigrationContext } from '../MigrationContext';
import {
  PortalContextProvider,
  usePopoverPortalContainer,
} from '../PortalContext/PortalContext';
import { TypographyProvider, useBaseFontSize } from '../TypographyContext';
import { UsingKeyboardProvider } from '../UsingKeyboardContext';

import { LeafyGreenProviderProps } from './LeafyGreenContext.types';

function LeafyGreenProvider({
  children,
  baseFontSize: fontSizeProp,
  popoverPortalContainer: popoverPortalContainerProp,
  darkMode: darkModeProp,
  forceUseTopLayer: forceUseTopLayerProp = false,
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
  const inheritedContainer = usePopoverPortalContainer();
  const popoverPortalContainer =
    popoverPortalContainerProp ?? inheritedContainer;

  /**
   * If `forceUseTopLayerProp` is true, it will globally apply to all children
   */
  const migrationContext = useMigrationContext();
  const forceUseTopLayer =
    forceUseTopLayerProp || migrationContext.forceUseTopLayer;

  return (
    <UsingKeyboardProvider>
      <PortalContextProvider popover={popoverPortalContainer}>
        <TypographyProvider baseFontSize={baseFontSize}>
          <DarkModeProvider
            contextDarkMode={darkModeState}
            setDarkMode={setDarkMode}
          >
            <MigrationProvider forceUseTopLayer={forceUseTopLayer}>
              {children}
            </MigrationProvider>
          </DarkModeProvider>
        </TypographyProvider>
      </PortalContextProvider>
    </UsingKeyboardProvider>
  );
}

LeafyGreenProvider.displayName = 'LeafyGreenProvider';

export default LeafyGreenProvider;
