import { Theme } from 'types';

import { useTheme } from '@/hooks/theme';

import classes from './PageHeaderGlow.module.scss';

const GLOWS: {
  [key in Theme]: React.ReactNode;
} = {
  default: (
    <svg
      className={classes.glow}
      viewBox='0 0 1658 1485'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_f_145_3)'>
        <circle cx='589.881' cy='703.03' r='157.881' fill='#18A8FF' />
      </g>
      <g filter='url(#filter1_f_145_3)'>
        <circle cx='835.913' cy='895.119' r='157.881' fill='#7219FF' />
      </g>
      <g filter='url(#filter2_f_145_3)'>
        <circle
          cx='1067.47'
          cy='781.97'
          r='157.881'
          transform='rotate(180 1067.47 781.97)'
          fill='#18A8FF'
        />
      </g>
      <g filter='url(#filter3_f_145_3)'>
        <circle
          cx='821.441'
          cy='589.881'
          r='157.881'
          transform='rotate(180 821.441 589.881)'
          fill='#7219FF'
        />
      </g>
      <defs>
        <filter
          id='filter0_f_145_3'
          x='0'
          y='113.148'
          width='1179.76'
          height='1179.76'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='216' result='effect1_foregroundBlur_145_3' />
        </filter>
        <filter
          id='filter1_f_145_3'
          x='246.031'
          y='305.237'
          width='1179.76'
          height='1179.76'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='216' result='effect1_foregroundBlur_145_3' />
        </filter>
        <filter
          id='filter2_f_145_3'
          x='477.591'
          y='192.089'
          width='1179.76'
          height='1179.76'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='216' result='effect1_foregroundBlur_145_3' />
        </filter>
        <filter
          id='filter3_f_145_3'
          x='231.56'
          y='0'
          width='1179.76'
          height='1179.76'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='216' result='effect1_foregroundBlur_145_3' />
        </filter>
      </defs>
    </svg>
  ),
  hypedrop: (
    <svg
      className={classes.glow}
      viewBox='0 0 1658 1485'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_f_145_3)'>
        <circle cx='589.881' cy='703.03' r='157.881' fill='#18A8FF' />
      </g>
      <g filter='url(#filter1_f_145_3)'>
        <circle cx='835.913' cy='895.119' r='157.881' fill='#7219FF' />
      </g>
      <g filter='url(#filter2_f_145_3)'>
        <circle
          cx='1067.47'
          cy='781.97'
          r='157.881'
          transform='rotate(180 1067.47 781.97)'
          fill='#18A8FF'
        />
      </g>
      <g filter='url(#filter3_f_145_3)'>
        <circle
          cx='821.441'
          cy='589.881'
          r='157.881'
          transform='rotate(180 821.441 589.881)'
          fill='#7219FF'
        />
      </g>
      <defs>
        <filter
          id='filter0_f_145_3'
          x='0'
          y='113.148'
          width='1179.76'
          height='1179.76'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='216' result='effect1_foregroundBlur_145_3' />
        </filter>
        <filter
          id='filter1_f_145_3'
          x='246.031'
          y='305.237'
          width='1179.76'
          height='1179.76'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='216' result='effect1_foregroundBlur_145_3' />
        </filter>
        <filter
          id='filter2_f_145_3'
          x='477.591'
          y='192.089'
          width='1179.76'
          height='1179.76'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='216' result='effect1_foregroundBlur_145_3' />
        </filter>
        <filter
          id='filter3_f_145_3'
          x='231.56'
          y='0'
          width='1179.76'
          height='1179.76'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='216' result='effect1_foregroundBlur_145_3' />
        </filter>
      </defs>
    </svg>
  ),
  gamdom: (
    <svg
      width='1658'
      height='844'
      viewBox='0 0 1658 844'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_f_1420_560)'>
        <circle cx='589.881' cy='248.03' r='157.881' fill='#00F983' />
      </g>
      <g filter='url(#filter1_f_1420_560)'>
        <circle cx='835.913' cy='440.119' r='157.881' fill='#006234' />
      </g>
      <g filter='url(#filter2_f_1420_560)'>
        <circle
          cx='1067.47'
          cy='326.97'
          r='157.881'
          transform='rotate(180 1067.47 326.97)'
          fill='#00F983'
        />
      </g>
      <g filter='url(#filter3_f_1420_560)'>
        <circle
          cx='821.441'
          cy='134.881'
          r='157.881'
          transform='rotate(180 821.441 134.881)'
          fill='#006234'
        />
      </g>
      <defs>
        <filter
          id='filter0_f_1420_560'
          x='0'
          y='-341.852'
          width='1179.76'
          height='1179.76'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='216' result='effect1_foregroundBlur_1420_560' />
        </filter>
        <filter
          id='filter1_f_1420_560'
          x='246.031'
          y='-149.763'
          width='1179.76'
          height='1179.76'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='216' result='effect1_foregroundBlur_1420_560' />
        </filter>
        <filter
          id='filter2_f_1420_560'
          x='477.591'
          y='-262.911'
          width='1179.76'
          height='1179.76'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='216' result='effect1_foregroundBlur_1420_560' />
        </filter>
        <filter
          id='filter3_f_1420_560'
          x='231.56'
          y='-455'
          width='1179.76'
          height='1179.76'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='216' result='effect1_foregroundBlur_1420_560' />
        </filter>
      </defs>
    </svg>
  ),
  roobet: (
    <svg
      width='1658'
      height='844'
      viewBox='0 0 1658 844'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_f_1988_6)'>
        <circle cx='589.881' cy='248.03' r='157.881' fill='#DCB33F' />
      </g>
      <g filter='url(#filter1_f_1988_6)'>
        <circle cx='835.913' cy='440.119' r='157.881' fill='#A08027' />
      </g>
      <g filter='url(#filter2_f_1988_6)'>
        <circle
          cx='1067.47'
          cy='326.97'
          r='157.881'
          transform='rotate(180 1067.47 326.97)'
          fill='#DCB33F'
        />
      </g>
      <g filter='url(#filter3_f_1988_6)'>
        <circle
          cx='821.441'
          cy='134.881'
          r='157.881'
          transform='rotate(180 821.441 134.881)'
          fill='#A08027'
        />
      </g>
      <defs>
        <filter
          id='filter0_f_1988_6'
          x='0'
          y='-341.852'
          width='1179.76'
          height='1179.76'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='216' result='effect1_foregroundBlur_1988_6' />
        </filter>
        <filter
          id='filter1_f_1988_6'
          x='246.031'
          y='-149.763'
          width='1179.76'
          height='1179.76'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='216' result='effect1_foregroundBlur_1988_6' />
        </filter>
        <filter
          id='filter2_f_1988_6'
          x='477.591'
          y='-262.911'
          width='1179.76'
          height='1179.76'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='216' result='effect1_foregroundBlur_1988_6' />
        </filter>
        <filter
          id='filter3_f_1988_6'
          x='231.56'
          y='-455'
          width='1179.76'
          height='1179.76'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='216' result='effect1_foregroundBlur_1988_6' />
        </filter>
      </defs>
    </svg>
  ),
  csgobig: (
    <svg
      width='1658'
      height='844'
      viewBox='0 0 1658 844'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_f_1469_498)'>
        <circle cx='589.881' cy='248.03' r='157.881' fill='url(#paint0_linear_1469_498)' />
      </g>
      <g filter='url(#filter1_f_1469_498)'>
        <circle cx='835.913' cy='440.119' r='157.881' fill='#9D7F4E' />
      </g>
      <g filter='url(#filter2_f_1469_498)'>
        <circle
          cx='1067.47'
          cy='326.97'
          r='157.881'
          transform='rotate(180 1067.47 326.97)'
          fill='url(#paint1_linear_1469_498)'
        />
      </g>
      <g filter='url(#filter3_f_1469_498)'>
        <circle
          cx='821.441'
          cy='134.881'
          r='157.881'
          transform='rotate(180 821.441 134.881)'
          fill='#9D7F4E'
        />
      </g>
      <defs>
        <filter
          id='filter0_f_1469_498'
          x='0'
          y='-341.852'
          width='1179.76'
          height='1179.76'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='216' result='effect1_foregroundBlur_1469_498' />
        </filter>
        <filter
          id='filter1_f_1469_498'
          x='246.031'
          y='-149.763'
          width='1179.76'
          height='1179.76'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='216' result='effect1_foregroundBlur_1469_498' />
        </filter>
        <filter
          id='filter2_f_1469_498'
          x='477.591'
          y='-262.911'
          width='1179.76'
          height='1179.76'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='216' result='effect1_foregroundBlur_1469_498' />
        </filter>
        <filter
          id='filter3_f_1469_498'
          x='231.56'
          y='-455'
          width='1179.76'
          height='1179.76'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='216' result='effect1_foregroundBlur_1469_498' />
        </filter>
        <linearGradient
          id='paint0_linear_1469_498'
          x1='432'
          y1='238.742'
          x2='747.763'
          y2='238.742'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#E1B56F' />
          <stop offset='1' stopColor='#94713B' />
        </linearGradient>
        <linearGradient
          id='paint1_linear_1469_498'
          x1='909.591'
          y1='317.683'
          x2='1225.35'
          y2='317.683'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#E1B56F' />
          <stop offset='1' stopColor='#94713B' />
        </linearGradient>
      </defs>
    </svg>
  ),
  packdraw: (
    <svg
      className={classes.glow}
      viewBox='0 0 1658 1485'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_f_145_3)'>
        <circle cx='589.881' cy='703.03' r='157.881' fill='#18A8FF' />
      </g>
      <g filter='url(#filter1_f_145_3)'>
        <circle cx='835.913' cy='895.119' r='157.881' fill='#7219FF' />
      </g>
      <g filter='url(#filter2_f_145_3)'>
        <circle
          cx='1067.47'
          cy='781.97'
          r='157.881'
          transform='rotate(180 1067.47 781.97)'
          fill='#18A8FF'
        />
      </g>
      <g filter='url(#filter3_f_145_3)'>
        <circle
          cx='821.441'
          cy='589.881'
          r='157.881'
          transform='rotate(180 821.441 589.881)'
          fill='#7219FF'
        />
      </g>
      <defs>
        <filter
          id='filter0_f_145_3'
          x='0'
          y='113.148'
          width='1179.76'
          height='1179.76'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='216' result='effect1_foregroundBlur_145_3' />
        </filter>
        <filter
          id='filter1_f_145_3'
          x='246.031'
          y='305.237'
          width='1179.76'
          height='1179.76'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='216' result='effect1_foregroundBlur_145_3' />
        </filter>
        <filter
          id='filter2_f_145_3'
          x='477.591'
          y='192.089'
          width='1179.76'
          height='1179.76'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='216' result='effect1_foregroundBlur_145_3' />
        </filter>
        <filter
          id='filter3_f_145_3'
          x='231.56'
          y='0'
          width='1179.76'
          height='1179.76'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='216' result='effect1_foregroundBlur_145_3' />
        </filter>
      </defs>
    </svg>
  )
};

