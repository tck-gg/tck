import { useState } from 'react';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import SmallButton from '../SmallButton/SmallButton';
import VideoBox from '../VideoBox/VideoBox';

import { Video } from '@/types/video';

import classes from './VideoCarousel.module.scss';

function VideoCarousel({
  icon,
  name,
  videos,
  display
}: {
  icon: React.ReactNode;
  name: string;
  videos: Video[];
  display: number;
}) {
  const [page, setPage] = useState(0);

  function handleNext() {
    setPage(page + 1);
  }
  function handlePrevious() {
    setPage(page - 1);
  }

  return (
    <div>
      <div className={classes.sectionHeader}>
        <p className={classes.social}>
          {icon}
          {name}
        </p>
        <div className={classes.controls}>
          <SmallButton icon={faArrowLeft} disabled={page === 1} onClick={handlePrevious} />
          <SmallButton
            icon={faArrowRight}
            disabled={page === Math.ceil(videos.length / display)}
            onClick={handleNext}
          />
        </div>
      </div>
      <div className={classes.videoWrapper}>
        {videos
          .map((video) => {
            return (
              <VideoBox
                thumbnail={video.thumbnail}
                title={video.title}
                views={video.views}
                avatar={video.avatar}
                author={video.author}
                date={video.date}
                link={video.link}
                key={video.title}
              />
            );
          })
          .splice((page - 1) * display, display)}
      </div>
    </div>
  );
}

export default VideoCarousel;
