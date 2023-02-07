import React, { createContext, PropsWithChildren, useContext } from 'react';
import PropTypes from 'prop-types';

export const BaseFontSize = {
  Body1: 13,
  Body2: 16,
} as const;

export type BaseFontSize = typeof BaseFontSize[keyof typeof BaseFontSize];

interface BaseFontSizeContextProps {
  contextBaseFontSize?: BaseFontSize;
  setBaseFontSize: React.Dispatch<BaseFontSize>;
}

const BaseFontSizeContext = createContext<BaseFontSizeContextProps>({
  contextBaseFontSize: BaseFontSize.Body1,
  setBaseFontSize: () => {},
});

export const useBaseFontSizeContext = () => useContext(BaseFontSizeContext);

type useBaseFontSize = (localBaseFontSize?: BaseFontSize) => {
  baseFontSize: BaseFontSize;
  setBaseFontSize: React.Dispatch<BaseFontSize>;
};

export const useBaseFontSize: useBaseFontSize = localBaseFontSize => {
  const { contextBaseFontSize, setBaseFontSize } = useBaseFontSizeContext();
  const baseFontSize =
    localBaseFontSize ?? contextBaseFontSize ?? BaseFontSize.Body1;
  return { baseFontSize, setBaseFontSize };
};

function TypographyProvider({
  children,
  contextBaseFontSize = BaseFontSize.Body1,
  setBaseFontSize,
}: PropsWithChildren<BaseFontSizeContextProps>) {
  return (
    <BaseFontSizeContext.Provider
      value={{ contextBaseFontSize, setBaseFontSize }}
    >
      {children}
    </BaseFontSizeContext.Provider>
  );
}

TypographyProvider.displayName = 'TypographyProvider';

TypographyProvider.propTypes = {
  children: PropTypes.node,
  baseFontSize: PropTypes.oneOf(Object.values(BaseFontSize)),
};

export default TypographyProvider;
