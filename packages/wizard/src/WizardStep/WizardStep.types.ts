export interface WizardStepProps extends React.PropsWithChildren<{}> {
  /**
   * Defines whether some action in Step must be taken by the user before enabling the primary action button
   *
   * @default false
   */
  requiresAcknowledgement?: boolean;
}
