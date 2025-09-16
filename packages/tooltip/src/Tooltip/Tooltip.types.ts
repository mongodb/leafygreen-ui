import React from 'react';

import {
  Align as PopoverAlign,
  DismissMode,
  ElementPosition,
  Justify,
  PopoverProps,
  RenderMode,
} from '@leafygreen-ui/popover';
import { BaseFontSize } from '@leafygreen-ui/tokens';

export const TriggerEvent = {
  Hover: 'hover',
  Click: 'click',
} as const;

export type TriggerEvent = (typeof TriggerEvent)[keyof typeof TriggerEvent];

export const Align = {
  Top: PopoverAlign.Top,
  Bottom: PopoverAlign.Bottom,
  Left: PopoverAlign.Left,
  Right: PopoverAlign.Right,
} as const;

export type Align = Exclude<
  PopoverAlign,
  'center-vertical' | 'center-horizontal'
>;

export { DismissMode, Justify, RenderMode };

export interface PopoverFunctionParameters {
  align: PopoverAlign;
  justify: Justify;
  referenceElPos: ElementPosition;
}

type ModifiedPopoverProps = Omit<
  PopoverProps,
  | 'active'
  | 'adjustOnMutation'
  | 'align'
  | 'children'
  | 'dismissMode'
  | 'onToggle'
>;

export type TooltipProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  keyof ModifiedPopoverProps
> &
  ModifiedPopoverProps & {
    /**
     * Determines the alignment of the popover content relative to the trigger element
     *
     * @default 'top'
     */
    align?: Align;
    /**
     * A slot for the element used to trigger the `Tooltip`.
     *
     * Note: The component passed as `trigger` _must_ accept and render `children`,
     * even if the general use of the component does not require children.
     * The `tooltip` content is rendered (via `Popover`) as a child of the trigger,
     * and if the trigger does not render any children, then the trigger will not be rendered.
     */
    trigger?: React.ReactElement | ((props: any) => React.ReactElement);

    /**
     * Determines if a `hover` or `click` event will trigger the opening of a `Tooltip`.
     * @default 'hover'
     */
    triggerEvent?: TriggerEvent;

    /**
     * Provides an initial value to uncontrolled open/setOpen state
     * @default `false`
     */
    initialOpen?: boolean;

    /**
     * Controls component and determines the open state of the `Tooltip`
     * @default `false`
     */
    open?: boolean;

    /**
     * Callback to change the open state of the `Tooltip`.
     */
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;

    /**
     * Whether the `Tooltip` will appear in dark mode.
     * @default false
     */
    darkMode?: boolean;

    /**
     * id given to `Tooltip` content.
     */
    id?: string;

    /**
     * Callback to determine whether or not `Tooltip` should close when user tries to close it.
     *
     */
    shouldClose?: () => boolean;

    /**
     * Enables Tooltip to trigger based on the event specified by `triggerEvent`.
     * @default true
     */
    enabled?: boolean;

    /**
     * Callback that is called when the tooltip is closed internally. E.g. on ESC press, on backdrop click, on blur.
     *
     */
    onClose?: () => void;

    /**
     * Allows consuming applications to override font-size as set by the LeafyGreen Provider.
     *
     */
    baseFontSize?: BaseFontSize;
  };
