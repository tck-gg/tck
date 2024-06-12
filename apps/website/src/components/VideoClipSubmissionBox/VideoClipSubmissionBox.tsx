import { useEffect, useState } from 'react';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import isUrl from 'is-url';

import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';

import { useAuth } from '@/hooks/auth';

import classes from './VideoClipSubmissionBox.module.scss';

function VideoClipSubmissionBox() {
  const [cookie, setCookie] = useCookies(['authorization']);

  const auth = useAuth();

  const [clip, setClip] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  async function handleSubmit() {
    const cleanClip = clip.trim();
    if (!cleanClip) {
      return;
    }

    setDisabled(true);

    if (!isUrl(cleanClip)) {
      setFeedbackText('Invalid URL');
      setDisabled(false);
      return;
    }

    const response = await axios.post(
      '/api/v1/clips/submit',
      {
        clipLink: cleanClip
      },
      {
        headers: {
          authorization: cookie.authorization
        }
      }
    );

    if (response.status === 201) {
      setClip('');
      setFeedbackText('Submitted!');
    }

    setDisabled(false);
  }

  useEffect(() => {
    if (clip !== '') {
      setFeedbackText('');
    }
  }, [clip]);

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <p className={classes.title}>PARTICIPATE</p>
      </div>
      <div className={classes.body}>
        {auth.user ? (
          <>
            <div className={classes.inputGroup}>
              <Input
                label='Clip Link'
                placeholder='Clip Link...'
                value={clip}
                icon={faVideo}
                onChange={(event) => {
                  return setClip(event.target.value);
                }}
                disabled={disabled}
              />
              <Button
                variant='gradient'
                fullWidth
                onClick={handleSubmit}
                disabled={!auth.user || auth.user?.isBanned || !clip.trim() || disabled}
              >
                Submit Clip
              </Button>
            </div>

            {feedbackText && <p className={classes.center}>{feedbackText}</p>}
          </>
        ) : (
          <p className={classes.center}>You must be logged in.</p>
        )}
      </div>
      <div>
        <p className={classes.footer}>Terms and Conditions apply. Strictly for 18+ users.</p>
      </div>
    </div>
  );
}

export default VideoClipSubmissionBox;
