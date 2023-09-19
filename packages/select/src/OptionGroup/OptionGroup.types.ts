import { HTMLElementProps } from '@leafygreen-ui/lib';

import { Option } from '../Option';

export type ReactEmpty = null | undefined | false | '';

export interface InternalOptionProps
  extends HTMLElementProps<'div', HTMLDivElement> {
  /**
   * Adds a className to the outermost element.
   */
  className?: string;
  /**
   * Text shown above the group's options.
   */
  label: string;
  children: React.ReactNode;
}

export interface OptionGroupProps extends InternalOptionProps {
  /**
   * Prevents all the contained options from being selectable.
   * @default false
   */
  disabled?: boolean;

  /**
   * `<Option />` elements
   * @type <Option />
   */
  children:
    | React.ReactFragment
    | React.ReactComponentElement<typeof Option>
    | Array<
        | React.ReactComponentElement<typeof Option>
        | React.ReactFragment
        | ReactEmpty
      >;
}
