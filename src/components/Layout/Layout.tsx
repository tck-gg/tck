import Page from '../Page';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import PageHeaderGlow from '../PageHeaderGlow/PageHeaderGlow';

import classes from './Layout.module.scss';

function Layout({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <Page title={title}>
      <PageHeaderGlow />
      <Header />
      <div className={classes.content}>{children}</div>
      <Footer />
    </Page>
  );
}

export default Layout;
