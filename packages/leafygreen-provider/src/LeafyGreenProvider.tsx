import React from 'react';
import PropTypes from 'prop-types';
import UsingKeyboardProvider from './UsingKeyboardProvider';
import TypographyScaleProvider from './TypographyScaleProvider';

interface LeafyGreenProviderProps {
  children: React.ReactNode;
  typescale?: number;
}

function LeafyGreenProvider({
  children,
  typescale = 14,
}: LeafyGreenProviderProps) {
  return (
    <UsingKeyboardProvider>
      <TypographyScaleProvider typescale={typescale}>
        {children}
      </TypographyScaleProvider>
    </UsingKeyboardProvider>
  );
}

LeafyGreenProvider.displayName = 'LeafyGreenProvider';

LeafyGreenProvider.propTypes = { children: PropTypes.node };

export default LeafyGreenProvider;
