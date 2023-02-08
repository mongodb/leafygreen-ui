import { Size, States } from '../PasswordInput/PasswordInput.types';

export type StateProps = Exclude<States, 'none'>;

export interface InputIconProps {
  state: StateProps;
  size: Size;
}
