import { transparentize } from 'polished';
import { css } from '@leafygreen-ui/emotion';
import { createDataProp } from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';

const stepperHeight = 48;

export const dataProps = {
  stepBoxTop: createDataProp('step-box-top'),
  stepBoxBottom: createDataProp('step-box-bottom'),
};

export const layerStyle = css`
  display: flex;
  position: absolute;
  left: 0;
  height: 100%;
  width: 100%;
  transition: opacity 700ms, visibility 700ms;
`;

export const stepBoxStyle = css`
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;

  // Safari doesn't correctly position absolutely positioned elements inside flex containers
  // https://developers.google.com/web/updates/2016/06/absolute-positioned-children
  left: 0;
  top: 0;
`;

const stepBoxHalfStyle = css`
  display: inline-block;

  height: 50%;
  width: 100%;

  & > *,
  &:before,
  &:after {
    display: inline-block;
    height: 100%;
    background: white;
    border: 1px solid #dee0e3;
  }

  & > * {
    width: calc(100% - ${stepperHeight / 3}px);
    margin-right: -${stepperHeight / 3}px;
    border-left: none;
    border-right: none;
  }

  &:before,
  &:after {
    content: '';
    width: ${stepperHeight / 3}px;
  }

  &:before {
    border-right: none;
  }

  &:after {
    border-left: none;
  }
`;

export const stepBoxTopStyle = css`
  ${stepBoxHalfStyle};

  & > * {
    border-bottom: none;
  }

  &:before,
  &:after {
    border-bottom: none;
    transform-origin: 50% 0%;
    transform: skewX(${Math.atan(2 / 3)}rad);
  }
`;

export const stepBoxBottomStyle = css`
  ${stepBoxHalfStyle};

  & > * {
    border-top: none;
  }

  &:before,
  &:after {
    border-top: none;
    transform-origin: 50% 100%;
    transform: skewX(${-Math.atan(2 / 3)}rad);
  }
`;

export const stepStyle = css`
  flex: 1;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: calc(100% + 2px);
  min-width: 0; // https://css-tricks.com/flexbox-truncated-text/
  margin-left: -${stepperHeight / 3 + 1}px;
  margin-top: -1px;
  margin-bottom: -1px;
  padding-left: ${16 + stepperHeight / 3}px;
  padding-right: 16px;

  color: ${uiColors.gray.dark3};
  font-family: Akzidenz, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: bold;

  z-index: 2;

  &:first-of-type {
    margin-left: 0;
    padding-left: 16px;

    ${dataProps.stepBoxTop.selector}, ${dataProps.stepBoxBottom.selector} {
      &:before {
        transform: none;
      }
    }
  }

  &:last-of-type {
    padding-left: calc(${16 + (2 * stepperHeight) / 3}px);

    ${dataProps.stepBoxTop.selector}, ${dataProps.stepBoxBottom.selector} {
      &:after {
        transform: none;
      }
    }
  }
`;

export const stepTextStyle = css`
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

export const currentStepStyle = css`
  filter: drop-shadow(0px 4px 4px ${transparentize(0.75, uiColors.black)});
  z-index: 3;

  &:last-of-type:not(:first-of-type) {
    ${dataProps.stepBoxTop.selector}:before {
      transform: skewX(${Math.atan(2 / 3)}rad);
    }

    ${dataProps.stepBoxBottom.selector}:before {
      transform: skewX(-${Math.atan(2 / 3)}rad);
    }
  }
`;

export const upcomingStepStyle = css`
  color: ${uiColors.gray.base};
  z-index: 1;

  &:last-of-type {
    z-index: 0;
  }

  ${dataProps.stepBoxTop.selector}, ${dataProps.stepBoxBottom.selector} {
    & > *,
    &:before,
    &:after {
      background: ${uiColors.gray.light3};
      border-color: ${uiColors.gray.light2};
    }
  }
`;

export const hiddenLayerStyle = css`
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
`;

export const slideInAnimationStyle = css`
  left: 0;
  transition: left 700ms;
`;

export const slideOutAnimationStyle = css`
  left: ${(-2 * stepperHeight) / 3}px;
  transition: left 700ms;
`;

export const containerStyle = css`
  position: relative;
  z-index: 0;
  height: ${stepperHeight}px;
  width: 100%;

  background: ${uiColors.gray.light3};
  border-bottom: 1px solid;
  border-top: 1px solid;
  border-color: ${uiColors.gray.light2};
`;

export const stepLabelStyle = css`
  display: flex;
  position: absolute;

  align-items: center;
  justify-content: center;
  top: calc(100% - 12px);

  height: 24px;
  min-width: 24px;
  max-width: max-content;

  font-size: 12px;
  line-height: 14px;

  border-radius: 12px;
  border: 1px solid;
`;

export const completedStepLabelStyle = css`
  background-color: white;
  border-color: ${uiColors.green.base};
  color: ${uiColors.green.base};
`;

export const currentStepLabelStyle = css`
  background-color: ${uiColors.gray.dark2};
  border-color: #464c4f;
  color: white;
`;

export const upcomingStepLabelStyle = css`
  background-color: white;
  border-color: ${uiColors.gray.light1};
  color: ${uiColors.gray.base};
`;

export const stepLabelTextStyle = css('padding: 0 8px;');

export const previewStyle = css('cursor: pointer;');
