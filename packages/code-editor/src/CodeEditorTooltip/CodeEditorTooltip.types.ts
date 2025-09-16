import { ReactNode } from "react";

export interface CodeEditorTooltipProps {
  content: ReactNode
  links?: Array<{
    label: string;
    href: string;
  }>
}