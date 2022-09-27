import {
  ComponentDoc,
  PropItem as TSDocPropItem,
} from 'react-docgen-typescript';
export const InheritablePropGroups = {
  HTMLAttributes:
    'https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes',
  AriaAttributes:
    'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes',
  SVGAttributes: 'https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute',
  DOMAttributes:
    'https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes',
  String: '',
} as const;

export type InheritablePropGroups = keyof typeof InheritablePropGroups;
export type PropItem = TSDocPropItem & { tags?: Record<string, any> };
export type Props = Record<string, PropItem>;
export type PropCategory = Record<string, Props>;
export type GroupedPropRecord = Record<string, Props | string>;
export type CustomComponentDoc = Omit<ComponentDoc, 'props' | 'filePath'> & {
  props: GroupedPropRecord;
};

/** Determines if a prop group is inherited */
export function isInheritableGroup(groupName: string): boolean {
  return (
    Object.keys(InheritablePropGroups).includes(groupName) ||
    groupName.endsWith('HTMLAttributes')
  );
}

export function getHTMLAttributesLink(groupName: string): string {
  if (Object.keys(InheritablePropGroups).includes(groupName)) {
    return InheritablePropGroups[
      groupName as keyof typeof InheritablePropGroups
    ];
  }

  let tag = groupName
    .slice(0, groupName.indexOf('HTMLAttributes'))
    .toLowerCase();

  tag = tag == 'anchor' ? 'a' : tag;
  return `https://developer.mozilla.org/en-US/docs/Web/HTML/Element/${tag}`;
}
