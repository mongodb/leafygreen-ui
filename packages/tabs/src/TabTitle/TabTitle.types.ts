import { PolymorphicAs } from '@leafygreen-ui/polymorphic';

export interface BaseTabTitleProps {
  as?: PolymorphicAs;
  darkMode?: boolean;
  href?: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  isAnyTabFocused?: boolean;
  selectedIndex: number;
  [key: string]: any;
}
