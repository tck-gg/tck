/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from '@mantine/form';
import axios from 'axios';
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import Link from 'next/link';
import { isValidEmail } from 'custom-util';

import Page from '@/components/Page';

import { useAuth } from '@/hooks/auth';

function Register() {
  const router = useRouter();
  const auth = useAuth();

  const [loading, setLoading] = useState(false);
  const [hasRegistered, setHasRegistered] = useState(false);

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
        if (response.status === 418) {
          // User has been IP banned.
          form.setErrors({
            terms: 'Your IP has been banned and you are no longer able to create new accounts.'
          });
          return;
        }
        if (response.status === 403) {
          form.setErrors({
            terms:
              'An error has occurred. Try disabling your VPN? If you think this is an error, email us at contact@tck.gg.'
          });
          return;
        }
        // If the account was't created for some other reason, like invalid email or password.
        form.setErrors({ terms: 'There was an error creating your account. Try again.' });
      }

      // If account creation succeeded.
      if (response.status === 201) {
        setHasRegistered(true);

        form.reset();
        setLoading(false);
      }
    })();
  }

  return (
    <Page title='Register'>
      <Container w='stretch' size={350} my='5em'>
        <Title align='center'>Register</Title>
        <Text color='dimmed' size='sm' align='center' mt='0.25em'>
          Already have an account?{' '}
          <Anchor href='/login' component={Link}>
            Log in
          </Anchor>
        </Text>

        <Paper withBorder shadow='md' p='xl' mt={30} radius='md' bg='#11111f'>
          <TextInput
            placeholder='Username'
            {...form.getInputProps('username')}
            disabled={loading}
            onKeyDown={getHotkeyHandler([['Enter', handleSubmit]])}
          />
          <TextInput
            placeholder='Email'
            {...form.getInputProps('email')}
            disabled={loading}
            mt='sm'
            onKeyDown={getHotkeyHandler([['Enter', handleSubmit]])}
          />
          <PasswordInput
            placeholder='Password'
            {...form.getInputProps('password')}
            disabled={loading}
            mt='sm'
            onKeyDown={getHotkeyHandler([['Enter', handleSubmit]])}
          />
          <PasswordInput
            placeholder='Confirm Password'
            {...form.getInputProps('confirmPassword')}
            disabled={loading}
            mt='sm'
            onKeyDown={getHotkeyHandler([['Enter', handleSubmit]])}
          />
          <Checkbox
            label={
              <span>
                I agree to the <Anchor href='/terms'>Terms of Service</Anchor> and the{' '}
                <Anchor href='/privacy'>Privacy Policy</Anchor>
              </span>
            }
            placeholder='Terms'
            {...form.getInputProps('terms', { type: 'checkbox' })}
            disabled={loading}
            mt='sm'
          />
          <Button
            onClick={handleSubmit}
            disabled={loading}
            fullWidth
            mt='sm'
            loading={loading}
            loaderPosition='right'
          >
            Register
          </Button>

          {hasRegistered && (
            <Text mt='xl'>Registered! Check your email to verify your account.</Text>
          )}
        </Paper>

        <Text mt='sm' size='sm'>
          <Anchor href='/' color='dimmed' component={Link}>
            Back to home
          </Anchor>
        </Text>
      </Container>
    </Page>
  );
}

export default Register;
