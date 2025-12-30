import { SharedCollectionToolbarProps, Size, Variant } from '../shared.types';

export interface CollectionToolbarProps extends SharedCollectionToolbarProps {
  size?: typeof Size.Default | typeof Size.Small;
  variant?: Variant;
}
