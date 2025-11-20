import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MCP UI App',
  description: 'MCP UI Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
