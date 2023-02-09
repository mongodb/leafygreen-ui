import { Size, State } from '../PasswordInput/PasswordInput.types';

export type StateProps = Exclude<State, 'none'>;

export interface InputIconProps {
  state: StateProps;
  size: Size;
  disabled: boolean;
}
