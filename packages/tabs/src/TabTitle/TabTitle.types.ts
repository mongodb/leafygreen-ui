export interface BaseTabTitleProps {
  darkMode?: boolean;
  href?: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  isAnyTabFocused?: boolean;
  selectedIndex: number;
  [key: string]: any;
}
