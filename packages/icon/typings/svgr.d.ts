declare namespace SVGR {
  interface ComponentProps extends React.SVGProps<SVGSVGElement> {
    title?: string | null;
  }

  type Component = React.ComponentType<ComponentProps>;
}

declare namespace LGGlyph {
  interface ComponentProps extends SVGR.ComponentProps {
    size?: 'small' | 'default' | 'large' | 'xlarge' | number;
  }

  type Component = React.ComponentType<ComponentProps>;
}
