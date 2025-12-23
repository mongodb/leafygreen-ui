import {
  Action,
  ActionKind,
  TimeSegmentsAndSelectUnitState,
} from '../useTimeSegmentsAndSelectUnit.types';

/**
 * Reducer for the useTimeSegmentsAndSelect hook
 */
export const timeSegmentsAndSelectUnitReducer = (
  currentState: TimeSegmentsAndSelectUnitState,
  action: Action,
): TimeSegmentsAndSelectUnitState => {
  switch (action.type) {
    case ActionKind.UPDATE_TIME_SEGMENTS:
      return {
        ...currentState,
        segments: {
          ...currentState.segments,
          ...action.payload,
        },
      };
    case ActionKind.UPDATE_SELECT_UNIT:
      return {
        ...currentState,
        selectUnit: action.payload,
      };
    case ActionKind.UPDATE_TIME_SEGMENTS_AND_SELECT_UNIT:
      return {
        ...currentState,
        segments: {
          ...currentState.segments,
          ...action.payload.segments,
        },
        selectUnit: action.payload.selectUnit,
      };
    default:
      return currentState;
  }
};
