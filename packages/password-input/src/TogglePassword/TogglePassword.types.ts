import { Size } from '../PasswordInput/PasswordInput.types';

export interface TogglePasswordProps {
  showPassword: boolean;
  disabled: boolean;
  handleTogglePasswordClick: () => void;
  size: Size;
}
