import React, { useState, useEffect, memo } from 'react';
import { Container } from '@mui/system';
import { Grid, CircularProgress, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import UserDiary from './UserDiary';
import DMailModal from '../dmail/DMailModal';
import {
  getMyProf,
  getProfiles,
  getMyFriend,
  selectProfiles,
} from '../profile/profileSlice';
import {
  selectSelectUserId,
  setSelectUserDiary,
  selectAllUserLoading,
  getAllDiary,
  setAllUserLoading,
  resetAllUserLoading,
  selectSelectUserAllDiary,
} from './allUserSlice';
import { getGroupIn } from '../chat/chatSlice';
import UserList from './UserList';

const AllUser = memo((props) => {
  const [cookies] = useCookies(['pass_token']);
  const { token } = cookies.pass_token;
  const allUserLoading = useSelector(selectAllUserLoading);
  const dispatch = useDispatch();
  const selectUserId = useSelector(selectSelectUserId);
  const selectUserAllDiary = useSelector(selectSelectUserAllDiary);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(setAllUserLoading());
      await dispatch(getMyProf(token));
      await dispatch(getMyFriend(token));
      await dispatch(getGroupIn(token));
      await dispatch(getMyProf(token));
      await dispatch(getProfiles(token));
      await dispatch(getMyFriend(token));
      await dispatch(getAllDiary(token));
      await dispatch(resetAllUserLoading());
    })();
  }, [dispatch, token, selectUserAllDiary]);

  useEffect(() => {
    dispatch(setSelectUserDiary(selectUserId));
  }, [selectUserId, dispatch]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {allUserLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress color="success" />
        </Box>
      ) : (
        <>
          <Container sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <UserList setOpen={setOpen} />
              </Grid>
              <Grid item xs={12}>
                <UserDiary />
              </Grid>
            </Grid>
          </Container>
          <DMailModal open={open} handleClose={handleClose} />
        </>
      )}
    </>
  );
});

export default AllUser;
