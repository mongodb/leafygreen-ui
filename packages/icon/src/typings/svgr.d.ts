declare namespace SVGR {
  interface ComponentProps extends React.SVGProps<SVGSVGElement> {
    title?: string | null | boolean;
  }

  type Component = React.ComponentType<ComponentProps>;
}

declare namespace LGGlyph {
  interface ComponentProps extends SVGR.ComponentProps {
    size?: number;
  }

  type Component = React.ComponentType<ComponentProps>;
}
