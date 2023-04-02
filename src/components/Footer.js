import React from 'react';
import { Container } from '@mui/system';
import { Typography, Link, Paper, Box } from '@mui/material';

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
    // <Container
    //   maxWidth="md"
    //   component="footer"
    //   sx={{
    //     borderTop: (theme) => `1px solid ${theme.palette.divider}`,
    //     mt: 8,
    //     py: [3, 6],
    //   }}
    // >
    //   <Copyright sx={{ mt: 5 }} />
    // </Container>
    <Paper
      sx={{
        marginTop: 'calc(10% + 60px)',
        width: '100%',
        position: 'fixed',
        bottom: 0,
      }}
      component="footer"
      square
      variant="outlined"
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            mb: 2,
          }}
        >
          <Typography variant="caption" color="initial">
            Copyright ©2023.
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
};
export default Footer;
