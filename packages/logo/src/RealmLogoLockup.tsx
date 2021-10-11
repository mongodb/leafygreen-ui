import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import {
  LogoProps,
  SupportedColors,
  SupportedColorsMap,
  getAccessibleProps,
} from './utils';

/**
 * # RealmLogoLockup
 *
 * React Component that displays the Realm Logo Lockup.
 *
 * ```
 * <RealmLogoLockup />
 * ```
 * @param props.color Determines the color of the logo.
 * @param props.height Determines height of the <Logo /> component.
 */
function RealmLogoLockup({
  height = 40,
  className,
  color = SupportedColors.GreenDark2,
  role = 'img',
  'aria-label': ariaLabel = 'MongoDB Logo',
  ...rest
}: LogoProps): ReactElement {
  const fill = SupportedColorsMap[color];

  return (
    <svg
      {...rest}
      {...getAccessibleProps({ 'aria-label': ariaLabel, role })}
      className={cx(
        css`
          width: auto;
          height: ${height}px;
        `,
        className,
      )}
      height={height}
      viewBox="0 0 128 47"
      fill="none"
    >
      <path
        d="M9.56201 3.32712C8.30916 1.84066 7.23032 0.33097 7.00991 0.0174195C6.98671 -0.00580649 6.9519 -0.00580649 6.9287 0.0174195C6.70829 0.33097 5.62945 1.84066 4.37661 3.32712C-6.37699 17.0421 6.07028 26.2976 6.07028 26.2976L6.17467 26.3673C6.26748 27.7957 6.49949 29.8512 6.49949 29.8512H6.96351H7.42753C7.42753 29.8512 7.65954 27.8073 7.75234 26.3673L7.85674 26.286C7.86834 26.2976 20.3156 17.0421 9.56201 3.32712ZM6.96351 26.0886C6.96351 26.0886 6.40669 25.6124 6.25588 25.3686V25.3453L6.9287 10.411C6.9287 10.3646 6.99831 10.3646 6.99831 10.411L7.67113 25.3453V25.3686C7.52033 25.6124 6.96351 26.0886 6.96351 26.0886Z"
        fill={fill}
      />
      <path
        d="M30.2578 23.041L25.0709 10.3725L25.0593 10.3375H21.0237V11.1891H21.675C21.8727 11.1891 22.0588 11.2707 22.1983 11.4107C22.3379 11.5507 22.4077 11.7373 22.4077 11.9357L22.2914 24.6858C22.2914 25.0824 21.9657 25.409 21.5703 25.4207L20.9074 25.4323V26.2723H24.8383V25.4323L24.4313 25.4207C24.0359 25.409 23.7102 25.0824 23.7102 24.6858V12.6706L29.3623 26.2723C29.4437 26.4706 29.6298 26.5989 29.8392 26.5989C30.0485 26.5989 30.2346 26.4706 30.316 26.2723L35.8402 12.9739L35.9216 24.6858C35.9216 25.0941 35.5959 25.4207 35.1889 25.4323H34.7702V26.2723H39.3757V25.4323H38.7476C38.3522 25.4323 38.0266 25.0941 38.0149 24.6974L37.9801 11.9473C37.9801 11.539 38.3057 11.2124 38.7011 11.2007L39.3757 11.1891V10.3375H35.4447L30.2578 23.041Z"
        fill={fill}
      />
      <path
        d="M66.424 25.2105C66.2957 25.082 66.2257 24.9067 66.2257 24.6963V18.433C66.2257 17.2411 65.8759 16.3063 65.1763 15.6402C64.4884 14.9741 63.5323 14.6353 62.3429 14.6353C60.6755 14.6353 59.3579 15.313 58.4368 16.6451C58.4251 16.6685 58.3902 16.6802 58.3552 16.6802C58.3202 16.6802 58.2969 16.6568 58.2969 16.6218L57.8654 14.9508H57.1425L55.2886 16.0141V16.5984H55.7666C55.9882 16.5984 56.1747 16.6568 56.303 16.7737C56.4313 16.8905 56.5012 17.0658 56.5012 17.3112V24.6847C56.5012 24.895 56.4313 25.0703 56.303 25.1988C56.1747 25.3274 55.9998 25.3975 55.79 25.3975H55.3236V26.2505H59.5911V25.3975H59.1247C58.9148 25.3975 58.74 25.3274 58.6117 25.1988C58.4834 25.0703 58.4135 24.895 58.4135 24.6847V19.8002C58.4135 19.1809 58.5534 18.5615 58.8099 17.9539C59.0781 17.3579 59.4745 16.8555 59.9992 16.4698C60.5239 16.0842 61.1536 15.8973 61.8765 15.8973C62.6927 15.8973 63.3107 16.1544 63.6955 16.6685C64.0803 17.1827 64.2785 17.8487 64.2785 18.6433V24.673C64.2785 24.8833 64.2085 25.0586 64.0803 25.1871C63.952 25.3157 63.7771 25.3858 63.5672 25.3858H63.1008V26.2388H67.3684V25.3858H66.902C66.7271 25.4092 66.5639 25.339 66.424 25.2105Z"
        fill={fill}
      />
      <path
        d="M105.414 11.2914C104.234 10.6632 102.916 10.3375 101.493 10.3375H95.942V11.1867H96.4855C96.6937 11.1867 96.8787 11.2681 97.0638 11.4542C97.2373 11.6287 97.3298 11.8264 97.3298 12.0358V24.5521C97.3298 24.7615 97.2373 24.9592 97.0638 25.1337C96.8903 25.3082 96.6937 25.4013 96.4855 25.4013H95.942V26.2504H101.493C102.916 26.2504 104.234 25.9247 105.414 25.2966C106.593 24.6684 107.553 23.7379 108.247 22.5514C108.941 21.3649 109.299 19.9341 109.299 18.3056C109.299 16.6771 108.941 15.258 108.247 14.0598C107.542 12.8501 106.593 11.9311 105.414 11.2914ZM107.067 18.2823C107.067 19.7713 106.801 21.0275 106.281 22.0395C105.761 23.0516 105.067 23.8077 104.211 24.2962C103.355 24.7848 102.407 25.029 101.389 25.029H100.267C100.059 25.029 99.8741 24.9476 99.689 24.7615C99.5155 24.587 99.423 24.3893 99.423 24.1799V12.3732C99.423 12.1638 99.504 11.9777 99.689 11.7916C99.8625 11.6171 100.059 11.524 100.267 11.524H101.389C102.407 11.524 103.355 11.7683 104.211 12.2568C105.067 12.7454 105.761 13.5015 106.281 14.5135C106.801 15.5371 107.067 16.805 107.067 18.2823Z"
        fill={fill}
      />
      <path
        d="M122.421 19.1315C121.908 18.5382 120.917 18.0381 119.751 17.7705C121.36 16.9679 122.188 15.8396 122.188 14.3855C122.188 13.5945 121.978 12.885 121.559 12.2801C121.139 11.6752 120.544 11.1867 119.786 10.8493C119.029 10.512 118.143 10.3375 117.14 10.3375H110.856V11.1867H111.357C111.567 11.1867 111.754 11.2681 111.94 11.4542C112.115 11.6287 112.208 11.8264 112.208 12.0358V24.5521C112.208 24.7615 112.115 24.9592 111.94 25.1337C111.765 25.3082 111.567 25.4013 111.357 25.4013H110.809V26.2504H117.63C118.667 26.2504 119.635 26.0759 120.509 25.727C121.384 25.378 122.083 24.8662 122.584 24.1915C123.097 23.5168 123.354 22.691 123.354 21.7371C123.342 20.7135 123.039 19.8411 122.421 19.1315ZM114.598 24.7731C114.424 24.5986 114.33 24.4009 114.33 24.1915V18.5731H117.571C118.714 18.5731 119.588 18.8639 120.194 19.4456C120.801 20.0272 121.104 20.7833 121.104 21.7138C121.104 22.2722 120.964 22.8189 120.707 23.3191C120.439 23.8309 120.043 24.238 119.507 24.5521C118.982 24.8662 118.329 25.029 117.571 25.029H115.181C114.972 25.029 114.785 24.9476 114.598 24.7731ZM114.342 17.375V12.3848C114.342 12.1754 114.424 11.9893 114.61 11.8032C114.785 11.6287 114.983 11.5356 115.193 11.5356H116.732C117.839 11.5356 118.656 11.8148 119.169 12.3499C119.682 12.8966 119.938 13.5945 119.938 14.4553C119.938 15.3394 119.693 16.0489 119.215 16.584C118.737 17.1075 118.014 17.375 117.058 17.375H114.342Z"
        fill={fill}
      />
      <path
        d="M50.1778 15.3772C49.2869 14.8903 48.2919 14.6353 47.216 14.6353C46.14 14.6353 45.1335 14.8787 44.2542 15.3772C43.3634 15.8641 42.6576 16.5712 42.137 17.4638C41.6164 18.3565 41.3503 19.3998 41.3503 20.559C41.3503 21.7183 41.6164 22.7616 42.137 23.6542C42.6576 24.5469 43.3634 25.254 44.2542 25.7409C45.1451 26.2278 46.14 26.4828 47.216 26.4828C48.2919 26.4828 49.2985 26.2394 50.1778 25.7409C51.0686 25.254 51.7743 24.5469 52.295 23.6542C52.8156 22.7616 53.0817 21.7183 53.0817 20.559C53.0817 19.3998 52.8156 18.3565 52.295 17.4638C51.7743 16.5712 51.0686 15.8641 50.1778 15.3772ZM51.0339 20.559C51.0339 21.9849 50.6868 23.1442 49.9926 23.9788C49.3101 24.8135 48.3729 25.2424 47.216 25.2424C46.059 25.2424 45.1219 24.8135 44.4393 23.9788C43.7452 23.1442 43.3981 21.9849 43.3981 20.559C43.3981 19.1331 43.7452 17.9739 44.4393 17.1392C45.1219 16.3046 46.059 15.8756 47.216 15.8756C48.3729 15.8756 49.3101 16.3046 49.9926 17.1392C50.6868 17.9739 51.0339 19.1331 51.0339 20.559Z"
        fill={fill}
      />
      <path
        d="M91.1796 15.3772C90.2888 14.8903 89.2938 14.6353 88.2178 14.6353C87.1419 14.6353 86.1353 14.8787 85.2561 15.3772C84.3652 15.8641 83.6595 16.5712 83.1388 17.4638C82.6182 18.3565 82.3521 19.3998 82.3521 20.559C82.3521 21.7183 82.6182 22.7616 83.1388 23.6542C83.6595 24.5469 84.3652 25.254 85.2561 25.7409C86.1469 26.2278 87.1419 26.4828 88.2178 26.4828C89.2938 26.4828 90.3003 26.2394 91.1796 25.7409C92.0705 25.254 92.7762 24.5469 93.2968 23.6542C93.8175 22.7616 94.0836 21.7183 94.0836 20.559C94.0836 19.3998 93.8175 18.3565 93.2968 17.4638C92.7762 16.5712 92.0589 15.8641 91.1796 15.3772ZM92.0357 20.559C92.0357 21.9849 91.6887 23.1442 90.9945 23.9788C90.3119 24.8135 89.3748 25.2424 88.2178 25.2424C87.0609 25.2424 86.1237 24.8135 85.4412 23.9788C84.747 23.1442 84.3999 21.9849 84.3999 20.559C84.3999 19.1216 84.747 17.9739 85.4412 17.1392C86.1237 16.3046 87.0609 15.8756 88.2178 15.8756C89.3748 15.8756 90.3119 16.3046 90.9945 17.1392C91.6771 17.9739 92.0357 19.1331 92.0357 20.559Z"
        fill={fill}
      />
      <path
        d="M74.6442 14.6353C73.7121 14.6353 72.8615 14.8332 72.0925 15.2292C71.3235 15.6252 70.7176 16.1609 70.2865 16.848C69.8554 17.5234 69.634 18.2804 69.634 19.084C69.634 19.806 69.7971 20.4698 70.135 21.0638C70.4613 21.6344 70.904 22.1119 71.4633 22.5079L69.7971 24.7672C69.5874 25.0467 69.5641 25.4193 69.7156 25.7221C69.8787 26.0366 70.1816 26.2229 70.5312 26.2229H71.0089C70.5428 26.5374 70.17 26.91 69.9136 27.3526C69.6107 27.8533 69.4592 28.3774 69.4592 28.9131C69.4592 29.9147 69.902 30.7415 70.7759 31.3588C71.6381 31.976 72.8499 32.2904 74.3762 32.2904C75.4365 32.2904 76.4502 32.1157 77.3707 31.778C78.3028 31.4403 79.0602 30.9395 79.6195 30.2873C80.1904 29.6352 80.4817 28.8432 80.4817 27.9349C80.4817 26.9799 80.1322 26.3044 79.3165 25.6523C78.6174 25.1049 77.5222 24.8138 76.1589 24.8138H71.4983C71.4866 24.8138 71.475 24.8021 71.475 24.8021C71.475 24.8021 71.4633 24.7788 71.475 24.7672L72.6867 23.1368C73.013 23.2882 73.3159 23.3813 73.5839 23.4395C73.8635 23.4978 74.1782 23.5211 74.5277 23.5211C75.5064 23.5211 76.392 23.3231 77.161 22.9271C77.93 22.5312 78.5475 21.9955 78.9903 21.3084C79.4331 20.6329 79.6544 19.8759 79.6544 19.0723C79.6544 18.2105 79.235 16.6384 78.0931 15.8348C78.0931 15.8231 78.1048 15.8231 78.1048 15.8231L80.6099 16.1026V14.9497H76.6017C75.9725 14.7517 75.32 14.6353 74.6442 14.6353ZM76.0424 21.9256C75.5997 22.1585 75.1219 22.2866 74.6442 22.2866C73.8636 22.2866 73.1761 22.0071 72.5935 21.4597C72.0109 20.9124 71.7196 20.1088 71.7196 19.084C71.7196 18.0591 72.0109 17.2556 72.5935 16.7082C73.1761 16.1609 73.8636 15.8814 74.6442 15.8814C75.1336 15.8814 75.5997 15.9978 76.0424 16.2424C76.4852 16.4753 76.8464 16.8363 77.1377 17.3138C77.4173 17.7913 77.5688 18.3852 77.5688 19.084C77.5688 19.7944 77.429 20.3883 77.1377 20.8542C76.858 21.3316 76.4852 21.6927 76.0424 21.9256ZM72.8848 26.2113H76.0424C76.9163 26.2113 77.4756 26.386 77.8484 26.7586C78.2213 27.1313 78.4077 27.6321 78.4077 28.2144C78.4077 29.0645 78.0698 29.7633 77.394 30.2873C76.7182 30.8114 75.8094 31.0793 74.6908 31.0793C73.7121 31.0793 72.8965 30.858 72.3022 30.4387C71.708 30.0195 71.4051 29.379 71.4051 28.5637C71.4051 28.0513 71.5449 27.5738 71.8245 27.1546C72.1042 26.7353 72.442 26.4325 72.8848 26.2113Z"
        fill={fill}
      />
      <path
        d="M125.718 26.0561C125.487 25.9304 125.314 25.7475 125.176 25.5303C125.049 25.3016 124.98 25.0615 124.98 24.7986C124.98 24.5356 125.049 24.2841 125.176 24.0669C125.303 23.8383 125.487 23.6668 125.718 23.541C125.948 23.4153 126.202 23.3467 126.49 23.3467C126.778 23.3467 127.032 23.4153 127.262 23.541C127.493 23.6668 127.666 23.8497 127.804 24.0669C127.931 24.2956 128 24.5356 128 24.7986C128 25.0615 127.931 25.313 127.804 25.5303C127.677 25.7589 127.493 25.9304 127.262 26.0561C127.032 26.1819 126.778 26.2505 126.49 26.2505C126.213 26.2505 125.948 26.1933 125.718 26.0561ZM127.136 25.8961C127.331 25.7932 127.47 25.6331 127.585 25.4502C127.689 25.2559 127.746 25.0387 127.746 24.7986C127.746 24.5585 127.689 24.3413 127.585 24.1469C127.481 23.9526 127.331 23.804 127.136 23.7011C126.94 23.5982 126.732 23.541 126.49 23.541C126.248 23.541 126.04 23.5982 125.845 23.7011C125.649 23.804 125.51 23.964 125.395 24.1469C125.291 24.3413 125.234 24.5585 125.234 24.7986C125.234 25.0387 125.291 25.2559 125.395 25.4502C125.499 25.6446 125.649 25.7932 125.845 25.8961C126.04 25.999 126.248 26.0561 126.49 26.0561C126.732 26.0561 126.951 25.999 127.136 25.8961ZM125.868 25.496V25.3931L125.891 25.3816H125.96C125.983 25.3816 126.006 25.3702 126.017 25.3588C126.04 25.3359 126.041 25.3245 126.041 25.3016V24.2384C126.041 24.2155 126.029 24.1927 126.017 24.1812C125.994 24.1584 125.983 24.1584 125.96 24.1584H125.891L125.868 24.1469V24.044L125.891 24.0326H126.49C126.663 24.0326 126.79 24.0669 126.893 24.1469C126.997 24.227 127.043 24.3299 127.043 24.4671C127.043 24.5699 127.009 24.6728 126.928 24.7414C126.847 24.8214 126.755 24.8672 126.64 24.8786L126.778 24.9243L127.043 25.3473C127.066 25.3816 127.089 25.3931 127.124 25.3931H127.193L127.205 25.4045V25.5074L127.193 25.5188H126.836L126.813 25.5074L126.444 24.89H126.352V25.3016C126.352 25.3245 126.363 25.3473 126.375 25.3588C126.398 25.3816 126.409 25.3816 126.432 25.3816H126.502L126.525 25.3931V25.496L126.502 25.5074H125.891L125.868 25.496ZM126.455 24.7414C126.548 24.7414 126.628 24.7186 126.674 24.6614C126.721 24.6157 126.755 24.5356 126.755 24.4442C126.755 24.3527 126.732 24.2841 126.686 24.227C126.64 24.1698 126.571 24.1469 126.49 24.1469H126.444C126.421 24.1469 126.398 24.1584 126.386 24.1698C126.363 24.1927 126.363 24.2041 126.363 24.227V24.7414H126.455Z"
        fill={fill}
      />
      <path
        d="M22.3276 46.7362H23.6517V40.9867H25.063L29.9588 46.7362H31.6837L26.8053 41.0041C28.8089 40.8473 30.0285 39.5754 30.0285 37.6938C30.0285 35.6727 28.6347 34.366 26.3697 34.366H22.3276V46.7362ZM23.6517 39.7671V35.603H26.2129C27.7809 35.603 28.6869 36.3173 28.6869 37.6938C28.6869 39.0702 27.7809 39.7671 26.2129 39.7671H23.6517Z"
        fill={fill}
      />
      <path
        d="M36.4438 46.9104C38.6739 46.9104 39.998 45.6212 40.4162 44.1402H39.1617C38.5694 45.3424 37.5937 45.778 36.4438 45.778C34.8583 45.778 33.4122 44.5235 33.3773 42.729H40.5556C40.7821 40.2201 39.2837 37.8506 36.496 37.8506C33.7607 37.8506 32.1229 39.8542 32.1229 42.3805C32.1229 44.9765 33.9349 46.9104 36.4438 46.9104ZM36.4438 38.983C37.8899 38.983 39.0224 39.9065 39.3011 41.6662H33.447C33.7607 39.6974 35.1545 38.983 36.4438 38.983Z"
        fill={fill}
      />
      <path
        d="M46.4653 46.9104C47.8069 46.9104 49.0613 46.2135 49.6886 45.2727V46.7362H50.9082V38.0248H49.6886V39.4883C49.0613 38.5475 47.8069 37.8506 46.4653 37.8506C43.9913 37.8506 42.127 39.889 42.127 42.3805C42.127 44.872 43.9913 46.9104 46.4653 46.9104ZM46.5873 45.778C44.6882 45.778 43.3815 44.2622 43.3815 42.3805C43.3815 40.4988 44.6882 38.983 46.5873 38.983C48.4864 38.983 49.7931 40.4988 49.7931 42.3805C49.7931 44.2622 48.4864 45.778 46.5873 45.778Z"
        fill={fill}
      />
      <path d="M53.9012 46.7362H55.1208V33.6691H53.9012V46.7362Z" fill={fill} />
      <path
        d="M58.1208 46.7362H59.3404V42.3979C59.3404 40.3246 60.4032 38.983 61.9364 38.983C63.1386 38.983 63.7658 40.0284 63.7658 41.4571V46.7362H64.9854V42.3979C64.9854 40.3246 66.0308 38.983 67.564 38.983C68.7662 38.983 69.4108 40.0284 69.4108 41.4571V46.7362H70.6304V41.2829C70.6304 39.2444 69.4805 37.8506 67.6511 37.8506C66.2573 37.8506 65.1945 38.6346 64.7589 39.8019C64.3408 38.5997 63.3825 37.8506 62.0584 37.8506C60.8562 37.8506 59.8457 38.4778 59.3404 39.4883V38.0248H58.1208V46.7362Z"
        fill={fill}
      />
    </svg>
  );
}

RealmLogoLockup.displayName = 'RealmLogoLockup';

RealmLogoLockup.propTypes = {
  height: PropTypes.number,
  color: PropTypes.oneOf(Object.values(SupportedColors)),
};

export default RealmLogoLockup;
