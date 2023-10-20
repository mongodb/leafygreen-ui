declare module '*.svg' {
  const content:
    | {
        svg: string;
      }
    | React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
