import React, { PropsWithChildren } from 'react';
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
import DarkModeProvider, { useDarkMode } from './DarkModeContext';
import { DarkModeProps } from '@leafygreen-ui/lib';

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
  // If a darkMode prop is not set,
  // then we want to check if there's an outer dark mode context
  const { darkMode } = useDarkMode(darkModeProp);
  // Similarly with base font size
  const contextFontSize = useBaseFontSize();
  const baseFontSize = fontSizeProp ?? contextFontSize;
  // and popover portal container
  const contextContainer = usePopoverPortalContainer();
  const popoverPortalContainer = popoverPortalContainerProp ?? contextContainer;

  return (
    <UsingKeyboardProvider>
      <PortalContextProvider popover={popoverPortalContainer}>
        <TypographyProvider baseFontSize={baseFontSize}>
          <DarkModeProvider globalDarkMode={darkMode}>
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
