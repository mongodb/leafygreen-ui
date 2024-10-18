import { Reducer } from 'react';
import merge from 'lodash.merge';

import {
  ChartAction,
  ChartActionType,
  ChartOptions,
} from '../../Chart/Chart.types';

export const chartReducer: Reducer<Partial<ChartOptions>, ChartAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case ChartActionType.addSeries:
      if (!state.series) {
        return { ...state, series: [action.data] };
      }

      const seriesExists = state.series.some(
        series => series.name === action.data.name,
      );

      if (seriesExists) {
        return state;
      }

      return { ...state, series: [...state.series, action.data] };
    case ChartActionType.removeSeries:
      if (!state.series) {
        return state;
      }

      return {
        ...state,
        series: state.series.filter(series => series.name !== action.name),
      };
    case ChartActionType.updateOptions:
      return merge({ ...state }, action.options);
    default:
      return state;
  }
};
