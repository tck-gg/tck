import Image from 'next/image';
import dateformat from 'dateformat';

import classes from './VideoBox.module.scss';
import ViewsIcon from '../svg/ViewsIcon/ViewsIcon';

function VideoBox({
  thumbnail,
  title,
  views,
  avatar,
  author,
  date,
  link
}: {
  thumbnail: string;
  title: string;
  views: number;
  avatar: string;
  author: string;
  date: string;
  link: string;
}) {
  function handleClick() {
    window.open(link, '_blank');
  }

  return (
    <div className={classes.root} onClick={handleClick}>
      <div className={classes.top}>
        <Image src={thumbnail} width={222} height={125} alt={title} className={classes.image} />
        <div className={classes.videoInfo}>
          <p className={classes.title}>{title}</p>
          <div className={classes.viewsSection}>
            <ViewsIcon />
            <p className={classes.viewsText}>{views}</p>
          </div>
        </div>
      </div>
      <div className={classes.bottom}>
        <div className={classes.author}>
          <Image width={22} height={22} src={avatar} alt={author} className={classes.avatar} />
          <p className={classes.authorName}>{author}</p>
        </div>
        <p className={classes.date}>{dateformat(date, 'd mmm, yyyy')}</p>
      </div>
    </div>
  );
}

export default VideoBox;
