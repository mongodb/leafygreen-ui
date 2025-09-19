export type RuleContext<TModule extends RuleModule> = Parameters<
  TModule['create']
>[0];
