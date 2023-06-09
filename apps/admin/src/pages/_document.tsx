import { createGetInitialProps } from '@mantine/next';
import Document, { Head, Html, Main, NextScript } from 'next/document';

const getInitialProps = createGetInitialProps();

class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head>
          <meta charSet='UTF-8' />
          <meta name='language' content='EN' />

          {/* <link rel='shortcut icon' href='/img/icon/favicon.ico' />
          <link rel='icon' sizes='16x16 32x32 64x64' href='/img/icon/favicon.ico' />
          <link rel='icon' type='image/png' sizes='196x196' href='/img/icon/favicon-192.png' />
          <link rel='icon' type='image/png' sizes='160x160' href='/img/icon/favicon-160.png' />
          <link rel='icon' type='image/png' sizes='96x96' href='/img/icon/favicon-96.png' />
          <link rel='icon' type='image/png' sizes='64x64' href='/img/icon/favicon-64.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/img/icon/favicon-32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/img/icon/favicon-16.png' />
          <link rel='apple-touch-icon' href='/img/icon/favicon-57.png' />
          <link rel='apple-touch-icon' sizes='114x114' href='/img/icon/favicon-114.png' />
          <link rel='apple-touch-icon' sizes='72x72' href='/img/icon/favicon-72.png' />
          <link rel='apple-touch-icon' sizes='144x144' href='/img/icon/favicon-144.png' />
          <link rel='apple-touch-icon' sizes='60x60' href='/img/icon/favicon-60.png' />
          <link rel='apple-touch-icon' sizes='120x120' href='/img/icon/favicon-120.png' />
          <link rel='apple-touch-icon' sizes='76x76' href='/img/icon/favicon-76.png' />
          <link rel='apple-touch-icon' sizes='152x152' href='/img/icon/favicon-152.png' />
          <link rel='apple-touch-icon' sizes='180x180' href='/img/icon/favicon-180.png' /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default _Document;
