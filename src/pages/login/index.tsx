/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useForm } from '@mantine/form';
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
            setCookie('authorization', user.apiKey, {
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
      <Container w='stretch' size={350} my='5em'>
        <Title align='center'>Welcome back!</Title>
        <Text color='dimmed' size='sm' align='center' mt='0.25em'>
          Don{"'"}t have an account yet?{' '}
          <Anchor href='/register' component={Link}>
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow='md' p='xl' mt={30} radius='md' bg='#11111f'>
          <TextInput
            placeholder='Email'
            {...form.getInputProps('email')}
            disabled={loading}
            onKeyDown={getHotkeyHandler([['Enter', handleSubmit]])}
          />
          <PasswordInput
            placeholder='Password'
            {...form.getInputProps('password')}
            disabled={loading}
            mt='sm'
            onKeyDown={getHotkeyHandler([['Enter', handleSubmit]])}
          />
          <Checkbox label='Remember me' {...form.getInputProps('rememberMe')} mt='sm' />
          <Button
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
            loading={loading}
            loaderPosition='right'
            mt='sm'
          >
            Log in
          </Button>
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

export default Login;
