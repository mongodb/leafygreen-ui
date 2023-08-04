import isUndefined from 'lodash/isUndefined';
import { RuleSetRule } from 'webpack';

export function isRule(rule: any): rule is RuleSetRule {
  return rule !== '...' && typeof rule === 'object' && !isUndefined(rule);
}
