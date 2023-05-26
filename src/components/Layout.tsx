import Head from 'next/head';

function Layout({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <>
      <Head>
        <meta property='og:title' content={`${title ? `${title} - ` : ''}TCK`} />

        <title>{`${title ? `${title} - ` : ''}TCK`}</title>
      </Head>
      {children}
    </>
  );
}

export default Layout;
