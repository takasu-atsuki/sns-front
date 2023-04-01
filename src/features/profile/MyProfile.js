import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Paper,
  Box,
  Typography,
  Button,
  Avatar,
  Skeleton,
} from '@mui/material';
import {
  selectMyProfile,
  setProfileNickName,
  selectIsLoading,
} from './profileSlice';

const MyProfile = memo((props) => {
  const isLoading = useSelector(selectIsLoading);
  const navigate = useNavigate();
  const myProfile = useSelector(selectMyProfile);
  const dispatch = useDispatch();

  const updateProf = () => {
    dispatch(setProfileNickName(myProfile.nickName));
    navigate('/editProf');
  };
  return (
    <Paper
      elevation={3}
      sx={{
        textAlign: 'center',
        paddingTop: 1,
        paddingBottom: 3,
        paddingX: 1,
        mb: 3,
      }}
    >
      <Box>
        {isLoading ? (
          <Skeleton variant="circular" sx={{ marginX: 'auto', mb: 3 }}>
            <Avatar
              alt={
                myProfile !== undefined && myProfile.nickName
                  ? myProfile.nickName
                  : ''
              }
              src={
                myProfile !== undefined && myProfile.image
                  ? myProfile.image
                  : ''
              }
              sx={{ width: 100, height: 100, marginX: 'auto', mb: 3 }}
            />
          </Skeleton>
        ) : (
          <Avatar
            alt={
              myProfile !== undefined && myProfile.nickName
                ? myProfile.nickName
                : ''
            }
            src={
              myProfile !== undefined && myProfile.image ? myProfile.image : ''
            }
            sx={{ width: 100, height: 100, marginX: 'auto', mb: 3 }}
          />
        )}

        <Typography
          variant="h3"
          sx={{
            '@media screen and (max-width:600px)': {
              fontSize: '15px',
            },
            fontSize: '25px',
          }}
        >
          <Button onClick={updateProf} sx={{ color: 'black' }}>
            <EditIcon />
          </Button>
          {myProfile !== undefined && myProfile.nickName
            ? myProfile.nickName
            : ''}
        </Typography>
      </Box>
    </Paper>
  );
});

export default MyProfile;
