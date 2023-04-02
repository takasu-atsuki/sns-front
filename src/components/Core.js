import React, { memo } from 'react';
import { useCookies } from 'react-cookie';
import Header from './Header';
import Footer from './Footer';
import { Container } from '@mui/system';
import { CircularProgress } from '@mui/material';
import ErrorFallback from '../components/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';
import ThrowingError from './ThrowingError';
// import styles from './Core.module.css';

const Core = memo((props) => {
  const [cookies] = useCookies(['pass_token']);
  if (cookies.pass_token === undefined && window.location.pathname !== '/') {
    window.location.href = '/';
    return (
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: '100vh',
          alignItems: 'center',
        }}
      >
        <CircularProgress color="success" />
      </Container>
    );
  } else if (cookies.pass_token && window.location.pathname === '/') {
    window.location.href = '/profile';
    return (
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: '100vh',
          alignItems: 'center',
        }}
      >
        <CircularProgress color="success" />
      </Container>
    );
  }
  const { children } = props;
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThrowingError>
        {/* <div className={styles.base}>
          <div className={styles.content}> */}
        <Header />
        {children}
        {/* </div> */}
        {/* <div className={styles.footer}> */}
        <Footer />
        {/* </div>
        </div> */}
      </ThrowingError>
    </ErrorBoundary>
  );
});

export default Core;
