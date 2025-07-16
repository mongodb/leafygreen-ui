import { DependencyList, useEffect, useMemo, useState } from 'react';
import { Compartment, EditorView, Extension } from '@uiw/react-codemirror';

/**
 * A React hook for managing a dynamic CodeMirror 6 extension using a Compartment.
 * This hook simplifies using extensions that need to change based on props
 * by handling the compartment creation and reconfiguration internally.
 *
 * @param view - The CodeMirror EditorView instance. Can be null if the editor is not yet initialized.
 * @param extensionFactory - A function that returns the CodeMirror extension.
 * @param deps - A dependency array for the extension factory, similar to `useMemo`.
 * @returns An `Extension` that can be directly included in the editor's configuration.
 */
export const useCodeMirrorExtensionCompartment = (
  view: EditorView | null,
  extensionFactory: () => Extension,
  deps: DependencyList,
): Extension => {
  const [compartment] = useState(() => new Compartment());

  // Memoize the extension to avoid re-creating it on every render
  // unless the dependencies have changed.
  const extension = useMemo(extensionFactory, [...deps, extensionFactory]);

  // Effect to reconfigure the compartment when the extension value changes.
  useEffect(() => {
    // Only reconfigure if the editor view is initialized.
    if (view) {
      view.dispatch({
        effects: compartment.reconfigure(extension),
      });
    }
  }, [compartment, view, extension]);

  // Return the compartment pre-configured with the extension.
  return compartment.of(extension);
};
