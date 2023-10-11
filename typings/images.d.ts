declare module '*.png' {
  const value: string;
  export = value;
}

declare module '*.jpg' {
  const value: string;
  export = value;
}

declare module '*.gif' {
  const value: string;
  export = value;
}

declare module '*.svg' {
  const content: {
    svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  };
  export default content;
}
