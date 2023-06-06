import classes from './PageHeaderGlow.module.scss';

function PageHeaderGlow() {
  return (
    <div className={classes.root}>
      <svg viewBox='0 0 1658 1485' fill='none' xmlns='http://www.w3.org/2000/svg'>
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
            color-interpolation-filters='sRGB'
          >
            <feFlood flood-opacity='0' result='BackgroundImageFix' />
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
            color-interpolation-filters='sRGB'
          >
            <feFlood flood-opacity='0' result='BackgroundImageFix' />
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
            color-interpolation-filters='sRGB'
          >
            <feFlood flood-opacity='0' result='BackgroundImageFix' />
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
            color-interpolation-filters='sRGB'
          >
            <feFlood flood-opacity='0' result='BackgroundImageFix' />
            <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
            <feGaussianBlur stdDeviation='216' result='effect1_foregroundBlur_145_3' />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default PageHeaderGlow;
