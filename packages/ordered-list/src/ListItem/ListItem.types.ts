import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export type ListItemProps = Omit<HTMLElementProps<'li'>, 'title'> &
  DarkModeProps & {
    /**
     *
     * The title of the list item.
     */
    title?: React.ReactNode;

    /**
     * The description of the list item. This will render below the title.
     */
    description?: React.ReactNode;
  };
