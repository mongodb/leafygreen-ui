export interface InputBarSendButtonProps {
  /**
   * Whether the button is disabled
   */
  disabled: boolean;

  /**
   * Whether the button is a compact or spacious variant
   */
  isCompact: boolean;

  /**
   * Whether the button should render its text
   * @remarks This prop is only considered when the parent `LeafyGreenChatProvider` has `variant="spacious"`.
   */
  shouldRenderButtonText: boolean;
}
