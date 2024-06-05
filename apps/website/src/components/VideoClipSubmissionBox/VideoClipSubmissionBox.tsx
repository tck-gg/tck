import { useState } from 'react';
import { faVideo } from '@fortawesome/free-solid-svg-icons';

import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';

import classes from './VideoClipSubmissionBox.module.scss';

function VideoClipSubmissionBox() {
  const [clip, setClip] = useState('');

  function handleSubmit() {
    // TODO:
  }

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <p className={classes.title}>PARTICIPATE</p>
      </div>
      <div className={classes.body}>
        <Input
          label='Clip Link'
          placeholder='Clip Link...'
          value={clip}
          icon={faVideo}
          onChange={(event) => {
            return setClip(event.target.value);
          }}
        />
        <Button variant='gradient' fullWidth onClick={handleSubmit}>
          Submit Clip
        </Button>
      </div>
      <div>
        <p className={classes.footer}>Terms and Conditions apply. Strictly for 18+ users.</p>
      </div>
    </div>
  );
}

export default VideoClipSubmissionBox;
