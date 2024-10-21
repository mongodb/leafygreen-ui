export interface ModalPopoverContextType {
  /**
   * Whether the most immediate popover ancestor is open
   */
  isPopoverOpen: boolean;

  /**
   * Sets the internal state
   * @internal
   */
  setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ModalPopoverProviderProps {
  children?: React.ReactNode;
}
