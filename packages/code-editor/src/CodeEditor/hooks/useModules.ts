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
      'This may cause editor functionality to break.',
    );
  }

  // Lazy load modules if needed
  const { isLoading: lazyIsLoadingmodules, modules: lazymodules } =
    useLazyModules(preLoadedModules ? {} : coreModuleLoaders);

  const {
    isLoading: lazyIsLoadingFormattingModules,
    modules: lazyFormattingModules,
  } = useLazyModules(preLoadedModules ? {} : formattingModuleLoaders);

  // Determine if any modules are still loading
  const isLoading = useMemo(() => {
    return preLoadedModules
      ? false
      : lazyIsLoadingmodules || lazyIsLoadingFormattingModules;
  }, [preLoadedModules, lazyIsLoadingmodules, lazyIsLoadingFormattingModules]);

  // Determine the modules to use
  const modules = useMemo(() => {
    return preLoadedModules || { ...lazymodules, ...lazyFormattingModules };
  }, [preLoadedModules, lazymodules, lazyFormattingModules]);

  return { modules, isLoading };
};
