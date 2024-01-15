import classes from './ProfileBoxBase.module.scss';

function ProfileBoxBase({ children }: { children: React.ReactNode }) {
  return <div className={classes.root}>{children}</div>;
}

export default ProfileBoxBase;
