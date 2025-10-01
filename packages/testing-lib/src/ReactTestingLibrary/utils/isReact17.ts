import { getReactVersion } from './getReactVersion';

export const isReact17 = () => {
  return getReactVersion() === 17;
};
