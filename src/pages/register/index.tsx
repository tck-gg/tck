/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from '@mantine/form';
import axios from 'axios';

import Page from '@/components/Page';

import { isValidEmail } from '@/util/email';

import { useAuth } from '@/hooks/auth';

function Register() {
  const router = useRouter();
  const auth = useAuth();

  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false
    },
    validate: {
      username: (value) => {
        if (!value) {
          return 'Username is required';
        }
        if (value.length > 32) {
          return 'Username must be 32 characters or less';
        }
        return value.length >= 3 ? null : 'Username must be at least 3 characters long';
      },
      email: (value) => {
        return isValidEmail(value) ? null : 'Invalid email';
      },
      password: (value) => {
        if (!value) {
          return 'Password is required';
        }
        return value.length >= 8 ? null : 'Password must be at least 8 characters long';
      },
      confirmPassword: (value, values) => {
        if (!value) {
          return 'Must confirm password';
        }
        return value === values.password ? null : 'Passwords must match';
      },
      terms: (value) => {
        return value ? null : 'Must agree';
      }
    }
  });

  useEffect(() => {
    if (auth?.user) {
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
      setLoading(true);

      if (!form.isValid()) {
        // Show errors.
        form.validate();
        setLoading(false);
        return;
      }

      // Try to register.
      const response = await axios.post(
        '/api/v1/user/register',
        {
          username: form.values.username,
          email: form.values.email,
          password: form.values.password
        },
        {
          validateStatus: (status) => {
            return status < 500;
          }
        }
      );

      // If account creation failed.
      if (response.status !== 201) {
        setLoading(false);
        if (response.status === 409) {
          // If the account already exists.
          form.setErrors({ username: 'Account already exists', email: 'Account already exists' });
          return;
        }
        // If the account was't created for some other reason, like invalid email or password.
        form.setErrors({ terms: 'There was an error creating your account. Try again.' });
      }

      // Login if account creation was successful.
      const user = await auth.login(form.values.email, form.values.password);
      if (user) {
        // Redirect to feed.
        router.push('/');
        setLoading(false);
        return;
      }

      // Else, refresh. Something stupid happened.
      router.reload();
    })();
  }

  return (
    <Page title='Register'>
      <input
        type='text'
        name='username'
        placeholder='Username'
        {...form.getInputProps('username')}
        disabled={loading}
      />
      <input
        type='text'
        name='email'
        placeholder='Email'
        {...form.getInputProps('email')}
        disabled={loading}
      />
      <input
        type='password'
        name='password'
        placeholder='Password'
        {...form.getInputProps('password')}
        disabled={loading}
      />
      <input
        type='password'
        name='confirmPassword'
        placeholder='Confirm Password'
        {...form.getInputProps('confirmPassword')}
        disabled={loading}
      />
      <div>
        <input
          type='checkbox'
          name='terms'
          placeholder='Terms'
          {...form.getInputProps('terms', { type: 'checkbox' })}
          disabled={loading}
        />
        <label>Agree</label>
      </div>
      <button onClick={handleSubmit} disabled={loading}>
        Register
      </button>
    </Page>
  );
}

export default Register;
