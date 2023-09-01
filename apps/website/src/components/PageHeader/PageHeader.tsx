import { Theme } from 'types';

import { useTheme } from '@/hooks/theme';

import classes from './PageHeader.module.scss';

const UNDERLINES: {
  [key in Theme]: React.ReactNode;
} = {
  default: (
    <>
      <stop stopColor='#18A9FF' />
      <stop offset='1' stopColor='#9229FF' />
    </>
  ),
  stake: (
    <>
      <stop stopColor='#18A9FF' />
      <stop offset='1' stopColor='#9229FF' />
    </>
  ),
  gamdom: (
    <>
      <stop stop-color='#00FF86' />
      <stop offset='1' stop-color='#009E53' />
    </>
  ),
  clash: (
    <>
      <stop stop-color='#FFC701' />
      <stop offset='1' stop-color='#E78A00' />
    </>
  ),
  csgobig: (
    <>
      <stop stop-color='#E1B56F' />
      <stop offset='1' stop-color='#94713B' />
    </>
  )
};

function PageHeader({ title }: { title: string }) {
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <span className={classes.text}>{title}</span>
        <svg
          viewBox='0 0 143 12'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className={classes.svg}
          preserveAspectRatio='none'
        >
          <path
            d='M27.4288 4.3395L3.9928 4.36799C2.81795 4.36942 1.68532 4.80625 0.813765 5.59408C-0.0850934 6.20357 -0.136461 7.50783 0.787986 8.07776C1.61327 8.58656 2.49067 9.01427 3.07696 9.01356C3.25497 9.01334 3.53283 9.02179 3.88295 9.03676C8.75423 9.24516 13.6263 8.97259 18.4619 8.34789C18.8871 8.29296 19.198 8.26062 19.3411 8.26045C24.7209 8.25391 30.0464 9.27865 35.3599 10.1208C35.6635 10.169 35.9037 10.1959 36.0603 10.1957C37.4158 10.194 40.5796 11.168 41.4832 11.1669L53.2302 11.1526L60.4591 11.1438L77.6266 10.1451L85.5476 9.62121C87.7872 9.47307 89.9984 9.03786 92.1271 8.32626C93.8986 7.73404 95.7284 7.33291 97.5852 7.12971L97.7894 7.10735C100.297 6.83291 102.83 6.89713 105.321 7.29828L107.229 7.60559C109.477 7.96761 111.75 8.1481 114.027 8.14534L119.642 8.13851L127.989 9.20345C128.746 9.29998 129.513 9.27366 130.261 9.12551L139.461 7.30399C142.743 6.65403 143.448 2.2724 140.535 0.625883C139.87 0.250134 139.106 0.095014 138.347 0.181731C133.064 0.785562 123.905 1.77777 121.894 1.78021L103.369 1.80273L94.6461 1.81334C90.8416 1.81796 87.0562 2.35111 83.3984 3.3975C81.3561 3.98174 79.2715 4.40669 77.1635 4.6685L70.392 5.50949L54.4987 6.40631C50.3471 6.64058 46.1824 6.44973 42.0697 5.83674L36.4953 5.00591C33.4939 4.55857 30.4633 4.33581 27.4288 4.3395Z'
            fill='url(#paint0_linear_138_3)'
          />
          <defs>
            <linearGradient
              id='paint0_linear_138_3'
              x1='-1.00079'
              y1='6.27375'
              x2='178.694'
              y2='6.05529'
              gradientUnits='userSpaceOnUse'
            >
              {UNDERLINES[theme.theme]}
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default PageHeader;
