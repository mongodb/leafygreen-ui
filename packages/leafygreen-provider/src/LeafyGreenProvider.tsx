import React from 'react';
import PropTypes from 'prop-types';
import UsingKeyboardProvider from './UsingKeyboardProvider';
import TypographyProvider, {
  TypographyProviderProps,
} from './TypographyProvider';

type LeafyGreenProviderProps = {
  children: React.ReactNode;
} & TypographyProviderProps;

function LeafyGreenProvider({
  children,
  baseFontSize,
}: LeafyGreenProviderProps) {
  return (
    <UsingKeyboardProvider>
      <TypographyProvider baseFontSize={baseFontSize}>
        {children}
      </TypographyProvider>
    </UsingKeyboardProvider>
  );
}

LeafyGreenProvider.displayName = 'LeafyGreenProvider';

LeafyGreenProvider.propTypes = { children: PropTypes.node };

export default LeafyGreenProvider;
