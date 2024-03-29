import React from 'react';

import { BaseRichLinkProps, RichLinkBadgeControlProps } from './RichLink.types';
import { RichLink } from '.';

const richLinkVariantProps = {
  Blog: {
    badgeVariant: 'green',
    badgeLabel: 'Blog',
    badgeGlyph: 'SMS',
  },
  Book: {
    badgeVariant: 'yellow',
    badgeLabel: 'Book',
    badgeGlyph: 'University',
  },
  Code: {
    badgeVariant: 'gray',
    badgeLabel: 'Code',
    badgeGlyph: 'CodeBlock',
  },
  Docs: {
    badgeVariant: 'blue',
    badgeLabel: 'Docs',
    badgeGlyph: 'Note',
  },
  Learn: {
    badgeVariant: 'red',
    badgeLabel: 'Learn',
    badgeGlyph: 'Cap',
  },
  Video: {
    badgeVariant: 'red',
    badgeLabel: 'Video',
    badgeGlyph: 'Play',
  },
  Website: {
    badgeVariant: 'purple',
    badgeLabel: 'Website',
    badgeGlyph: 'Laptop',
  },
} as const satisfies Record<string, CreateRichLinkVariantArgs>;

export type CreateRichLinkVariantArgs = RichLinkBadgeControlProps;

export function createRichLinkVariant(args: CreateRichLinkVariantArgs) {
  const RichLinkVariant = (props: BaseRichLinkProps) => (
    <RichLink {...args} {...props} />
  );
  return RichLinkVariant;
}

export type RichLinkVariantName = keyof typeof richLinkVariantProps;

export type RichLinkVariantMap = Record<
  RichLinkVariantName,
  React.ComponentType<BaseRichLinkProps>
>;

const variantEntries = Object.entries(richLinkVariantProps) as Array<
  [RichLinkVariantName, CreateRichLinkVariantArgs]
>;

export const richLinkVariants = variantEntries.reduce(
  (acc, [variantName, createRichLinkVariantArgs]) => {
    return {
      ...acc,
      [variantName]: createRichLinkVariant(createRichLinkVariantArgs),
    };
  },
  {} as RichLinkVariantMap,
);
