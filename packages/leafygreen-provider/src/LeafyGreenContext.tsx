import React, { PropsWithChildren, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { DarkModeProps } from '@leafygreen-ui/lib';

import DarkModeProvider, { useDarkModeContext } from './DarkModeContext';
import { OverlayProvider } from './OverlayContext';
import {
  PopoverContextType,
  PopoverProvider,
  usePopoverContext,
} from './PopoverContext';
import TypographyProvider, {
  TypographyProviderProps,
  useBaseFontSize,
} from './TypographyContext';
import UsingKeyboardProvider from './UsingKeyboardContext';

type PopoverPortalContainerType = Pick<
  PopoverContextType,
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

  return (
    <UsingKeyboardProvider>
      <TypographyProvider baseFontSize={baseFontSize}>
        <DarkModeProvider
          contextDarkMode={darkModeState}
          setDarkMode={setDarkMode}
        >
          <OverlayProvider>
            <PopoverProvider
              portalContainer={portalContainer}
              scrollContainer={scrollContainer}
            >
              {children}
            </PopoverProvider>
          </OverlayProvider>
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
