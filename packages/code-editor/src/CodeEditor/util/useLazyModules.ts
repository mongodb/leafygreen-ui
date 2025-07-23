import { useEffect, useState } from 'react';

export type LoaderFn<T> = () => Promise<T>;
export type LoadersMap<T> = { [K in keyof T]: LoaderFn<T[K]> };

class ModuleError extends Error {
  moduleKey: string;
  constructor(message: string, key: string) {
    super(message);
    this.name = 'ModuleError';
    this.moduleKey = key;
  }
}

export const useLazyModules = <T extends Record<string, unknown>>(
  loaders: LoadersMap<Partial<T>>,
) => {
  const [modules, setModules] = useState<Partial<T>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ModuleError | null>(null);

  useEffect(() => {
    const neededKeys = Object.keys(loaders) as Array<keyof T>;
    const availableKeys = Object.keys(modules) as Array<keyof T>;
    const keysToLoad = neededKeys.filter(key => !availableKeys.includes(key));

    if (keysToLoad.length === 0) {
      if (isLoading) setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const promises = keysToLoad.map(key => {
      return loaders[key]!()
        .then(module => ({ key, module: (module as any).default || module }))
        .catch(err => {
          console.error(`Error loading module "${String(key)}":`, err);
        });
    });

    Promise.all(promises)
      .then(results => {
        const validResults = results.filter(
          (result): result is { key: keyof T; module: any } => !!result,
        );
        const newModules = validResults.reduce((acc, { key, module }) => {
          acc[key] = module;
          return acc;
        }, {} as Partial<T>);

        setModules(prev => ({ ...prev, ...newModules }));
      })
      .catch((err: ModuleError) => {
        console.error(`Failed to load module "${err.moduleKey}":`, err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [loaders, modules, isLoading]);

  return { modules, isLoading, error };
};
