export const WizardSubComponentProperties = {
  Step: 'isWizardStep',
  Footer: 'isWizardFooter',
} as const;
export type WizardSubComponentProperties =
  (typeof WizardSubComponentProperties)[keyof typeof WizardSubComponentProperties];
