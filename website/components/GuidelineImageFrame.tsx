import React from 'react';
import { css } from '@emotion/css';
import IconDo from './icons/IconDo';
import IconDont from './icons/IconDont';

const GuidelineImageFrame = ({
  type,
  imageUrl,
  className,
  imageClassName,
  children,
}: {
  type: 'do' | 'dont';
  imageUrl: string;
  className: string;
  imageClassName: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 40px 0;
        ${className}
      `}
    >
      <div
        className={css`
          width: 700px;
          height: 333px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #798c91;
          border-radius: 10px;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 50%;
          background-image: url(${imageUrl});
          ${imageClassName}
        `}
      >
        {children}
      </div>
      {type && (
        <>
          <div
            className={css`
              width: 100%;
              height: 3px;
              background-color: ${type === 'do' ? '#13AA52' : '#CF4A22'};
              margin: 24px 0 16px 0;
            `}
          />

          {type === 'do' && <IconDo />}
          {type === 'dont' && <IconDont />}
        </>
      )}
    </div>
  );
};

GuidelineImageFrame.displayName = 'GuidelineImageFrame';

export default GuidelineImageFrame;
