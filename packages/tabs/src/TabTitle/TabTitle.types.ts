export interface BaseTabTitleProps {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  name: React.ReactNode;
  onClick?: (event: React.MouseEvent, index: number) => void;
  [key: string]: any;
}
