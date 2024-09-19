import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const baseStyles = css`
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;

  &:after {
    content: '';
    display: block;
    height: var(--pseudo-height);
  }
`;

export const themeStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    color: ${palette.gray.light2};
  `,
  [Theme.Light]: css`
    color: ${palette.gray.dark3};
  `,
};

export const tableContainerStyles = css`
  overflow: auto;
  width: 100%;
  position: relative;
`;

// export const getTableContainerStyles = (
//   isVirtual = false,
//   virtualizer: {},
// ) => css`
//   ${isVirtual &&
//   css`
//     table {
//       display: grid;
//     }

//     thead {
//       display: grid;
//       top: 0;
//       z-index: 1;

//       tr {
//         display: flex;
//         width: 100%;
//       }

//       th {
//         display: flex;
//         /* width: 100%; */
//         box-sizing: content-box;
//       }
//     }

//     th {
//       display: flex;
//     }

//     tbody {
//       display: grid;
//       position: relative;
//       height: ${virtualizer.getTotalSize()}px;

//       tr {
//         display: flex;
//         position: absolute;
//         width: 100%;
//       }

//       td {
//         display: flex;
//         box-sizing: content-box;
//       }
//     }
//   `}
// `;
