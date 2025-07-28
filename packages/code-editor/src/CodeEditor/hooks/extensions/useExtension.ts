import { useEffect, useMemo, useState } from 'react';
import { type Compartment, type Extension } from '@codemirror/state';
import { type EditorView } from 'codemirror';

/**
 * Hook for managing a dynamic CodeMirror extensions using a Compartment.
 * This hook simplifies using extensions that need to change based on props
 * by handling the compartment creation and reconfiguration internally.
 *
 * @param extensionConfig An object containing:
 * - `editorView`: The CodeMirror EditorView instance.
 * - `stateModule`: The CodeMirror state module, used to create the Compartment.
 * - `value`: The dynamic value that the extension depends on. When this value
 * changes, the extension will be reconfigured.
 * - `factory`: A function that takes the `value` and returns a CodeMirror
 * `Extension`. This function should be stable (e.g., defined outside the
 * component or memoized with useCallback).
 * @returns An `Extension` to be included in the editor's configuration.
 *
 * @remarks CodeMirror state is immutable. Once configuration is set, the
 * entire state would need to be updated to update one facet. Compartments allow
 * us to dynamically change parts of the configuration after
 * initialization, without needing to recreate the entire editor state.
 * See https://codemirror.net/examples/config/#dynamic-configuration
 */
export const useExtension = <T>({
  editorView,
  stateModule,
  value,
  factory,
}: {
  editorView: EditorView | null;
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
    if (compartment && editorView) {
      /**
       * This will reconfigure the compartment with the new extension
       * whenever the value changes.
       */
      editorView.dispatch({
        effects: compartment.reconfigure(extension),
      });
    }
  }, [compartment, editorView, extension]);

  /**
   * If compartment isn't available (because stateModule isn't provided yet)
   * we return an empty array. An empty array is a valid extension that does nothing.
   * If compartment is available, we return the extension from the compartment.
   */
  return compartment ? compartment.of(extension) : [];
};
