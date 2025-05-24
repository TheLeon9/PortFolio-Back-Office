import React, { useEffect } from 'react';
import Head from 'next/head';

import '@/styles/globals.scss';

import { ThemeProvider } from '@/context/ThemeContext.js';
import logger from '@/utils/logger';

import Layout from '@/components/layout';

import Logo from 'p/img/logo/logo_fm_white.svg';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    logger.info('Application is starting...');

    setTimeout(() => {
      logger.info('Application is fully initialized');
    }, 1000);
  }, []);

  return (
    <>
      <Head>
        <title>BO - Moracchini Florian</title>
        <link rel="shortcut icon" href={Logo.src} />
      </Head>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
