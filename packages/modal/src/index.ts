import { useState } from 'react';
import Modal from './Modal';
export { ModalSize } from './Modal';

export function useModalState() {
  const [active, setActive] = useState(false);

  return { active, setActive };
}

export default Modal;
