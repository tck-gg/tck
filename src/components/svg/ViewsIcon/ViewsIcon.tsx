import classes from './ViewsIcon.module.scss';

function ViewsIcon() {
  return (
    <div className={classes.root}>
      <svg
        width='7'
        height='8'
        viewBox='0 0 7 8'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={classes.arrow}
      >
        <path
          d='M6.20006 2.96077C7.00006 3.42265 7.00006 4.57735 6.20006 5.03923L2.30006 7.2909C1.50006 7.75278 0.500061 7.17543 0.500061 6.25167L0.500061 1.74833C0.500061 0.824574 1.50006 0.247223 2.30006 0.709103L6.20006 2.96077Z'
          fill='#546BFF'
        />
      </svg>
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={classes.circle}
      >
        <circle cx='8.00006' cy='8' r='8' fill='#546BFF' fillOpacity='0.15' />
      </svg>
    </div>
  );
}

export default ViewsIcon;
