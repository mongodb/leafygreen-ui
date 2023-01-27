import { MessageProps } from '../PasswordInput/PasswordInput.types';

export interface ValidationMessageStateProps {
  ariaDescribedby: string;
  messages: Array<MessageProps>;
}
