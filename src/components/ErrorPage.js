import { useRouteError, useNavigate } from 'react-router-dom';
import React from 'react';
import { Container } from '@mui/system';
import { Typography, Paper, Button } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  const onClickBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Paper elevation={7} sx={{ minHeight: 400, mt: 2, padding: 3 }}>
        <Typography variant="h1" sx={{ fontWeight: 660, mb: 3 }}>
          {error.status}
        </Typography>
        <Typography variant="h4" sx={{ mt: 2, fontWeight: 500 }}>
          {`${error.statusText}`}
        </Typography>
        <Button
          variant="contained"
          color="success"
          startIcon={<ReplayIcon />}
          sx={{ mt: 5, height: 80 }}
          onClick={onClickBack}
        >
          One back
        </Button>
      </Paper>
    </Container>
  );
}
