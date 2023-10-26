/**
* DO NOT MODIFY THIS FILE
* ANY CHANGES WILL BE REMOVED ON THE NEXT BUILD
*/
import { booleanVerbPrefixRule } from './boolean-verb-prefix';
import { exampleRule } from './example';
import { noIndirectImportsRule } from './no-indirect-imports';
import { standardTestidRule } from './standard-testid';

export const rules = {
  'boolean-verb-prefix' : booleanVerbPrefixRule,
  'example' : exampleRule,
  'no-indirect-imports' : noIndirectImportsRule,
  'standard-testid' : standardTestidRule,
}
