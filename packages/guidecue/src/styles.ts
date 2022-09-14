import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const tooltipStyles = css`
  padding: 32px 16px 16px;
`;

export const beaconStyles = css`
  background: rgba(1, 107, 248, 0.51); //TODO: use transparentize
  width: 24px;
  height: 24px;
  border-radius: 50%;
  position: relative;

  &::before {
    content: '';
    background: rgba(1, 107, 248, 0.17);
    width: 60px;
    height: 60px;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 50%;

    animation: pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
  }

  @keyframes pulse-ring {
    0% {
      transform: translateX(-50%) translateY(-50%) scale(0.73);
    }
    100% {
      opacity: 0;
    }
  }
`;

export const contentStyles = css`
  margin-bottom: 16px;
`;

export const footerStyles = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
`;

export const bodyThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.light1};
  `,
  [Theme.Dark]: css`
    color: ${palette.black};
  `,
};

export const bodyTitleStyles = css`
  + * {
    margin-top: 4px;
  }
`;

export const closeStyles = css`
  position: absolute;
  top: 10px;
  right: 10px;
`;
