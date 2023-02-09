import { Size } from '../PasswordInput/PasswordInput.types';

export interface TogglePasswordProps {
  showPassword: boolean;
  handleTogglePasswordClick: () => void;
  size: Size;
}
