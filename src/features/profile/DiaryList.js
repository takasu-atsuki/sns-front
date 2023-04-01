import React, { memo } from 'react';
import {
  ImageList,
  Box,
  ImageListItem,
  ImageListItemBar,
  Fab,
  Skeleton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {
  selectMyDiary,
  setEditedDiary,
  deleteDiary,
  selectIsLoading,
} from './profileSlice';

const DiaryList = memo((props) => {
  const isLoading = useSelector(selectIsLoading);
  const navigate = useNavigate();
  const [cookies] = useCookies(['pass_token']);
  const { token } = cookies.pass_token;
  const dispatch = useDispatch();

  const myDiaryList = useSelector(selectMyDiary);

  const onClickSetEdited = (diary) => {
    const data = { id: diary.id, message: diary.message, image: diary.image };
    dispatch(setEditedDiary(data));
    navigate('/diary');
  };

  const onClickDeleteDiary = (id) => {
    const data = { id, token };
    dispatch(deleteDiary(data));
  };

  return (
    <Box sx={{ width: '100%', height: 450, overflowY: 'scroll' }}>
      <ImageList
        sx={{ width: '100%', mt: 0, marginX: 'auto' }}
        cols={3}
        variant="masonry"
      >
        {myDiaryList.length > 0 &&
          myDiaryList.map((diary) => (
            <>
              {isLoading ? (
                <Skeleton type="circular" key={diary.id}>
                  <ImageListItem
                    sx={{ position: 'relative' }}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      onClickSetEdited(diary);
                    }}
                  >
                    <img
                      src={
                        diary.image
                          ? diary.image
                          : process.env.REACT_APP_NO_IMAGE_URL
                      }
                      alt={diary.message ? diary.message : 'NO TITLE'}
                      loading="lazy"
                    />
                    <ImageListItemBar title={diary.message} subtitle={''} />
                    <Fab
                      color="error"
                      aria-label="add"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: '0%',
                        right: '10%',
                        width: '0px',
                        height: '0px',
                      }}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        onClickDeleteDiary(diary.id);
                      }}
                    >
                      <DeleteIcon color="error" />
                    </Fab>
                  </ImageListItem>
                </Skeleton>
              ) : (
                <ImageListItem
                  key={diary.id}
                  sx={{ position: 'relative' }}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onClickSetEdited(diary);
                  }}
                >
                  <img
                    src={
                      diary.image
                        ? diary.image
                        : process.env.REACT_APP_NO_IMAGE_URL
                    }
                    alt={diary.message ? diary.message : 'NO TITLE'}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={diary.message}
                    subtitle={''}
                    sx={{ height: '50px' }}
                  />
                  <Fab
                    color="error"
                    aria-label="add"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: '0%',
                      right: '10%',
                      width: '0px',
                      height: '0px',
                    }}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      onClickDeleteDiary(diary.id);
                    }}
                  >
                    <DeleteIcon color="error" />
                  </Fab>
                </ImageListItem>
              )}
            </>
          ))}
      </ImageList>
    </Box>
  );
});

export default DiaryList;
