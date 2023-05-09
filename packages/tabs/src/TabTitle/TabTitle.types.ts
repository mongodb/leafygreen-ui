export interface BaseTabTitleProps {
  darkMode?: boolean;
  selected?: boolean;
  href?: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  isAnyTabFocused?: boolean;
  parentRef?: HTMLDivElement;
  [key: string]: any;
}
