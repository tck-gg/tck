import Head from 'next/head';

function Layout({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>{`${title ? `${title} - ` : ''}TCK Admin`}</title>
      </Head>
      {children}
    </>
  );
}

export default Layout;
