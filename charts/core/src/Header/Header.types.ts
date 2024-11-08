export interface HeaderProps {
  label: string;
  closeButtonProps?: {
    show?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  };
  fullScreenButtonProps?: {
    show?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  };
  resetButtonProps?: {
    show?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  };
}
