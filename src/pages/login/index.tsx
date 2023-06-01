/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useForm } from '@mantine/form';

import Page from '@/components/Page';

import { isValidEmail } from '@/util/email';

function Login() {
  const router = useRouter();
  const auth = useAuth();

  const [loading, setLoading] = useState(false);

  const [, setCookie] = useCookies(['authorization']);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validate: {
      email: (value) => {
        return isValidEmail(value) ? null : 'Invalid email';
      },
      password: (value) => {
        if (!value) {
          return 'Password is required';
        }
        return value.length >= 8 ? null : 'Incorrect password';
      }
    }
  });

  useEffect(() => {
    if (auth.user) {
      router.push('/');

      // Just in case.
      form.reset();
    }
  }, [auth]);

  function handleSubmit(
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLElement> | KeyboardEvent
  ) {
    event.preventDefault();

    // Unfocus the text input.
    (document.activeElement as HTMLElement).blur();

    (async () => {
      if (form.isValid()) {
        setLoading(true);

        const user = await auth.login(form.values.email, form.values.password);
        if (user) {
          // If "Remember me" is checked.
          if (form.values.rememberMe) {
            setCookie('authorization', `${user.username}@${user.apiKey}`, {
              maxAge: 3600
            });
          }
          router.push('/');

          setLoading(false);
          return;
        }

        // If we are incorrect.
        form.setFieldValue('password', '');
        form.setFieldError('password', 'Incorrect password');
        setLoading(false);
      } else {
        form.validate();
      }
    })();
  }

  return (
    <Page title='Login'>
      <input type='email' placeholder='Email' {...form.getInputProps('email')} disabled={loading} />
      <input
        type='password'
        placeholder='Password'
        {...form.getInputProps('password')}
        disabled={loading}
      />
      <div>
        <input
          type='checkbox'
          {...form.getInputProps('rememberMe', { type: 'checkbox' })}
          disabled={loading}
        />
        <label>Remember Me</label>
      </div>
      <button onClick={handleSubmit} disabled={loading}>
        Login
      </button>
    </Page>
  );
}

export default Login;
