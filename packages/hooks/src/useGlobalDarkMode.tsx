import { useEffect, useState } from 'react';

const useGlobalDarkMode = (
  globalDarkMode: boolean,
  componentDarkMode?: boolean,
) => {
  const [darkMode, setDarkMode] = useState<boolean>(
    componentDarkMode !== undefined ? componentDarkMode : globalDarkMode,
  );

  useEffect(() => {
    setDarkMode(
      componentDarkMode !== undefined ? componentDarkMode : globalDarkMode,
    );
  }, [componentDarkMode, globalDarkMode]);

  return darkMode;
};

export default useGlobalDarkMode;
