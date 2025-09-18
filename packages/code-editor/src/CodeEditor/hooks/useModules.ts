import { useMemo } from 'react';

import { CodeEditorProps } from '../CodeEditor.types';

import { useFormattingModuleLoaders } from './formatting';
import { useLazyModules } from './useLazyModules';
import { useModuleLoaders } from './useModuleLoaders';

/**
 * Hook that manages module loading and availability.
 * Handles both pre-loaded modules and lazy loading scenarios.
 *
 * @param props - CodeEditor props containing language and preLoadedModules
 * @returns Object containing loaded modules and loading state
 */
export const useModules = (props: CodeEditorProps) => {
  const { preLoadedModules, language } = props;

  // Determine the required modules
  const coreModuleLoaders = useModuleLoaders(props);
  const formattingModuleLoaders = useFormattingModuleLoaders(language);

  // Check for missing required modules
  const missingRequiredModules = useMemo(() => {
    return preLoadedModules
      ? Object.keys({
          ...coreModuleLoaders,
          ...formattingModuleLoaders,
        }).filter(key => !(key in preLoadedModules))
      : [];
  }, [coreModuleLoaders, formattingModuleLoaders, preLoadedModules]);

  if (preLoadedModules && missingRequiredModules.length > 0) {
    console.warn(
      'CodeEditor: Missing required modules in preLoadedModules:',
      missingRequiredModules,
    );
  }

  const moduleLoadersToLazyLoad = useMemo(() => {
    // if preLoadedModules are provided, no need to load any modules
    return preLoadedModules
      ? {}
      : {
          ...coreModuleLoaders,
          ...formattingModuleLoaders,
        };
  }, [coreModuleLoaders, formattingModuleLoaders, preLoadedModules]);

  // Lazy load modules if needed
  const { isLoading, modules: lazyModules } = useLazyModules(
    moduleLoadersToLazyLoad,
  );

  return { modules: preLoadedModules || lazyModules, isLoading };
};
