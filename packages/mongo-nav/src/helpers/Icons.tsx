import React from 'react';
import { HTMLElementProps } from '@leafygreen-ui/lib';

type ProductProps = HTMLElementProps<'svg'> & {
  active: boolean;
};

export function Atlas({ active, ...rest }: ProductProps) {
  return (
    <svg {...rest} width="18px" height="18px" viewBox="0 0 18 18">
      <defs>
        <linearGradient
          x1="28.515977%"
          y1="105.584466%"
          x2="79.424121%"
          y2="-9.67572816%"
          id="linearGradient-1"
        >
          <stop stopColor="#0D6149" offset="0%"></stop>
          <stop stopColor="#03AA4F" offset="36.97%"></stop>
          <stop stopColor="#00D057" offset="64.96%"></stop>
          <stop stopColor="#5FD891" offset="91.18%"></stop>
          <stop stopColor="#80DBA5" offset="100%"></stop>
        </linearGradient>
        <linearGradient
          x1="82.3061787%"
          y1="109.629126%"
          x2="7.44162975%"
          y2="-16.1830097%"
          id="linearGradient-2"
        >
          <stop stopColor="#0D6149" offset="0%"></stop>
          <stop stopColor="#03AA4F" offset="36.97%"></stop>
          <stop stopColor="#00D057" offset="64.96%"></stop>
          <stop stopColor="#5FD891" offset="91.18%"></stop>
          <stop stopColor="#80DBA5" offset="100%"></stop>
        </linearGradient>
        <linearGradient
          x1="2.43172043%"
          y1="82.3204029%"
          x2="114.608065%"
          y2="-3.16314823%"
          id="linearGradient-3"
        >
          <stop stopColor="#0D6149" offset="0%"></stop>
          <stop stopColor="#03AA4F" offset="36.97%"></stop>
          <stop stopColor="#00D057" offset="64.96%"></stop>
          <stop stopColor="#5FD891" offset="91.18%"></stop>
          <stop stopColor="#80DBA5" offset="100%"></stop>
        </linearGradient>
        <linearGradient
          x1="105.040323%"
          y1="85.5592964%"
          x2="-16.483871%"
          y2="-1.59363401%"
          id="linearGradient-4"
        >
          <stop stopColor="#0D6149" offset="0%"></stop>
          <stop stopColor="#03AA4F" offset="36.97%"></stop>
          <stop stopColor="#00D057" offset="64.96%"></stop>
          <stop stopColor="#5FD891" offset="91.18%"></stop>
          <stop stopColor="#80DBA5" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(1.000000, 1.000000)" fillRule="nonzero">
          <path
            d="M10.5142857,9.63809524 C12.2666667,8.45714286 14.1333333,8.15238095 15.6952381,8.19047619 C15.6952381,8.07619048 15.6952381,7.96190476 15.6952381,7.84761905 C15.6952381,6.36190476 15.2761905,4.99047619 14.552381,3.80952381 C13.447619,3.92380952 12.2666667,4.22857143 11.1238095,5.02857143 C9.67619048,6.01904762 8.87619048,7.35238095 8.45714286,8.34285714 L8.45714286,11.6571429 C8.99047619,10.9714286 9.63809524,10.247619 10.5142857,9.63809524 Z"
            fill={active ? 'url(#linearGradient-1)' : 'currentColor'}
          ></path>
          <path
            d="M8.45714286,6.13333333 C8.95238095,5.44761905 9.63809524,4.72380952 10.5142857,4.11428571 C11.6190476,3.35238095 12.7238095,2.97142857 13.8285714,2.78095238 C12.5333333,1.25714286 10.6285714,0.228571429 8.4952381,0.0761904762 L8.4952381,6.13333333 L8.45714286,6.13333333 Z"
            fill={active ? '#00804B' : 'currentColor'}
          ></path>
          <path
            d="M5.33333333,9.63809524 C6.20952381,10.247619 6.85714286,10.9333333 7.39047619,11.6571429 L7.39047619,8.34285714 C6.97142857,7.35238095 6.17142857,6.01904762 4.72380952,5.02857143 C3.58095238,4.26666667 2.4,3.92380952 1.2952381,3.80952381 C0.571428571,4.99047619 0.152380952,6.36190476 0.152380952,7.84761905 C0.152380952,7.96190476 0.152380952,8.07619048 0.152380952,8.19047619 C1.71428571,8.15238095 3.58095238,8.45714286 5.33333333,9.63809524 Z"
            fill={active ? 'url(#linearGradient-2)' : 'currentColor'}
          ></path>
          <path
            d="M11.1238095,10.552381 C9.67619048,11.5428571 8.87619048,12.8761905 8.45714286,13.8666667 L8.45714286,15.6571429 C12,15.4285714 14.8952381,12.7619048 15.5428571,9.33333333 C14.2095238,9.2952381 12.6095238,9.52380952 11.1238095,10.552381 Z"
            fill={active ? 'url(#linearGradient-3)' : 'currentColor'}
          ></path>
          <path
            d="M7.39047619,13.8666667 C6.97142857,12.8761905 6.17142857,11.5428571 4.72380952,10.552381 C3.23809524,9.52380952 1.63809524,9.2952381 0.304761905,9.33333333 C0.952380952,12.7619048 3.84761905,15.3904762 7.39047619,15.6571429 L7.39047619,13.8666667 Z"
            fill={active ? 'url(#linearGradient-4)' : 'currentColor'}
          ></path>
          <path
            d="M5.33333333,4.15238095 C6.20952381,4.76190476 6.85714286,5.44761905 7.39047619,6.17142857 L7.39047619,0.152380952 C5.25714286,0.304761905 3.35238095,1.2952381 2.05714286,2.85714286 C3.12380952,3.00952381 4.26666667,3.39047619 5.33333333,4.15238095 Z"
            fill={active ? '#00804B' : 'currentColor'}
          ></path>
        </g>
      </g>
    </svg>
  );
}

