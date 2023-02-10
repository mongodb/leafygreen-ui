import { Size } from '../PasswordInput/PasswordInput.types';

export interface PasswordToggleProps {
  showPassword: boolean;
  handlePasswordToggleClick: () => void;
  size: Size;
}
