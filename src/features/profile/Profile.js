import React, { useLayoutEffect, memo } from 'react';
import { Container, Box, Grid } from '@mui/material';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import {
  resetEditedDiary,
  getMyProf,
  getProfiles,
  getMyFriend,
  getMail,
  getMyDiary,
  setLoading,
  resetLoading,
} from './profileSlice';
import { getGroupIn } from '../chat/chatSlice';
import MyProfile from './MyProfile';
import MailList from './MailList';
import FriendList from './FriendList';
import DiaryList from './DiaryList';

const Profile = memo((props) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['pass_token']);
  const dispatch = useDispatch();

  const { token } = cookies.pass_token;

  useLayoutEffect(() => {
    (async () => {
      await dispatch(setLoading());
      await dispatch(getMyProf(token));
      await dispatch(getMyFriend(token));
      await dispatch(getGroupIn(token));
      await dispatch(getProfiles(token));
      await dispatch(getMail(token));
      await dispatch(getMyDiary(token));
      await dispatch(resetLoading());
    })();
  }, [dispatch, token]);

  const onClickGoWright = () => {
    dispatch(resetEditedDiary());
    navigate('/diary');
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <MyProfile />
        </Grid>
        <Grid item xs={12} md={4}>
          <MailList />
        </Grid>
      </Grid>
      <Box sx={{ mb: 2 }}>
        <FriendList />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Fab
          variant="extended"
          aria-label="edit"
          sx={{ width: '100%', backgroundColor: '#dddddd' }}
          onClick={onClickGoWright}
        >
          <EditIcon />
        </Fab>
      </Box>
      <Grid container>
        <Grid item xs={12}>
          <DiaryList />
        </Grid>
      </Grid>
    </Container>
  );
});

export default Profile;
