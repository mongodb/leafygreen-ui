import { useEffect, useMemo, useState } from 'react';
import { type Compartment, type Extension } from '@codemirror/state';
import { type EditorView } from 'codemirror';

/**
 * Hook for managing dynamic CodeMirror extensions using a Compartment.
 * This hook simplifies using extensions that need to change based on props
 * by handling the compartment creation and reconfiguration internally.
 *
 * @param params Configuration object for the extension
 * @param params.editorViewInstance The CodeMirror EditorView instance to attach the extension to
 * @param params.stateModule CodeMirror state module for creating the Compartment (marked optional for lazy loading, but required for functionality)
 * @param params.value The dynamic value that the extension depends on; when this changes, the extension will be reconfigured
 * @param params.factory A function that takes the value and returns a CodeMirror Extension (should be stable or memoized with useCallback)
 * @returns A CodeMirror Extension to be included in the editor's configuration
 *
 * @remarks
 * CodeMirror state is immutable. Once configuration is set, the entire state would
 * need to be updated to update one facet. Compartments allow us to dynamically change
 * parts of the configuration after initialization, without needing to recreate the
 * entire editor state.
 * See https://codemirror.net/examples/config/#dynamic-configuration
 *
 * Note: Although stateModule is marked as optional in the type signature (due to lazy loading),
 * the compartment will not be created until stateModule is provided. The hook safely handles
 * the case where it's not immediately available by returning an empty extension array.
 */
export const useExtension = <T>({
  editorViewInstance,
  stateModule,
  value,
  factory,
}: {
  editorViewInstance: EditorView | null;
  value: T;
  factory: (value: T) => Extension;
  stateModule?: typeof import('@codemirror/state');
}): Extension => {
  const [compartment, setCompartment] = useState<Compartment | null>(null);
  const extension = useMemo(() => factory(value), [value, factory]);

  // Create or update compartment when stateModule changes
  useEffect(() => {
    if (stateModule) {
      setCompartment(current => current || new stateModule.Compartment());
    }
  }, [stateModule]);

  useEffect(() => {
    if (compartment && editorViewInstance) {
      /**
       * This will reconfigure the compartment with the new extension
       * whenever the value changes.
       */
      editorViewInstance.dispatch({
        effects: compartment.reconfigure(extension),
      });
    }
  }, [compartment, editorViewInstance, extension]);

  /**
   * If compartment isn't available (because stateModule isn't provided yet)
   * we return an empty array. An empty array is a valid extension that does nothing.
   * If compartment is available, we return the extension from the compartment.
   */
  return compartment ? compartment.of(extension) : [];
};
