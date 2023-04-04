import React, { memo, useState } from 'react';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Box,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { selectMyProfile } from '../profile/profileSlice';
import {
  selectAllDiary,
  updateLiked,
  selectSelectUserAllDiary,
} from './allUserSlice';

const UserDiary = memo((props) => {
  const [cookies] = useCookies(['pass_token']);
  const { token } = cookies.pass_token;
  const allDiary = useSelector(selectAllDiary);
  const myProfile = useSelector(selectMyProfile);
  const dispatch = useDispatch();
  const selectUserAllDiary = useSelector(selectSelectUserAllDiary);

  const clickUpdateLiked = (diary) => {
    const data = {
      diary,
      new: myProfile.userPro,
      token,
    };

    dispatch(updateLiked(data));
  };

  const selectDiary =
    selectUserAllDiary.length > 0 ? selectUserAllDiary : allDiary;

  return (
    <Box sx={{ width: '100%', height: 600, overflowY: 'scroll' }}>
      <ImageList
        cols={3}
        sx={{
          width: '100%',
          mt: 0,
        }}
        variant="masonry"
        gap={8}
      >
        {/* {selectDiary.length > 0 &&
          selectDiary.map((diary) => (  */}
        {allDiary.length > 0 &&
          allDiary.map((diary) => (
            <ImageListItem key={diary.id}>
              <img
                src={
                  diary.image ? diary.image : process.env.REACT_APP_NO_IMAGE_URL
                }
                alt={diary.message ? diary.message : 'NO TITLE'}
                loading="lazy"
              />
              <ImageListItemBar
                title={diary.message}
                sx={{
                  height: '30px',
                  paddingY: '3px',
                  boxSizing: 'border-box',
                }}
                subtitle={''}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${diary.message}`}
                    onClick={() => clickUpdateLiked(diary)}
                  >
                    {diary.liked.includes(Number(myProfile.userPro)) ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
      </ImageList>
    </Box>
  );
});

export default UserDiary;
