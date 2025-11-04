import { Reducer, useReducer } from 'react';

import { useWizardStepContext } from '../../WizardStep';

export type RequiredActionsAcknowledgementsState = [boolean, boolean, boolean];

export interface RequiredActionsAcknowledgementsAction {
  index: 0 | 1 | 2;
  value: boolean;
}

export const useRequiredActionAcknowledgements = () => {
  const { isAcknowledged, setAcknowledged } = useWizardStepContext();

  const [acknowledgementsState, dispatch] = useReducer<
    Reducer<
      RequiredActionsAcknowledgementsState,
      RequiredActionsAcknowledgementsAction
    >
  >(
    (state, action) => {
      const newState: RequiredActionsAcknowledgementsState = [...state];
      newState[action.index] = action.value;

      if (newState.every(Boolean)) {
        setAcknowledged(true);
      } else {
        setAcknowledged(false);
      }

      return newState;
    },
    [false, false, false],
  );

  const setAcknowledgementState = (index: 0 | 1 | 2, value: boolean) =>
    dispatch({ index, value });

  return {
    acknowledgementsState,
    setAcknowledgementState,
    isAcknowledged,
  };
};
