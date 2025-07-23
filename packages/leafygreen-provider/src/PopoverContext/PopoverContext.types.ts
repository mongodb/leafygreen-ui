export interface PopoverContextType {
  /**
   * Whether a popover element is open in a modal
   */
  isPopoverOpen: boolean;

  /**
   * Called when a popover element opens or closes in a modal
   * @internal
   */
  setIsPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
