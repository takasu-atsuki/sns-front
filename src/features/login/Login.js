import React, { useState } from 'react';
import {
  Avatar,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Button,
  Typography,
  Container,
  CircularProgress,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import {
  selectAuth,
  selectIsLoginView,
  selectLoading,
  editUserName,
  editPassword,
  registerUser,
} from './loginSlice';
import { postMyProf } from '../profile/profileSlice';
import client from '../../utils/axiosCustom';

const Login = (props) => {
  const [, setCookie] = useCookies(['pass_token']);
  const auth = useSelector(selectAuth);
  const isLoginView = useSelector(selectIsLoginView);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  const [textErrMessage, setTextErrMessage] = useState('');
  const [passErrMessage, setPassErrMessage] = useState('');
  const [axiosErrMessage, setAxiosErrMessage] = useState('');

  const changeUserName = (event) => {
    setTextErrMessage('');
    const text = event.target.value;
    text.length === 0 && setTextErrMessage('required entry');
    text.length > 150 && setTextErrMessage('150 characters or less');
    dispatch(editUserName(text));
  };
  const changePassword = (event) => {
    setPassErrMessage('');
    const pass = event.target.value;
    pass.length === 0 && setPassErrMessage('required entry');
    pass.length < 8 && setPassErrMessage('8 characters or more');
    dispatch(editPassword(pass));
  };

  const login = async () => {
    try {
      const res = await client.post(process.env.REACT_APP_LOGIN_URL, auth, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setCookie('pass_token', res.data);
      if (!isLoginView) {
        const data = {
          prof: { nickName: 'NO NICKNAME', image: '' },
          token: res.data.token,
        };
        dispatch(postMyProf(data));
      }
      res.data
        ? (window.location.href = '/profile')
        : (window.location.href = '/');
    } catch (err) {
      setAxiosErrMessage('Username or password is incorrect');
    }
  };

  const onClickLoginRegister = async () => {
    if (isLoginView) {
      await login();
    } else {
      await dispatch(registerUser(auth));
      await login();
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {loading && <CircularProgress color="success" />}
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLoginView ? 'LOGIN' : 'REGISTER'}
        </Typography>
        {axiosErrMessage && (
          <Typography color="error" sx={{ my: 2 }}>
            {axiosErrMessage}
          </Typography>
        )}
        <Box component="" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={textErrMessage ? true : false}
                required
                fullWidth
                value={auth.username}
                label="USER NAME"
                autoComplete="email"
                onChange={changeUserName}
                helperText={textErrMessage}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={passErrMessage ? true : false}
                required
                fullWidth
                value={auth.password}
                label="Password"
                type="password"
                autoComplete="new-password"
                onChange={changePassword}
                helperText={passErrMessage}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              color="success"
              variant="contained"
              sx={{ mt: 2 }}
              disabled={
                !auth.username ||
                !auth.password ||
                textErrMessage ||
                passErrMessage
                  ? true
                  : false
              }
              onClick={() => onClickLoginRegister()}
            >
              {isLoginView ? 'LOGIN' : 'REGISTER'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
export default Login;
