import React, { createContext, useContext, useState } from 'react';

interface OptionProperties {}

type OptionPropertiesMap = Map<string, OptionProperties>;

interface SingleSelectContextValue {
  options: {
    optionsProperties: OptionPropertiesMap;
  };
  addOption: (name: string, properties: OptionProperties) => void;
  setOption: (name: string, properties: OptionProperties) => void;
  removeOption: (name: string) => void;
}

const SingleSelectContext = createContext<SingleSelectContextValue>({
  options: {
    optionsProperties: new Map(),
  },
  addOption: () => new Map(),
  setOption: () => new Map(),
  removeOption: () => new Map(),
});

export function useSingleSelectContext() {
  const context = useContext(SingleSelectContext);

  if (!context) {
    throw new Error(
      'useSingleSelectContext must be used within a SingleSelectProvider.',
    );
  }

  return context;
}

export function SingleSelectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [options, setOptions] = useState({
    optionsProperties: new Map(),
  });

  const providerValue: SingleSelectContextValue = {
    options,
    addOption: (name, properties) => {
      setOptions(({ optionsProperties }) => {
        optionsProperties.set(name, properties);

        return { optionsProperties: new Map(optionsProperties) };
      });
    },
    removeOption: name => {
      setOptions(({ optionsProperties }) => {
        optionsProperties.delete(name);

        return { optionsProperties: new Map(optionsProperties) };
      });
    },
    setOption: (name, properties) => {
      const currentFieldProperties = options.optionsProperties.get(name);

      if (!currentFieldProperties) {
        console.error(`Field with name ${name} does not exist`);

        setOptions(current => ({
          optionsProperties: current.optionsProperties,
        }));

        return;
      }

      setOptions(({ optionsProperties }) => {
        optionsProperties.set(name, properties);

        return { optionsProperties: new Map(optionsProperties) };
      });
      return new Map();
    },
  };

  return (
    <SingleSelectContext.Provider value={providerValue}>
      {children}
    </SingleSelectContext.Provider>
  );
}
