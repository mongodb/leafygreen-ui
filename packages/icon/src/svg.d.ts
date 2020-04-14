declare module '*.svg' {
  const value: React.ComponentType<
    React.SVGProps<SVGSVGElement> & {
      title?: string | null | boolean;
    }
  >;

  export = value;
}
