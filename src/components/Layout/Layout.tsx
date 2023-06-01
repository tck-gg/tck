import Page from '../Page';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import classes from './Layout.module.scss';

function Layout({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <Page title={title}>
      <Header />
      <div className={classes.content}>{children}</div>
      <Footer />
    </Page>
  );
}

export default Layout;