export function RealmActive({ ...rest }: HTMLElementProps<'svg'>) {
  return (
    <svg {...rest} width="18px" height="18px" viewBox="0 0 18 18">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-18.000000, 0.000000)">
          <g transform="translate(18.000000, 0.000000)">
            <g>
              <path
                d="M11.4214018,0.769968612 C10.3827515,0.276248688 9.22068455,0 7.99413824,0 C5.85443655,0 3.91105049,0.840736025 2.47641175,2.20988293 C0.951128921,3.6655174 14.1210613,2.05321411 11.4214018,0.769968612 Z"
                fill="#FCC397"
                fillRule="nonzero"
              ></path>
              <path
                d="M14.2389597,3.00308542 C14.2478884,3.0144892 13.586842,3.89806933 11.5999723,4.14889931 C7.58967691,4.65519538 0.704668626,4.70869724 0.714983402,4.68594297 C1.1388457,3.75580206 1.73672841,2.91534039 2.47641175,2.20988293 C3.34171387,2.4800567 4.2835386,2.54736034 5.17441927,2.38317782 C6.64540092,2.11406982 7.95411844,1.26411485 9.40916672,0.917738215 C10.0550259,0.76261477 10.7585968,0.717266076 11.4212952,0.769915324 C12.5224532,1.29326377 13.4850072,2.06104755 14.2389597,3.00308542 L14.2389597,3.00308542 Z"
                fill="#FC9F95"
                fillRule="nonzero"
              ></path>
              <path
                d="M15.8899311,6.74118204 C15.8949893,6.77336843 6.84672569,7.62390958 2.43815046,7.37601049 C1.00180649,7.29522478 0.154142931,6.42683193 0.163626682,6.37940498 C0.283400198,5.79599826 0.468322332,5.2279146 0.715059922,4.68588967 C1.98866016,3.98876676 3.48713877,3.58643694 4.9401088,3.60231698 C6.76220978,3.62096804 8.54972636,4.22845938 10.3718273,4.18316395 C11.7250409,4.14873945 13.0889655,3.71688772 14.2387761,3.00308542 C15.0861199,4.06203872 15.6697379,5.34128757 15.8899311,6.74118204 Z"
                fill="#F77C88"
                fillRule="nonzero"
              ></path>
              <path
                d="M15.9874457,7.99330695 C15.9874457,8.03758987 15.9863794,8.12594254 15.9863794,8.12594254 C15.9863794,8.12594254 13.4731771,8.75981177 10.2365273,8.72197678 C5.7031499,8.66900782 0.00109774748,7.93778009 0.00109774748,7.92440462 C0.00524209852,7.40386414 0.060032427,6.88496228 0.164694096,6.37503531 C1.25087793,7.04519417 2.56806834,7.37345262 3.83586009,7.23527499 C4.84402926,7.12603314 5.80162745,6.75301216 6.73529899,6.35601124 C7.66891723,5.95901031 8.59725991,5.53270062 9.58411356,5.30355915 C11.033833,4.96784025 12.5846411,5.08507541 13.9704674,5.63128473 C14.6446762,5.89719541 15.3136627,6.27943534 15.8898203,6.74032942 C15.9549528,7.15480772 15.9874457,7.57374233 15.9874457,7.99330695 Z"
                fill="#F25192"
                fillRule="nonzero"
              ></path>
              <path
                d="M6.92228907,10.5886804 C4.52413714,11.0315096 0.408543246,10.5207373 0.398151947,10.4891371 C0.140394443,9.70387463 0.000831303922,8.86489714 0.000831303922,7.99330695 C0.000831303922,7.97028622 0.000937881348,7.94731879 0.00109774748,7.92435136 C0.365166233,7.6356331 0.790410162,7.3782486 1.20558252,7.17820277 C2.23234945,6.67995332 3.39740058,6.47212732 4.53324949,6.58403364 C5.65577621,6.69593995 6.72773198,7.11159189 7.76515666,7.55921707 C8.63909152,7.9363413 9.50748441,8.34373351 10.4146714,8.62520448 C10.503557,8.65280804 9.56215861,10.101142 6.92228907,10.5886804 L6.92228907,10.5886804 Z"
                fill="#D34CA3"
                fillRule="nonzero"
              ></path>
              <path
                d="M15.6990466,10.1285857 C15.5316135,10.4113356 13.9389738,11.3640845 11.7800881,11.5272545 C8.921575,11.743287 5.54472256,10.8792105 6.66490457,10.439472 C8.42849454,9.74671876 9.95798716,8.50242731 11.7800881,7.98286236 C13.1412417,7.59294884 14.6501116,7.65460388 15.9863794,8.12578268 C15.9758179,8.80284149 15.8792671,9.47581436 15.6990466,10.1285324 L15.6990466,10.1285857 Z"
                fill="#9A50A5"
                fillRule="nonzero"
              ></path>
              <path
                d="M14.9255077,11.9771178 C13.5452768,14.3734047 3.53477888,14.9743415 2.07243002,13.3624112 C1.3279867,12.5418716 0.751775847,11.5659421 0.398205237,10.4890838 C1.62752255,9.78647214 3.06653096,9.48805532 4.44974606,9.67723026 C6.23992711,9.92235833 7.84391737,10.9215217 9.61022503,11.3105293 C11.0359113,11.6249327 12.5468062,11.5263486 13.9193635,11.0307636 C14.5398573,10.8049793 15.1551288,10.5024593 15.6990999,10.1284258 C15.5202939,10.7748364 15.2603629,11.3960066 14.9255077,11.9771178 L14.9255077,11.9771178 Z"
                fill="#59569E"
                fillRule="nonzero"
              ></path>
              <path
                d="M14.9370181,11.9570813 C13.5596114,14.3643989 10.9663695,15.9866139 7.99413824,15.9866139 C5.64586453,15.9866139 3.53403284,14.9739685 2.07163069,13.3615586 C2.31430749,13.454281 2.58576019,13.5345338 2.8345119,13.6046084 C4.22572032,13.9882871 5.72329301,13.9776294 7.10650816,13.5699707 C7.99227314,13.308856 8.824856,12.8932041 9.69468764,12.5788007 C11.3544712,11.9802619 13.1813681,11.769505 14.9370181,11.9570813 Z"
                fill="#39477F"
                fillRule="nonzero"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export function RealmInactive(props: HTMLElementProps<'svg'>) {
  return (
    <svg {...props} width="18px" height="18px" viewBox="0 0 18 18">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(1.000000, 1.000000)" fill="currentColor">
          <path d="M2.02926829,10.3414634 C3.9804878,9.95121951 5.50243902,10.497561 7.10243902,11.0829268 C8.62439024,11.6292683 10.1853659,12.1756098 12.1756098,12.0585366 C13.0731707,12.0195122 13.9707317,11.8243902 14.8682927,11.4731707 C13.5804878,14.0878049 10.9268293,15.8439024 7.80487805,15.8439024 C4.44878049,15.804878 1.63902439,13.7365854 0.507317073,10.8097561 C1.01463415,10.5756098 1.52195122,10.4585366 2.02926829,10.3414634 Z M13.3853659,7.45365854 C14.204878,7.45365854 14.9463415,7.57073171 15.6878049,7.72682927 L15.6878049,7.72682927 L15.6878049,8.03902439 C15.6878049,8.70243902 15.5707317,9.40487805 15.4146341,10.0292683 C14.3219512,10.5756098 13.2292683,10.8878049 12.1365854,10.9658537 C10.3414634,11.0829268 8.97560976,10.5756098 7.49268293,10.0682927 C7.29756098,9.9902439 7.06341463,9.91219512 6.82926829,9.83414634 C8.66341463,8.27317073 10.9658537,7.41463415 13.3853659,7.45365854 Z M3.82439024,5.89268293 C5.46341463,5.89268293 7.02439024,6.47804878 8.23414634,7.53170732 C7.25853659,8.03902439 6.4,8.66341463 5.5804878,9.44390244 C4.44878049,9.13170732 3.23902439,8.97560976 1.83414634,9.24878049 C1.28780488,9.36585366 0.741463415,9.52195122 0.195121951,9.75609756 C0.0780487805,9.17073171 2.48689958e-14,8.58536585 2.48689958e-14,7.96097561 C2.48689958e-14,7.64878049 2.48689958e-14,7.37560976 0.0390243902,7.06341463 C1.13170732,6.32195122 2.45853659,5.89268293 3.82439024,5.89268293 Z M7.88292683,0.156097561 C11.7073171,0.156097561 14.9073171,2.92682927 15.5707317,6.55609756 C14.8682927,6.4 14.1658537,6.32195122 13.4243902,6.32195122 C12.0195122,6.32195122 10.6536585,6.59512195 9.36585366,7.06341463 C7.88292683,5.6195122 5.93170732,4.8 3.86341463,4.8 C2.61463415,4.8 1.44390244,5.11219512 0.351219512,5.6195122 C1.36585366,2.45853659 4.37073171,0.156097561 7.88292683,0.156097561 Z"></path>
        </g>
      </g>
    </svg>
  );
}

export function Charts({ active, ...rest }: ProductProps) {
  return (
    <svg {...rest} width="18px" height="18px" viewBox="0 0 18 18">
      <defs>
        <linearGradient
          x1="27.1067278%"
          y1="70.8320287%"
          x2="97.8314985%"
          y2="26.6076705%"
          id="linearGradient-1"
        >
          <stop stopColor="#007DAE" offset="0%"></stop>
          <stop stopColor="#78CFDD" offset="99.15%"></stop>
        </linearGradient>
        <linearGradient
          x1="57.7048969%"
          y1="72.0328462%"
          x2="41.5582474%"
          y2="26.7463253%"
          id="linearGradient-2"
        >
          <stop stopColor="#2AA0C7" offset="16.69%"></stop>
          <stop stopColor="#B5E7CA" offset="73.54%"></stop>
        </linearGradient>
      </defs>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(1.000000, 1.000000)" fillRule="nonzero">
          <path
            d="M10.0190476,12.647619 C9.82857143,12.8380952 9.52380952,12.8380952 9.33333333,12.6857143 L6.74285714,10.7809524 L3.2,14.1714286 C4.4952381,15.1619048 6.13333333,15.7333333 7.88571429,15.7333333 C12.1904762,15.7333333 15.6571429,12.2666667 15.6571429,7.96190476 C15.6571429,7.73333333 15.6571429,7.5047619 15.6190476,7.27619048 L10.0190476,12.647619 Z"
            fill={active ? 'url(#linearGradient-1)' : 'currentColor'}
          ></path>
          <path
            d="M7.00952381,9.63809524 L9.6,11.5428571 L15.352381,6.01904762 C15.047619,4.87619048 14.4761905,3.80952381 13.7142857,2.93333333 L9.56190476,6.8952381 C9.37142857,7.08571429 9.1047619,7.08571429 8.91428571,6.97142857 C8.91428571,6.97142857 8.87619048,6.97142857 8.87619048,6.93333333 C8.8,6.8952381 7.12380952,5.63809524 6.36190476,5.06666667 L0.571428571,10.6285714 C0.952380952,11.6952381 1.56190476,12.647619 2.36190476,13.447619 L6.32380952,9.67619048 C6.51428571,9.48571429 6.81904762,9.48571429 7.00952381,9.63809524 Z"
            fill={active ? 'url(#linearGradient-2)' : 'currentColor'}
          ></path>
          <path
            d="M5.94285714,3.96190476 C6.13333333,3.77142857 6.43809524,3.77142857 6.62857143,3.92380952 L9.18095238,5.79047619 L12.9904762,2.13333333 C11.6190476,0.914285714 9.82857143,0.19047619 7.88571429,0.19047619 C3.58095238,0.19047619 0.114285714,3.65714286 0.114285714,7.96190476 C0.114285714,8.45714286 0.152380952,8.95238095 0.266666667,9.40952381 L5.94285714,3.96190476 Z"
            fill={active ? '#007DAE' : 'currentColor'}
          ></path>
        </g>
      </g>
    </svg>
  );
}

export function ChartsInactive(props: HTMLElementProps<'svg'>) {
  return (
    <svg {...props} width="18px" height="18px" viewBox="0 0 18 18">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(1.000000, 1.000000)" fill="currentColor">
          <path d="M15.6571429,7.12380952 C15.6952381,7.35238095 15.6952381,7.58095238 15.6952381,7.80952381 C15.6952381,12.0380952 12.2666667,15.4666667 8.03809524,15.4666667 C6.32380952,15.4666667 4.72380952,14.8571429 3.42857143,13.9047619 L3.42857143,13.9047619 L6.93333333,10.552381 L9.48571429,12.4571429 C9.67619048,12.6095238 9.98095238,12.6095238 10.1714286,12.4190476 L10.1714286,12.4190476 Z M13.8285714,2.85714286 C14.5904762,3.73333333 15.1238095,4.76190476 15.4285714,5.9047619 L15.4285714,5.9047619 L9.75238095,11.352381 L7.2,9.44761905 C6.97142857,9.2952381 6.7047619,9.2952381 6.51428571,9.52380952 L6.51428571,9.52380952 L2.62857143,13.2571429 C1.82857143,12.4952381 1.21904762,11.5428571 0.838095238,10.4761905 L0.838095238,10.4761905 L6.55238095,4.99047619 C7.31428571,5.52380952 8.99047619,6.78095238 9.06666667,6.81904762 C9.06666667,6.85714286 9.1047619,6.85714286 9.1047619,6.85714286 C9.2952381,6.97142857 9.56190476,6.93333333 9.75238095,6.78095238 L9.75238095,6.78095238 Z M8,0.19047619 C9.94285714,0.19047619 11.7333333,0.914285714 13.0666667,2.0952381 L13.0666667,2.0952381 L9.33333333,5.67619048 L6.81904762,3.80952381 C6.62857143,3.65714286 6.32380952,3.65714286 6.13333333,3.84761905 L6.13333333,3.84761905 L0.495238095,9.2952381 C0.380952381,8.8 0.342857143,8.34285714 0.342857143,7.84761905 C0.342857143,3.61904762 3.77142857,0.19047619 8,0.19047619 Z"></path>
        </g>
      </g>
    </svg>
  );
}

export function Cloud(props: HTMLElementProps<'svg'>) {
  return (
    <svg {...props} width="25px" height="19px" viewBox="0 0 25 19">
      <g
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g transform="translate(0.000000, 1.000000)" stroke="currentColor">
          <path d="M18.4,5.2 C18.5,5.6 18.5,6 18.5,6.4 C18.5,6.7 18.5,6.9 18.5,7.2 C18.5,6.9 18.5,6.7 18.5,6.4"></path>
          <path d="M20.1,12.6 C20.7,12.6 21.3,12.5 21.8,12.2 C23.7,11.3 24.6,8.9 23.6,7 C22.7,5.1 20.3,4.2 18.4,5.2 C17.9,2.8 16.2,0.9 13.8,0.3 C10.5,-0.6 7,1.4 6.2,4.8"></path>
          <path d="M4.5,12.6 C3.9,12.6 3.3,12.5 2.8,12.2 C0.9,11.3 0,8.9 1,7 C1.9,5.1 4.3,4.2 6.2,5.2 C6.7,2.8 8.4,0.9 10.8,0.3 C14.1,-0.6 17.6,1.4 18.4,4.8"></path>
          <path d="M12.4,5.3 C12.4,5.3 19.5,12.9 12.4,15.9 C5.3,12.9 12.4,5.3 12.4,5.3 Z"></path>
          <line x1="12.4" y1="15.9" x2="12.4" y2="17.3"></line>
        </g>
      </g>
    </svg>
  );
}

export function Support(props: HTMLElementProps<'svg'>) {
  return (
    <svg {...props} width="24px" height="24px" viewBox="0 0 24 24">
      <g
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g stroke="currentColor">
          <path d="M2.4,9.7 C2.3,6.3 4,3.2 6.8,1.5 C9.7,-0.2 13.3,-0.2 16.1,1.5 C19,3.2 20.7,6.4 20.5,9.7"></path>
          <path d="M19.4,18.1 C18,20.1 15.8,21.4 13.4,21.8"></path>
          <path d="M5.2,15.6 C5.3,16.2 5.1,16.8 4.8,17.3 C4.3,18 3.3,18.4 2.4,18.2 C1.5,18 0.8,17.2 0.7,16.3 L0.1,12.3 C1.38777878e-17,11.7 0.2,11.1 0.5,10.6 C1,9.9 2,9.5 2.9,9.7 C3.8,9.9 4.5,10.7 4.6,11.6 L5.2,15.6 Z"></path>
          <path d="M18,15.6 C17.9,16.2 18.1,16.8 18.4,17.3 C18.9,18 19.9,18.4 20.8,18.2 C21.7,18 22.4,17.2 22.5,16.3 L23.1,12.3 C23.2,11.7 23,11.1 22.7,10.6 C22.2,9.9 21.2,9.5 20.3,9.7 C19.4,9.9 18.7,10.7 18.6,11.6 L18,15.6 Z"></path>
          <path d="M11.6,23.2 C12.6,23.2 13.5,22.3 13.5,21.3 C13.5,20.2 12.6,19.4 11.6,19.4 C10.6,19.4 9.7,20.3 9.7,21.3 C9.7,22.4 10.5,23.2 11.6,23.2 Z"></path>
        </g>
      </g>
    </svg>
  );
}

export function University(props: HTMLElementProps<'svg'>) {
  return (
    <svg {...props} width="19px" height="25px" viewBox="0 0 19 25">
      <g
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g stroke="currentColor">
          <path d="M0.6,2.9 L0.6,21.8 C0.6,22.9 1.6,23.8 2.7,23.8 L17.3,23.8 C17.9,23.8 18.3,23.4 18.3,22.8 L18.3,6.8 C18.3,5.9 17.6,5.3 16.8,5.3 L16,5.3"></path>
          <path d="M16.8,5.2 L2.9,5.2 C2.3,5.2 1.7,5 1.3,4.5 C0.9,4.1 0.6,3.5 0.6,2.9 L0.6,2.9 C0.6,1.6 1.6,0.6 2.9,0.6 L15.3,0.6 C16.2,0.6 16.8,1.3 16.8,2.1 L16.8,5.2"></path>
          <polyline points="4.4 12.1 6.7 14.4 4.4 16.7"></polyline>
          <line x1="9.7" y1="14.5" x2="13.7" y2="14.5"></line>
        </g>
      </g>
    </svg>
  );
}

export function Megaphone(props: HTMLElementProps<'svg'>) {
  return (
    <svg {...props} width="21px" height="18px" viewBox="0 0 21 18">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g stroke="currentColor">
          <g>
            <path d="M16.6937164,1.45178813 C16.5671727,1.43279473 16.4333832,1.46207613 16.3223422,1.54413425 L15.887998,1.8651098 C15.5171808,2.25362448 15.0603669,2.6542574 14.1802936,3.31884422 C13.5458126,3.80443448 12.9603084,4.25210376 11.7400663,4.90812987 C11.3948275,5.09373704 10.6686803,5.43453778 9.0099575,5.5 L2,5.5 C1.58578644,5.5 1.21078644,5.66789322 0.939339828,5.93933983 C0.667893219,6.21078644 0.5,6.58578644 0.5,7 L0.5,10.8 C0.5,11.2142136 0.667893219,11.5892136 0.939339828,11.8606602 C1.21078644,12.1321068 1.58578644,12.3 2,12.3 L3.35230175,12.3003809 C3.26657468,13.5407726 3.25652909,14.4271291 3.33387468,14.9585055 C3.42552866,15.5881828 3.74347056,16.4368924 4.0954574,16.6607499 C4.17310703,16.7101337 4.29531111,16.7134233 4.44604432,16.7134233 L6.99587203,16.712755 C7.07146945,16.7074926 7.06949316,16.5426228 7.05811042,16.3856783 C6.79296702,16.0452639 6.4428408,15.54439 6.23769756,14.7664351 C6.16017432,14.4725929 6.03732876,13.9968592 6.06252502,13.3658381 C6.07100023,13.1535829 6.12606622,12.7983839 6.23834715,12.3012016 L8.14247057,12.2991854 L9.01644939,12.3126604 C9.57792718,12.3011553 9.9870633,12.3309703 10.5900116,12.4820386 C11.0971489,12.594523 11.8627587,12.7703497 12.5539102,13.1570991 C13.4041178,13.6328521 14.3017275,14.2706168 15.1356738,14.9951972 C15.5890988,15.3892577 15.991443,15.7411346 16.723155,16.1358322 C16.8197167,16.1155071 16.905894,16.0673638 16.9730543,16.0002035 C17.0635365,15.9097213 17.1195009,15.7847213 17.1195009,15.6466501 L17.1195009,1.94624951 C17.1195009,1.83927589 17.0851924,1.73512224 16.6937164,1.45178813 Z"></path>
            <line x1="9" y1="5.78529888" x2="9" y2="12.2025237"></line>
            <line
              x1="18.5"
              y1="6.70513577"
              x2="19.5"
              y2="5.5"
              strokeLinecap="round"
            ></line>
            <line
              x1="18.5"
              y1="9.20513577"
              x2="20.5"
              y2="9.20513577"
              strokeLinecap="round"
            ></line>
            <line
              x1="18.5"
              y1="11.7051358"
              x2="19.5"
              y2="12.5"
              strokeLinecap="round"
            ></line>
          </g>
        </g>
      </g>
    </svg>
  );
}
