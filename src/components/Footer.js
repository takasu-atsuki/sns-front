import React from 'react';
import { Container } from '@mui/system';
import { Typography, Link } from '@mui/material';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href=""></Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Footer = () => {
  return (
    <Container
      maxWidth="md"
      component="footer"
      sx={{
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        mt: 8,
        py: [3, 6],
        position: 'sticky',
        top: '100vh',
        width: '100%',
      }}
    >
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};
export default Footer;
