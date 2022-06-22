import React, { PropsWithChildren } from 'react';
import PropTypes from 'prop-types';
import UsingKeyboardProvider from './UsingKeyboardContext';
import TypographyProvider, {
  TypographyProviderProps,
} from './TypographyContext';
import PortalContextProvider, { PortalContextValues } from './PortalContext';
import DarkModeProvider from './DarkModeContext';
import { DarkModeProps } from '@leafygreen-ui/lib';

type LeafyGreenProviderProps = {
  popoverPortalContainer?: PortalContextValues['popover'];
} & TypographyProviderProps &
  DarkModeProps;

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
          <DarkModeProvider darkMode={darkMode}>{children}</DarkModeProvider>
        </TypographyProvider>
      </PortalContextProvider>
    </UsingKeyboardProvider>
  );
}

LeafyGreenProvider.displayName = 'LeafyGreenProvider';

LeafyGreenProvider.propTypes = { children: PropTypes.node };

export default LeafyGreenProvider;
