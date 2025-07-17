import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { fontWeights, spacing } from '@leafygreen-ui/tokens';

export const DividerStyle = css`
  width: 353px;
`;

export const SuggestionCardWrapperStyle = css`
  background-color: ${palette.gray.light3};
  border: 1px solid ${palette.gray.light2};
  border-radius: 12px;
  width: 100%;
  padding: ${spacing[300]}px;
  gap: ${spacing[200]}px;
  font-size: 13px;
  line-height: 20px;
`;

export const ApplyButtonStyle = css`
  width: 100%;
  margin-top: ${spacing[200]}px;
  font-weight: ${fontWeights.regular};
`;

export const BannerWrapperStyle = css`
  width: 100%;
  gap: ${spacing[200]}px;
  font-size: 13px;
  line-height: 20px;
  margin-top: ${spacing[400]}px;
  justify-content: space-between;
`;

export const BoldedTextStyle = css`
  font-weight: 600;
`;

export const TableStyle = css`
  width: 100%;
  gap: ${spacing[200]}px;
  line-height: 20px;
  margin-top: ${spacing[200]}px;
`;

export const TableHeaderStyle = css`
  text-align: left;
  padding: ${spacing[50]}px 0;
`;

export const TableCellStyle = css`
  text-align: right;
  padding: ${spacing[50]}px 0;
`;

export const ListStyle = css`
  padding-left: ${spacing[500]}px;
  line-height: 20px;
  margin: ${spacing[100]}px;
`;

export const GeneralErrorContainerStyle = css`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
