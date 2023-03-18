import React, { memo, useState } from 'react';
import {
  Container,
  Box,
  Button,
  Input,
  ImageList,
  ImageListItem,
  Grid,
  Paper,
  Typography,
  Fab,
  TextField,
} from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {
  selectEditedDiary,
  setDiaryMessage,
  setDiaryImage,
  postDiary,
  updateDiary,
  setEditedDiary,
} from '../profile/profileSlice';

const Diary = memo((props) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['pass_token']);
  const { token } = cookies.pass_token;
  const editedDiary = useSelector(selectEditedDiary);
  const dispatch = useDispatch();

  const [error, setError] = useState('');

  const changeMessage = (event) => {
    setError('');
    const message = event.target.value;
    message.length === 0 && setError('Required fields');
    message.length > 30 && setError('30 characters or less');
    dispatch(setDiaryMessage(message));
  };

  const clickCameraButton = () => {
    document.getElementById('image').click();
  };

  const selectImage = (event) => {
    const reader = new FileReader();

    reader.addEventListener('load', (event) => {
      const imageBox = document.getElementById('imageTag');
      imageBox.src = event.target.result;
    });

    reader.readAsDataURL(event.target.files[0]);
    dispatch(setDiaryImage(event.target.files[0]));
  };

  const clickUpdateRegister = () => {
    if (editedDiary.id) {
      const data = {
        id: editedDiary.id,
        diary: { message: editedDiary.message, image: editedDiary.image },
        token,
      };
      dispatch(updateDiary(data));
      dispatch(setEditedDiary({ id: 0, image: {}, message: '' }));
    } else {
      const data = {
        diary: { message: editedDiary.message, image: editedDiary.image },
        token,
      };
      dispatch(postDiary(data));
      dispatch(setEditedDiary({ id: 0, image: {}, message: '' }));
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          One Word
        </Typography>
        <Container>
          <Box sx={{ marginX: 'auto', mt: 2, textAlign: 'center' }}>
            <TextField
              id="outlined-multiline-static"
              label="One word"
              multiline
              rows={2}
              sx={{ width: '60%' }}
              placeholder="(of one's business) slow"
              value={editedDiary.message}
              onChange={changeMessage}
              error={error !== '' ? true : false}
              helperText={error}
            />
            <ImageList sx={{ width: '300', height: '300' }} cols={1}>
              <ImageListItem>
                <img
                  src={
                    editedDiary.image
                      ? editedDiary.image
                      : process.env.REACT_APP_NO_IMAGE_URL
                  }
                  alt=""
                  id="imageTag"
                />
              </ImageListItem>
            </ImageList>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Fab
              aria-label="add"
              variant="extended"
              sx={{ width: '100%' }}
              color="action"
              onClick={clickCameraButton}
            >
              <AddAPhotoIcon />
              <Input
                type="file"
                id="image"
                onChange={selectImage}
                sx={{ display: 'none' }}
                inputProps={{ accept: '.jpg, .jpeg, .png, .gif' }}
              />
            </Fab>
          </Box>
          <Grid
            container
            sx={{ display: 'flex', justifyContent: 'space-around' }}
          >
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="error"
                sx={{ mt: 2 }}
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="success"
                sx={{ mt: 2 }}
                onClick={clickUpdateRegister}
                disabled={!editedDiary.message || error !== ''}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </Container>
  );
});

export default Diary;
