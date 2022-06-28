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
  /**
   * Define a container HTMLElement for components that utilize the `Portal` component
   */
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

LeafyGreenProvider.propTypes = {
  popoverPortalContainer: PropTypes.shape({
    popover: PropTypes.shape({
      portalContainer: PropTypes.instanceOf(HTMLElement),
      scrollContainer: PropTypes.instanceOf(HTMLElement),
    }),
  }),
  baseFontSize: PropTypes.oneOf([14, 16]),
  darkMode: PropTypes.bool,
};

export default LeafyGreenProvider;
