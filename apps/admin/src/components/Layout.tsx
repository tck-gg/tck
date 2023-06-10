import Head from 'next/head';
import { createStyles, Navbar, getStylesRef, rem, AppShell } from '@mantine/core';
import { IconArrowBack, IconDice5, IconGift, IconHome, IconUsers } from '@tabler/icons-react';
import { useState } from 'react';
import Link from 'next/link';

const useStyles = createStyles((theme) => {
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: `calc(${theme.spacing.md} * 1.5)`,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${getStylesRef('icon')}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black
        }
      }
    },

    linkIcon: {
      ref: getStylesRef('icon'),
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        [`& .${getStylesRef('icon')}`]: {
          color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color
        }
      }
    }
  };
});

const data = [
  { link: '/', label: 'Home', icon: IconHome },
  { link: '/users', label: 'Users', icon: IconUsers },
  { link: '/raffles', label: 'Raffles', icon: IconDice5 },
  { link: '/giveaways', label: 'Giveaways', icon: IconGift }
];

function Layout({ title, children }: { title?: string; children: React.ReactNode }) {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(
    data.find((item) => {
      return item.label.toLowerCase() === window.location.pathname.replace('/', '');
    })?.label || 'Home'
  );

  const links = data.map((item) => {
    return (
      <Link
        href={item.link}
        key={item.label}
        className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </Link>
    );
  });

  function getUrl() {
    if (process.env.NODE_ENV === 'production') {
      if (!window.location.hostname.includes('localhost')) {
        return 'https://tck.hunterparcells.com';
      }
      return 'http://localhost:8007';
    }
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:8000';
    }
    return '';
  }

  return (
    <>
      <Head>
        <title>{`${title ? `${title} - ` : ''}TCK Admin`}</title>
      </Head>
      <AppShell
        navbar={
          <Navbar width={{ sm: 300 }} p='md'>
            <Navbar.Section grow>{links}</Navbar.Section>
            <Navbar.Section className={classes.footer}>
              <a href={getUrl()} className={classes.link}>
                <IconArrowBack className={classes.linkIcon} stroke={1.5} />
                <span>Back to TCK</span>
              </a>
            </Navbar.Section>
          </Navbar>
        }
        styles={(theme) => {
          return {
            main: {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
            }
          };
        }}
      >
        {children}
      </AppShell>
    </>
  );
}

export default Layout;