function PageHeaderGlow() {
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <svg
        className={classes.grid}
        width='1915'
        height='843'
        viewBox='0 0 1915 843'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <mask
          id='mask0_64_27'
          style={{
            maskType: 'alpha'
          }}
          maskUnits='userSpaceOnUse'
          x='-5'
          y='0'
          width='1920'
          height='843'
        >
          <rect
            x='-5'
            width='1920'
            height='843'
            fill='url(#paint0_radial_64_27)'
            fillOpacity='0.33'
          />
        </mask>
        <g mask='url(#mask0_64_27)'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M1545.23 821H363.767C363.361 821 363 820.639 363 820.188V32.8122C363 32.361 363.361 32 363.767 32H1545.23C1545.64 32 1546 32.361 1546 32.8122V820.188C1546 820.639 1545.64 821 1545.23 821ZM364.58 819.421H1544.42V33.5793H364.58V819.421Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1545.23 783.504H363.767C363.361 783.504 363 783.143 363 782.692C363 782.24 363.361 781.924 363.767 781.924H1545.23C1545.64 781.924 1546 782.24 1546 782.692C1546 783.143 1545.64 783.504 1545.23 783.504Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1545.23 746.007H363.767C363.361 746.007 363 745.647 363 745.195C363 744.789 363.361 744.428 363.767 744.428H1545.23C1545.64 744.428 1546 744.789 1546 745.195C1546 745.647 1545.64 746.007 1545.23 746.007Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1545.23 708.511H363.767C363.361 708.511 363 708.15 363 707.699C363 707.293 363.361 706.932 363.767 706.932H1545.23C1545.64 706.932 1546 707.293 1546 707.699C1546 708.15 1545.64 708.511 1545.23 708.511Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1545.23 671.015H363.767C363.361 671.015 363 670.654 363 670.203C363 669.797 363.361 669.436 363.767 669.436H1545.23C1545.64 669.436 1546 669.797 1546 670.203C1546 670.654 1545.64 671.015 1545.23 671.015Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1545.23 633.519H363.767C363.361 633.519 363 633.158 363 632.707C363 632.301 363.361 631.94 363.767 631.94H1545.23C1545.64 631.94 1546 632.301 1546 632.707C1546 633.158 1545.64 633.519 1545.23 633.519Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1545.23 596.023H363.767C363.361 596.023 363 595.662 363 595.21C363 594.804 363.361 594.443 363.767 594.443H1545.23C1545.64 594.443 1546 594.804 1546 595.21C1546 595.662 1545.64 596.023 1545.23 596.023Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1545.23 558.526H363.767C363.361 558.526 363 558.165 363 557.714C363 557.308 363.361 556.947 363.767 556.947H1545.23C1545.64 556.947 1546 557.308 1546 557.714C1546 558.165 1545.64 558.526 1545.23 558.526Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1545.23 521.03H363.767C363.361 521.03 363 520.669 363 520.218C363 519.812 363.361 519.451 363.767 519.451H1545.23C1545.64 519.451 1546 519.812 1546 520.218C1546 520.669 1545.64 521.03 1545.23 521.03Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1545.23 483.534H363.767C363.361 483.534 363 483.173 363 482.722C363 482.316 363.361 481.955 363.767 481.955H1545.23C1545.64 481.955 1546 482.316 1546 482.722C1546 483.173 1545.64 483.534 1545.23 483.534Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1545.23 446.038H363.767C363.361 446.038 363 445.677 363 445.226C363 444.819 363.361 444.458 363.767 444.458H1545.23C1545.64 444.458 1546 444.819 1546 445.271C1546 445.677 1545.64 446.038 1545.23 446.038Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1545.23 408.542H363.767C363.361 408.542 363 408.181 363 407.774C363 407.323 363.361 406.962 363.767 406.962H1545.23C1545.64 406.962 1546 407.323 1546 407.774C1546 408.181 1545.64 408.542 1545.23 408.542Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1545.23 371.045H363.767C363.361 371.045 363 370.684 363 370.278C363 369.827 363.361 369.466 363.767 369.466H1545.23C1545.64 369.466 1546 369.827 1546 370.278C1546 370.684 1545.64 371.045 1545.23 371.045Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1545.23 333.549H363.767C363.361 333.549 363 333.188 363 332.782C363 332.331 363.361 331.97 363.767 331.97H1545.23C1545.64 331.97 1546 332.331 1546 332.782C1546 333.188 1545.64 333.549 1545.23 333.549Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1545.23 296.053H363.767C363.361 296.053 363 295.692 363 295.286C363 294.835 363.361 294.474 363.767 294.474H1545.23C1545.64 294.474 1546 294.835 1546 295.286C1546 295.692 1545.64 296.053 1545.23 296.053Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1545.23 258.557H363.767C363.361 258.557 363 258.196 363 257.79C363 257.338 363.361 256.977 363.767 256.977H1545.23C1545.64 256.977 1546 257.338 1546 257.79C1546 258.196 1545.64 258.557 1545.23 258.557Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1545.23 221.06H363.767C363.361 221.06 363 220.699 363 220.293C363 219.842 363.361 219.481 363.767 219.481H1545.23C1545.64 219.481 1546 219.842 1546 220.293C1546 220.699 1545.64 221.06 1545.23 221.06Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1545.23 183.564H363.767C363.361 183.564 363 183.203 363 182.797C363 182.346 363.361 181.985 363.767 181.985H1545.23C1545.64 181.985 1546 182.346 1546 182.797C1546 183.203 1545.64 183.564 1545.23 183.564Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1545.23 146.068H363.767C363.361 146.068 363 145.707 363 145.301C363 144.85 363.361 144.489 363.767 144.489H1545.23C1545.64 144.489 1546 144.85 1546 145.301C1546 145.707 1545.64 146.068 1545.23 146.068Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1545.23 108.572H363.767C363.361 108.572 363 108.211 363 107.805C363 107.353 363.361 106.992 363.767 106.992H1545.23C1545.64 106.992 1546 107.353 1546 107.805C1546 108.211 1545.64 108.572 1545.23 108.572Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1545.23 71.0755H363.767C363.361 71.0755 363 70.7145 363 70.3084C363 69.8572 363.361 69.4962 363.767 69.4962H1545.23C1545.64 69.4962 1546 69.8572 1546 70.3084C1546 70.7145 1545.64 71.0755 1545.23 71.0755Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1507.09 821C1506.69 821 1506.33 820.639 1506.33 820.188V32.8122C1506.33 32.361 1506.69 32 1507.09 32C1507.54 32 1507.91 32.361 1507.91 32.8122V820.188C1507.91 820.639 1507.54 821 1507.09 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1469 821C1468.55 821 1468.19 820.639 1468.19 820.188V32.8122C1468.19 32.361 1468.55 32 1469 32C1469.45 32 1469.77 32.361 1469.77 32.8122V820.188C1469.77 820.639 1469.45 821 1469 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1430.9 821C1430.45 821 1430.09 820.639 1430.09 820.188V32.8122C1430.09 32.361 1430.45 32 1430.9 32C1431.31 32 1431.67 32.361 1431.67 32.8122V820.188C1431.67 820.639 1431.31 821 1430.9 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1392.77 821C1392.36 821 1392 820.639 1392 820.188V32.8122C1392 32.361 1392.36 32 1392.77 32C1393.22 32 1393.58 32.361 1393.58 32.8122V820.188C1393.58 820.639 1393.22 821 1392.77 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1354.67 821C1354.22 821 1353.86 820.639 1353.86 820.188V32.8122C1353.86 32.361 1354.22 32 1354.67 32C1355.08 32 1355.44 32.361 1355.44 32.8122V820.188C1355.44 820.639 1355.08 821 1354.67 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1316.53 821C1316.13 821 1315.76 820.639 1315.76 820.188V32.8122C1315.76 32.361 1316.13 32 1316.53 32C1316.98 32 1317.34 32.361 1317.34 32.8122V820.188C1317.34 820.639 1316.98 821 1316.53 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1278.44 821C1277.99 821 1277.67 820.639 1277.67 820.188V32.8122C1277.67 32.361 1277.99 32 1278.44 32C1278.89 32 1279.25 32.361 1279.25 32.8122V820.188C1279.25 820.639 1278.89 821 1278.44 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1240.34 821C1239.89 821 1239.53 820.639 1239.53 820.188V32.8122C1239.53 32.361 1239.89 32 1240.34 32C1240.75 32 1241.11 32.361 1241.11 32.8122V820.188C1241.11 820.639 1240.75 821 1240.34 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1202.2 821C1201.8 821 1201.44 820.639 1201.44 820.188V32.8122C1201.44 32.361 1201.8 32 1202.2 32C1202.65 32 1203.02 32.361 1203.02 32.8122V820.188C1203.02 820.639 1202.65 821 1202.2 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1164.11 821C1163.66 821 1163.34 820.639 1163.34 820.188V32.8122C1163.34 32.361 1163.66 32 1164.11 32C1164.56 32 1164.88 32.361 1164.88 32.8122V820.188C1164.88 820.639 1164.56 821 1164.11 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1126.01 821C1125.56 821 1125.2 820.639 1125.2 820.188V32.8122C1125.2 32.361 1125.56 32 1126.01 32C1126.42 32 1126.78 32.361 1126.78 32.8122V820.188C1126.78 820.639 1126.42 821 1126.01 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1087.88 821C1087.47 821 1087.11 820.639 1087.11 820.188V32.8122C1087.11 32.361 1087.47 32 1087.88 32C1088.33 32 1088.69 32.361 1088.69 32.8122V820.188C1088.69 820.639 1088.33 821 1087.88 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1049.78 821C1049.33 821 1048.97 820.639 1048.97 820.188V32.8122C1048.97 32.361 1049.33 32 1049.78 32C1050.23 32 1050.55 32.361 1050.55 32.8122V820.188C1050.55 820.639 1050.23 821 1049.78 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M1011.69 821C1011.24 821 1010.87 820.639 1010.87 820.188V32.8122C1010.87 32.361 1011.24 32 1011.69 32C1012.09 32 1012.45 32.361 1012.45 32.8122V820.188C1012.45 820.639 1012.09 821 1011.69 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M973.547 821C973.141 821 972.78 820.639 972.78 820.188V32.8122C972.78 32.361 973.141 32 973.547 32C973.998 32 974.36 32.361 974.36 32.8122V820.188C974.36 820.639 973.998 821 973.547 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M935.453 821C935.002 821 934.64 820.639 934.64 820.188V32.8122C934.64 32.361 935.002 32 935.453 32C935.859 32 936.22 32.361 936.22 32.8122V820.188C936.22 820.639 935.859 821 935.453 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M897.313 821C896.907 821 896.546 820.639 896.546 820.188V32.8122C896.546 32.361 896.907 32 897.313 32C897.765 32 898.126 32.361 898.126 32.8122V820.188C898.126 820.639 897.765 821 897.313 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M859.219 821C858.768 821 858.452 820.639 858.452 820.188V32.8122C858.452 32.361 858.768 32 859.219 32C859.67 32 860.031 32.361 860.031 32.8122V820.188C860.031 820.639 859.67 821 859.219 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M821.125 821C820.673 821 820.312 820.639 820.312 820.188V32.8122C820.312 32.361 820.673 32 821.125 32C821.531 32 821.892 32.361 821.892 32.8122V820.188C821.892 820.639 821.531 821 821.125 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M782.985 821C782.579 821 782.218 820.639 782.218 820.188V32.8122C782.218 32.361 782.579 32 782.985 32C783.437 32 783.798 32.361 783.798 32.8122V820.188C783.798 820.639 783.437 821 782.985 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M744.891 821C744.44 821 744.124 820.639 744.124 820.188V32.8122C744.124 32.361 744.44 32 744.891 32C745.342 32 745.658 32.361 745.658 32.8122V820.188C745.658 820.639 745.342 821 744.891 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M706.797 821C706.345 821 705.984 820.639 705.984 820.188V32.8122C705.984 32.361 706.345 32 706.797 32C707.203 32 707.564 32.361 707.564 32.8122V820.188C707.564 820.639 707.203 821 706.797 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M668.657 821C668.251 821 667.89 820.639 667.89 820.188V32.8122C667.89 32.361 668.251 32 668.657 32C669.109 32 669.47 32.361 669.47 32.8122V820.188C669.47 820.639 669.109 821 668.657 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M630.563 821C630.112 821 629.75 820.639 629.75 820.188V32.8122C629.75 32.361 630.112 32 630.563 32C631.014 32 631.33 32.361 631.33 32.8122V820.188C631.33 820.639 631.014 821 630.563 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M592.469 821C592.017 821 591.656 820.639 591.656 820.188V32.8122C591.656 32.361 592.017 32 592.469 32C592.875 32 593.236 32.361 593.236 32.8122V820.188C593.236 820.639 592.875 821 592.469 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M554.329 821C553.923 821 553.562 820.639 553.562 820.188V32.8122C553.562 32.361 553.923 32 554.329 32C554.781 32 555.142 32.361 555.142 32.8122V820.188C555.142 820.639 554.781 821 554.329 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M516.235 821C515.783 821 515.422 820.639 515.422 820.188V32.8122C515.422 32.361 515.783 32 516.235 32C516.641 32 517.002 32.361 517.002 32.8122V820.188C517.002 820.639 516.641 821 516.235 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M478.095 821C477.689 821 477.328 820.639 477.328 820.188V32.8122C477.328 32.361 477.689 32 478.095 32C478.547 32 478.908 32.361 478.908 32.8122V820.188C478.908 820.639 478.547 821 478.095 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M440.001 821C439.55 821 439.234 820.639 439.234 820.188V32.8122C439.234 32.361 439.55 32 440.001 32C440.452 32 440.814 32.361 440.814 32.8122V820.188C440.814 820.639 440.452 821 440.001 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
          <path
            d='M401.907 821C401.455 821 401.094 820.639 401.094 820.188V32.8122C401.094 32.361 401.455 32 401.907 32C402.313 32 402.674 32.361 402.674 32.8122V820.188C402.674 820.639 402.313 821 401.907 821Z'
            fill='#9391C9'
            fillOpacity='0.33'
          />
        </g>
        <defs>
          <radialGradient
            id='paint0_radial_64_27'
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(955 292) rotate(90) scale(230 523.843)'
          >
            <stop stopColor='#C4C4C4' />
            <stop offset='1' stopColor='#C4C4C4' stopOpacity='0' />
          </radialGradient>
        </defs>
      </svg>
      {GLOWS[theme.theme]}
    </div>
  );
}

export default PageHeaderGlow;
