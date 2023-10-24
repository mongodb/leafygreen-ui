import { camelCase, kebabCase } from 'lodash';

export const makeVarName = (str: string) => camelCase(str) + 'Rule';
export const makeId = (str: string) => kebabCase(str);
export const makeFileName = (str: string) => kebabCase(str);
