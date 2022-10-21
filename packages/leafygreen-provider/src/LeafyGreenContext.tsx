import React, { PropsWithChildren, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UsingKeyboardProvider from './UsingKeyboardContext';
import TypographyProvider, {
  TypographyProviderProps,
  useBaseFontSize,
} from './TypographyContext';
import PortalContextProvider, {
  PortalContextValues,
  usePopoverPortalContainer,
} from './PortalContext';
import DarkModeProvider, { useDarkModeContext } from './DarkModeContext';
import { DarkModeProps } from '@leafygreen-ui/lib';

export type LeafyGreenProviderProps = {
  /**
   * Define a container HTMLElement for components that utilize the `Portal` component
   */
  popoverPortalContainer?: PortalContextValues['popover'];
} & TypographyProviderProps &
  DarkModeProps & {
    setDarkMode?: React.Dispatch<boolean>;
  };

function LeafyGreenProvider({
  children,
  baseFontSize: fontSizeProp,
  popoverPortalContainer: popoverPortalContainerProp,
  darkMode: darkModeProp,
  setDarkMode,
}: PropsWithChildren<LeafyGreenProviderProps>) {
  // If a darkMode prop is not set,
  // then we want to check if there's an outer dark mode context.

  // if the prop is set, we use that
  // if the prop is not set, we use outer context
  const { contextDarkMode: inheritedDarkMode } = useDarkModeContext();
  const darkMode = darkModeProp ?? inheritedDarkMode;

  // Similarly with base font size
  const inheritedFontSize = useBaseFontSize();
  const baseFontSize = fontSizeProp ?? inheritedFontSize;
  // and popover portal container
  const inheritedContainer = usePopoverPortalContainer();
  const popoverPortalContainer =
    popoverPortalContainerProp ?? inheritedContainer;

  return (
    <UsingKeyboardProvider>
      <PortalContextProvider popover={popoverPortalContainer}>
        <TypographyProvider baseFontSize={baseFontSize}>
          <DarkModeProvider
            contextDarkMode={darkMode}
            setDarkMode={setDarkMode}
          >
            {children}
          </DarkModeProvider>
        </TypographyProvider>
      </PortalContextProvider>
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
