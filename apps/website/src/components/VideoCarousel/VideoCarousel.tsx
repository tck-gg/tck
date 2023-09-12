import { useState, useEffect } from 'react';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import lodash from 'lodash';

import SmallButton from '@/components/ui/SmallButton/SmallButton';
import VideoBox from '../VideoBox/VideoBox';

import { Video } from '@/types/video';

import classes from './VideoCarousel.module.scss';

function VideoCarousel({
  icon,
  name,
  videos
}: {
  icon: React.ReactNode;
  name: string;
  videos: Video[];
}) {
  const [page, setPage] = useState(1);

  // TODO: Add skeleton loaders.
  const [display, setDisplay] = useState(0);

  function getDisplayCount() {
    // This feels like cheating.
    if (Math.min(window.innerWidth, window.screen.width) < 600) {
      return 1;
    }
    if (Math.min(window.innerWidth, window.screen.width) < 900) {
      return 2;
    }
    if (Math.min(window.innerWidth, window.screen.width) < 1200) {
      return 3;
    }
    if (Math.min(window.innerWidth, window.screen.width) < 1500) {
      return 4;
    }
    return 5;
  }

  useEffect(() => {
    function handleResize() {
      setDisplay(getDisplayCount());
      // TODO: Make this better.
      setPage(1);
    }
    handleResize();

    window.addEventListener('resize', lodash.throttle(handleResize, 200));
    return function () {
      return window.removeEventListener('resize', lodash.throttle(handleResize, 200));
    };
  }, []);

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
