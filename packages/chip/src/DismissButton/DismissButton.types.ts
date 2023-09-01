import { ChipProps } from '../Chip';

export type DismissButtonProps = Required<
  Pick<ChipProps, 'label' | 'onDismiss' | 'disabled' | 'variant'>
>;
