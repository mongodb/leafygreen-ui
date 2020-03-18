import React from 'react';
import PropTypes from 'prop-types';
import UsingKeyboardProvider from './UsingKeyboardProvider';
import BaseFontSizeProvider from './BaseFontSizeProvider';

interface LeafyGreenProviderProps {
  children: React.ReactNode;
  baseFontSize?: number;
}

function LeafyGreenProvider({
  children,
  baseFontSize = 14,
}: LeafyGreenProviderProps) {
  return (
    <UsingKeyboardProvider>
      <BaseFontSizeProvider baseFontSize={baseFontSize}>
        {children}
      </BaseFontSizeProvider>
    </UsingKeyboardProvider>
  );
}

LeafyGreenProvider.displayName = 'LeafyGreenProvider';

LeafyGreenProvider.propTypes = { children: PropTypes.node };

export default LeafyGreenProvider;
