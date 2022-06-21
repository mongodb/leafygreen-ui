import { useEffect, useState } from 'react';

const useGlobalDarkMode = (
  globalDarkMode: boolean,
  darkModeParam?: boolean,
) => {
  const [darkMode, setDarkMode] = useState<boolean>(
    darkModeParam !== undefined ? darkModeParam : globalDarkMode,
  );

  useEffect(() => {
    setDarkMode(darkModeParam !== undefined ? darkModeParam : globalDarkMode);
  }, [darkModeParam, globalDarkMode]);

  return darkMode;
};

export default useGlobalDarkMode;
