import { useEffect, useState } from 'react';

/**
 * Type representing a function that dynamically loads a module
 * @template T The type of the module to be loaded
 */
export type LoaderFn<T> = () => Promise<T>;

/**
 * Map of module keys to their corresponding loader functions
 * @template T Object type with keys representing module names and values representing module types
 *
 * This uses mapped type syntax ([K in keyof T]) to create a type-safe dictionary.
 * For each key K in the object type T, the value must be a LoaderFn that
 * returns a Promise of the corresponding value type from T.
 */
export type LoadersMap<T> = { [K in keyof T]: LoaderFn<T[K]> };

/**
 * A React hook for lazy loading modules with loading state management.
 *
 * This hook takes a map of loader functions and dynamically loads modules as needed,
 * preventing duplicate loads and providing loading state feedback. Modules are loaded
 * concurrently when the hook first runs or when new loaders are provided.
 *
 * @template T Object type representing the expected structure of all possible modules
 * @param loaders - A map where keys represent module names and values are loader functions
 *                  that return promises resolving to the corresponding module
 *
 * @returns An object containing:
 * - `modules`: Partial<T> - Object containing successfully loaded modules
 * - `isLoading`: boolean - Whether any modules are currently being loaded
 *
 * @example
 * ```typescript
 * interface MyModules {
 *   utils: { helper: () => void };
 *   components: { Button: React.ComponentType };
 * }
 *
 * const { modules, isLoading } = useLazyModules<MyModules>({
 *   utils: () => import('./utils'),
 *   components: () => import('./components'),
 * });
 *
 * if (!isLoading && modules.utils) {
 *   modules.utils.helper();
 * }
 * ```
 */
export const useLazyModules = <T extends object>(
  loaders: LoadersMap<Partial<T>>,
) => {
  const [modules, setModules] = useState<Partial<T>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    /*
     * Get keys from loaders object and cast them to the generic type
     * This type assertion is necessary because Object.keys returns string[]
     */
    const neededKeys = Object.keys(loaders) as Array<keyof T>;
    const availableKeys = Object.keys(modules) as Array<keyof T>;

    /*
     * Determine which modules need to be loaded to prevent duplicate loads
     */
    const keysToLoad = neededKeys.filter(key => !availableKeys.includes(key));

    /*
     * Early return if there's nothing to load
     */
    if (keysToLoad.length === 0) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    /*
     * Create an array of promises for each module that needs to be loaded
     * The non-null assertion (!) is used because TypeScript can't guarantee
     * the key exists in loaders, even though we filtered for keys in loaders
     */
    const modulePromises = keysToLoad.map(async key => {
      try {
        const module = await loaders[key]!();
        return { key, module };
      } catch (err: any) {
        console.error(`Error loading module "${String(key)}":`, err);
      }
    });

    (async () => {
      try {
        const modules = await Promise.all(modulePromises);

        /*
         * Filter out any failed loads (which returned undefined)
         * The expression below uses a TypeScript type predicate with the syntax:
         * (parameter): parameterType is SpecificType => boolean
         * This tells the compiler that when the function returns true,
         * the parameter should be treated as the specified type.
         * Without this predicate, TypeScript would not know that filtered modules
         * are guaranteed to have the key and module properties.
         */
        const validModules = modules.filter(
          (module): module is { key: keyof T; module: any } => !!module,
        );

        /**
         * Convert array of key-module pairs to an object
         * The type assertion for the initial value ({} as Partial<T>) is necessary
         * because an empty object literal {} has type {}, not Partial<T>.
         * This ensures the accumulator (acc) has the correct type from the start.
         */
        const newModules = validModules.reduce((acc, { key, module }) => {
          acc[key] = module;
          return acc;
        }, {} as Partial<T>);

        setModules(prev => ({ ...prev, ...newModules }));
      } catch (err: any) {
        console.error(`Failed to load module:`, err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [loaders, modules]);

  return { modules, isLoading };
};
