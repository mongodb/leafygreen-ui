import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

export interface SectionNavNestedProviderProps {
  /**
   * The level of the SectionNavItem.
   */
  level: number;
}

export const SectionNavNestedContext =
  createContext<SectionNavNestedProviderProps>({
    level: 1,
  });

export const useSectionNavNestedContext = () =>
  useContext<SectionNavNestedProviderProps>(
    SectionNavNestedContext as React.Context<SectionNavNestedProviderProps>,
  );

export const SectionNavNestedContextProvider = ({
  children,
  level = 1,
}: PropsWithChildren<SectionNavNestedProviderProps>) => {
  const SectionNavNestedProvider = (
    SectionNavNestedContext as React.Context<SectionNavNestedProviderProps>
  ).Provider;

  const sectionNavNestedData = useMemo(() => {
    return {
      level,
    };
  }, [level]);

  return (
    <SectionNavNestedProvider value={sectionNavNestedData}>
      {children}
    </SectionNavNestedProvider>
  );
};
