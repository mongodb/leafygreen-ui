import React, { PropsWithChildren, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { DarkModeProps } from '@leafygreen-ui/lib';

import DarkModeProvider, { useDarkModeContext } from './DarkModeContext';
import PortalContextProvider, {
  PortalContextValues,
  usePopoverPortalContainer,
} from './PortalContext';
import TypographyProvider, {
  TypographyProviderProps,
  useBaseFontSize,
} from './TypographyContext';
import UsingKeyboardProvider from './UsingKeyboardContext';

export type LeafyGreenProviderProps = {
  /**
   * Define a container HTMLElement for components that utilize the `Portal` component
   */
  popoverPortalContainer?: PortalContextValues['popover'];
} & TypographyProviderProps &
  DarkModeProps;

function LeafyGreenProvider({
  children,
  baseFontSize: fontSizeProp,
  popoverPortalContainer: popoverPortalContainerProp,
  darkMode: darkModeProp,
}: PropsWithChildren<LeafyGreenProviderProps>) {
  // if the prop is set, we use that
  // if the prop is not set, we use outer context
  const { contextDarkMode: inheritedDarkMode } = useDarkModeContext();
  const [darkModeState, setDarkMode] = useState(
    darkModeProp ?? inheritedDarkMode,
  );

  useEffect(() => {
    setDarkMode(darkModeProp ?? inheritedDarkMode);
  }, [darkModeProp, inheritedDarkMode]);

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
            contextDarkMode={darkModeState}
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
