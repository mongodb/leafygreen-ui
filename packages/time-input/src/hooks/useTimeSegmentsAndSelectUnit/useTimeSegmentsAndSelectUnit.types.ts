import { TimeSegmentsState } from '../../shared.types';
import { UnitOption } from '../../TimeInputSelect/TimeInputSelect.types';

/**
 * Callback passed into the hook, called when any segment updates
 */
export type OnUpdateCallback = (params: {
  newSegments: TimeSegmentsState;
  prevSegments?: TimeSegmentsState;
  newSelectUnit: UnitOption;
  prevSelectUnit?: UnitOption;
}) => void;

/**
 * Options for the useTimeSegmentsAndSelect hook
 */
export interface UseTimeSegmentsOptions {
  onUpdate?: OnUpdateCallback;
}

/**
 * An enum with all the types of actions to use in our reducer
 */
export enum ActionKind {
  UPDATE_TIME_SEGMENTS = 'UPDATE_TIME_SEGMENTS',
  UPDATE_SELECT_UNIT = 'UPDATE_SELECT_UNIT',
}

/**
 * An interface for our actions
 */
export type Action =
  | {
      type: ActionKind.UPDATE_TIME_SEGMENTS;
      payload: Partial<TimeSegmentsState>;
    }
  | { type: ActionKind.UPDATE_SELECT_UNIT; payload: UnitOption };

export interface TimeSegmentsAndSelectUnitState {
  segments: TimeSegmentsState;
  selectUnit: UnitOption;
}
