import { useEffect, useMemo, useState } from 'react';
import { type Compartment, type Extension } from '@codemirror/state';
import { type EditorView } from 'codemirror';

/**
 * A base hook for managing CodeMirror extensions with compartments.
 *
 * This hook provides a foundation for dynamically managing CodeMirror extensions
 * by using compartments to reconfigure extensions when their values change.
 * It handles the lifecycle of compartments and ensures extensions are properly
 * updated when the editor view or extension values change.
 *
 * @template T - The type of the value parameter used by the extension factory
 * @param params - Configuration object for the extension
 * @param params.editorViewInstance - The CodeMirror editor view instance
 * @param params.value - The value to pass to the extension factory function
 * @param params.factory - Function that creates an extension from the provided value
 * @param params.stateModule - Optional @codemirror/state module for creating compartments
 * @returns A CodeMirror extension that can be dynamically reconfigured
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
