import { HTMLElementProps } from '@leafygreen-ui/lib';

export const ContentStyle = {
    None: 'none',
    Clickable: 'clickable',
} as const;

export type ContentStyle = typeof ContentStyle[keyof typeof ContentStyle];



export interface CardProps extends HTMLElementProps<'div'> {
    /**
     * Determines whether the Card should be styled as clickable.
     *
     * Defaults to `'clickable'` (when a valid `onClick` handler or `href` link is provided
     *
     * @default 'clickable' | 'none'
     */
    contentStyle?: ContentStyle;

    /**
     * Determines whether or not the component will appear in dark mode.
     *
     * @default false
     */
    darkMode?: boolean;
}
