import { ModalProps } from '@leafygreen-ui/modal';
import { FieldValues } from '../../formStore/FormStore.types';

type InheritedModalProps = Pick<ModalProps, 'open' | 'setOpen'>;

export interface ModalFormTemplatePassthroughProps extends InheritedModalProps {
  // Controls the open state of the modal
  open: boolean;

  // Setter to allow the modal to control its own open state
  // Uses in cases like when the close button is clicked, or the form is submitted
  setOpen: (
    open: boolean,
  ) => void | React.Dispatch<React.SetStateAction<boolean>>;

  // Handler to handle form submission.
  // If function returns a promise, the modal will wait for the promise to resolve before closing, and will display a loading indicator.
  // TODO: Need to handle submission errors/cancellations
  onSubmit: (values: FieldValues) => void | Promise<any>;

  // Fires whenever a value within the form changes.
  // TODO: Improve event typing. Not all "events" are purely React.ChangeEvents in LeafyGreen.
  onChange?: (values: FieldValues, event: any) => void;

  // Fires when the modal is closed
  onClose?: () => void;

  // The title to display at the top of the modal
  title: string;

  // The contents of the form.
  children?: React.ReactNode;
}

export interface ModalFormTemplateViewProps
  extends ModalFormTemplatePassthroughProps {}

export interface ModalFormTemplateProps
  extends ModalFormTemplatePassthroughProps {
  children: React.ReactNode;
}
