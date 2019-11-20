import React from 'react';
import PropTypes from 'prop-types';
import UsingKeyboardProvider from './UsingKeyboardProvider';

interface LeafyGreenProviderProps {
  children: React.ReactNode;
}

function LeafyGreenProvider({ children }: LeafyGreenProviderProps) {
  return <UsingKeyboardProvider>{children}</UsingKeyboardProvider>;
}

LeafyGreenProvider.displayName = 'LeafyGreenProvider';

LeafyGreenProvider.propTypes = { children: PropTypes.node };

export default LeafyGreenProvider;
