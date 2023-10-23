import { Rule } from 'eslint';
import * as ESTreeJSX from 'estree-jsx';

export interface JSXRuleModule extends Rule.RuleModule {
  create(context: RuleContext): Rule.RuleListener & JSXNodeListener;
}

export interface JSXNodeListener {
  JSXIdentifier?:
    | ((node: ESTreeJSX.JSXIdentifier & Rule.NodeParentExtension) => void)
    | undefined;
  JSXMemberExpression?:
    | ((node: ESTreeJSX.JSXMemberExpression & Rule.NodeParentExtension) => void)
    | undefined;
  JSXNamespacedName?:
    | ((node: ESTreeJSX.JSXNamespacedName & Rule.NodeParentExtension) => void)
    | undefined;
  JSXEmptyExpression?:
    | ((node: ESTreeJSX.JSXEmptyExpression & Rule.NodeParentExtension) => void)
    | undefined;
  JSXExpressionContainer?:
    | ((
        node: ESTreeJSX.JSXExpressionContainer & Rule.NodeParentExtension,
      ) => void)
    | undefined;
  JSXSpreadChild?:
    | ((node: ESTreeJSX.JSXSpreadChild & Rule.NodeParentExtension) => void)
    | undefined;
  JSXOpeningElement?:
    | ((node: ESTreeJSX.JSXOpeningElement & Rule.NodeParentExtension) => void)
    | undefined;
  JSXClosingElement?:
    | ((node: ESTreeJSX.JSXClosingElement & Rule.NodeParentExtension) => void)
    | undefined;
  JSXAttribute?:
    | ((node: ESTreeJSX.JSXAttribute & Rule.NodeParentExtension) => void)
    | undefined;
  JSXSpreadAttribute?:
    | ((node: ESTreeJSX.JSXSpreadAttribute & Rule.NodeParentExtension) => void)
    | undefined;
  JSXText?:
    | ((node: ESTreeJSX.JSXText & Rule.NodeParentExtension) => void)
    | undefined;
  JSXElement?:
    | ((node: ESTreeJSX.JSXElement & Rule.NodeParentExtension) => void)
    | undefined;
  JSXFragment?:
    | ((node: ESTreeJSX.JSXFragment & Rule.NodeParentExtension) => void)
    | undefined;
  JSXOpeningFragment?:
    | ((node: ESTreeJSX.JSXOpeningFragment & Rule.NodeParentExtension) => void)
    | undefined;
  JSXClosingFragment?:
    | ((node: ESTreeJSX.JSXClosingFragment & Rule.NodeParentExtension) => void)
    | undefined;
}
