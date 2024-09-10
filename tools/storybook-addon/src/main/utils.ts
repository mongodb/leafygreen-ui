import isUndefined from 'lodash/isUndefined';
import { RuleSetRule } from 'webpack';

/** Returns whether an object is a webpack rule */
export function isRule(rule: any): rule is RuleSetRule {
  return rule !== '...' && typeof rule === 'object' && !isUndefined(rule);
}
