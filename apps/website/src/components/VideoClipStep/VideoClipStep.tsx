import classes from './VideoClipStep.module.scss';

function VideoClipStep({ title, content, step }: { title: string; content: string; step: string }) {
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <p className={classes.stepText}>STEP</p>
        <p className={classes.step}>{step}</p>
      </div>
      <div className={classes.body}>
        <p className={classes.title}>{title}</p>
        <p className={classes.content}>{content}</p>
      </div>
    </div>
  );
}

export default VideoClipStep;
