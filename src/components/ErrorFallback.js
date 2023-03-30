import React from 'react';
import { Container } from '@mui/system';
import { Typography, Paper, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import ReplayIcon from '@mui/icons-material/Replay';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { selectErrMessage } from '../features/profile/profileSlice';
import { selectAllUserErrMessage } from '../features/alluser/allUserSlice';
import { selectChatErrMessage } from '../features/chat/chatSlice';
import { selectLoginErr } from '../features/login/loginSlice';

function ErrorFallback(props) {
  const navigate = useNavigate();
  const profileError = useSelector(selectErrMessage);
  const allUserError = useSelector(selectAllUserErrMessage);
  const chatError = useSelector(selectChatErrMessage);
  const loginError = useSelector(selectLoginErr);
  const [, , removeCookie] = useCookies('pass_token');

  const onClickbackLogin = () => {
    removeCookie('pass_token');
    window.location.href = '/';
  };

  const onClickReload = () => {
    window.location.reload();
  };

  const onClickBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Paper elevation={7} sx={{ minHeight: 400, mt: 2, padding: 3 }}>
        <Typography variant="h2" sx={{ fontWeight: 660, mb: 3 }}>
          {profileError.code ||
            allUserError.code ||
            chatError.code ||
            loginError.code}
        </Typography>
        <Typography sx={{ mt: 2, fontWeight: 500 }}>
          {profileError.message ||
            allUserError.message ||
            chatError.message ||
            loginError.message}
        </Typography>
        {(profileError.code === 404 ||
          allUserError.code === 404 ||
          chatError.code === 404 ||
          loginError.code === 404) && (
          <Button
            variant="contained"
            color="success"
            startIcon={<ReplayIcon />}
            sx={{ mt: 5, height: 80 }}
            onClick={onClickBack}
          >
            One back
          </Button>
        )}
        {(profileError.code === 401 ||
          allUserError.code === 401 ||
          chatError.code === 401 ||
          loginError.code === 401) && (
          <Button
            variant="contained"
            color="success"
            startIcon={<MeetingRoomIcon />}
            sx={{ mt: 5, height: 80 }}
            onClick={onClickbackLogin}
          >
            Back to Login Page
          </Button>
        )}
        {(profileError.code !== 401 ||
          profileError.code !== 404 ||
          allUserError.code !== 401 ||
          allUserError.code !== 404 ||
          chatError.code !== 401 ||
          chatError.code !== 404 ||
          loginError.code !== 401 ||
          loginError.code !== 404) && (
          <Button
            variant="contained"
            color="success"
            startIcon={<ReplayIcon />}
            sx={{ mt: 5, height: 80 }}
            onClick={onClickReload}
          >
            Page reload
          </Button>
        )}
      </Paper>
    </Container>
  );
}

export default ErrorFallback;
