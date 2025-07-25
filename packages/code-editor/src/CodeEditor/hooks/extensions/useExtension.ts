import { useEffect, useMemo, useState } from 'react';
import { Compartment, type Extension } from '@codemirror/state';
import { type EditorView } from 'codemirror';

// TODO: Load state sync

/**
 * Hook for managing a dynamic CodeMirror extensions using a Compartment.
 * This hook simplifies using extensions that need to change based on props
 * by handling the compartment creation and reconfiguration internally.
 *
 * CodeMirror state is immutable. Once configuration is set, the
 * entire state would need to be updated to update one facet. Compartments allow
 * us to dynamically change parts of the configuration after
 * initialization, without needing to recreate the entire editor state.
 * See https://codemirror.net/examples/config/#dynamic-configuration
 *
 * @param view The CodeMirror EditorView instance.
 * @param value The dynamic value that the extension depends on. When this value
 * changes, the extension will be reconfigured.
 * @param factory A function that takes the `value` and returns a CodeMirror
 * `Extension`. This function should be stable (e.g., defined outside the
 * component or memoized with useCallback).
 * @returns An `Extension` to be included in the editor's configuration.
 */
export const useExtension = <T>(
  view: EditorView | null,
  value: T,
  factory: (value: T) => Extension,
): Extension => {
  const [compartment] = useState(() => new Compartment());
  const extension = useMemo(() => factory(value), [value, factory]);

  useEffect(() => {
    if (view) {
      view.dispatch({
        effects: compartment.reconfigure(extension),
      });
    }
  }, [compartment, view, extension]);

  return compartment.of(extension);
};
