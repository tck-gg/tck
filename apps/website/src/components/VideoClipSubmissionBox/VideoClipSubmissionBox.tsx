import { useState } from 'react';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';

import { useAuth } from '@/hooks/auth';

import classes from './VideoClipSubmissionBox.module.scss';

function VideoClipSubmissionBox() {
  const [cookie, setCookie] = useCookies(['authorization']);
  const auth = useAuth();

  const [clip, setClip] = useState('');

  async function handleSubmit() {
    if (!clip.trim()) {
      return;
    }

    const response = await axios.post(
      '/api/v1/clips/submit',
      {
        clipLink: clip.trim()
      },
      {
        headers: {
          authorization: cookie.authorization
        }
      }
    );

    if (response.status === 201) {
      setClip('');
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <p className={classes.title}>PARTICIPATE</p>
      </div>
      <div className={classes.body}>
        {auth.user ? (
          <>
            <Input
              label='Clip Link'
              placeholder='Clip Link...'
              value={clip}
              icon={faVideo}
              onChange={(event) => {
                return setClip(event.target.value);
              }}
            />
            <Button
              variant='gradient'
              fullWidth
              onClick={handleSubmit}
              disabled={!auth.user || auth.user?.isBanned || !clip.trim()}
            >
              Submit Clip
            </Button>
          </>
        ) : (
          <p>You must be logged in.</p>
        )}
      </div>
      <div>
        <p className={classes.footer}>Terms and Conditions apply. Strictly for 18+ users.</p>
      </div>
    </div>
  );
}

export default VideoClipSubmissionBox;
