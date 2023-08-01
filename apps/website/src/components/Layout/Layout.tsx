import clsx from 'clsx';

import Page from '../Page';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import PageHeaderGlow from '../PageHeaderGlow/PageHeaderGlow';

import classes from './Layout.module.scss';

function Layout({
  title,
  children,
  className
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Page title={title}>
      <PageHeaderGlow />
      <Header />
      <div className={clsx(classes.content, className)}>{children}</div>
      <Footer />
    </Page>
  );
}

export default Layout;
