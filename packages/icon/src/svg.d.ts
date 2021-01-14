declare module '*.svg' {
  const value: React.ComponentType<
    React.SVGProps<SVGSVGElement> & {
      title?: string | null;
      role?: 'img' | 'presentation';
    }
  >;

  export = value;
}
