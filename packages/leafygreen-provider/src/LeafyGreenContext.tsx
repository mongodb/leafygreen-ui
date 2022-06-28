import React, { PropsWithChildren } from 'react';
import PropTypes from 'prop-types';
import UsingKeyboardProvider from './UsingKeyboardContext';
import TypographyProvider, {
  TypographyProviderProps,
} from './TypographyContext';
import PortalContextProvider, { PortalContextValues } from './PortalContext';
import DarkModeProvider from './DarkModeContext';

type LeafyGreenProviderProps = {
  darkMode?: boolean;
  popoverPortalContainer?: PortalContextValues['popover'];
} & TypographyProviderProps;

function LeafyGreenProvider({
  children,
  baseFontSize,
  popoverPortalContainer,
  darkMode,
}: PropsWithChildren<LeafyGreenProviderProps>) {
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

LeafyGreenProvider.propTypes = { children: PropTypes.node };

export default LeafyGreenProvider;
