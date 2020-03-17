import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

interface TypographyScaleProviderProps {
  children: React.ReactNode;
  typescale: number;
}

const TypographyScaleContext = createContext<number>(14);

export function useTypographyScale() {
  return useContext(TypographyScaleContext);
}

function TypographyScaleProvider({
  children,
  typescale,
}: TypographyScaleProviderProps) {
  return (
    <TypographyScaleContext.Provider value={typescale}>
      {children}
    </TypographyScaleContext.Provider>
  );
}

TypographyScaleProvider.displayName = 'TypographyScaleProvider';

TypographyScaleProvider.propTypes = {
  children: PropTypes.node,
  typescale: PropTypes.number,
};

export default TypographyScaleProvider;
