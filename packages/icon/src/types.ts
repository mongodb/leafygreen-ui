export namespace SVGR {
  export interface ComponentProps extends React.SVGProps<SVGSVGElement> {
    title?: string | null | boolean;
  }

  export type Component = React.ComponentType<ComponentProps>;
}

export namespace LGGlyph {
  export interface ComponentProps extends SVGR.ComponentProps {
    size?: number | 'small' | 'default' | 'large' | 'xlarge';
    titleId?: string;
  }

  export type Component = React.ComponentType<ComponentProps>;
}
