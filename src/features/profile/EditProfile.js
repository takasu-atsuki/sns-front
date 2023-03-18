import React, { memo, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Grid,
  Fab,
  ImageList,
  ImageListItem,
  Input,
  Container,
  Paper,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {
  selectEditedProfile,
  setProfileNickName,
  setProfileImage,
  updateProf,
  resetEditProfile,
  selectMyProfile,
} from './profileSlice';
import { useNavigate } from 'react-router-dom';

const EditProfile = memo((props) => {
  const [cookies] = useCookies(['pass_token']);
  const { token } = cookies.pass_token;
  const navigate = useNavigate();
  const myProfile = useSelector(selectMyProfile);
  const dispatch = useDispatch();
  const editedProfile = useSelector(selectEditedProfile);

  const [nickNameErrMessage, setNickNameErrMessage] = useState('');

  const changeNickName = (event) => {
    setNickNameErrMessage('');
    const name = event.target.value;
    myProfile.nickName === event.target.value &&
      setNickNameErrMessage('Nickname has not been changed');
    name.length === 0 && setNickNameErrMessage('Required fields');
    name.length > 20 && setNickNameErrMessage('20 characters or less');
    dispatch(setProfileNickName(name));
  };

  const clickCameraButton = () => {
    const imageEle = document.getElementById('image');
    imageEle.click();
  };

  const selectImage = (event) => {
    const reader = new FileReader();

    reader.addEventListener('load', (event) => {
      const image = document.getElementById('imageTag');
      image.src = event.target.result;
    });

    reader.readAsDataURL(event.target.files[0]);
    dispatch(setProfileImage(event.target.files[0]));
  };

  const ExitButton = () => {
    dispatch(resetEditProfile());
    navigate(-1);
  };

  const clickUpdateProfile = () => {
    const data = {
      id: myProfile.id,
      prof: {
        nickName: editedProfile.nickName,
        image: editedProfile.image,
      },
      token,
    };
    dispatch(updateProf(data));
    dispatch(resetEditProfile());
    navigate('/profile');
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Box>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: 'center' }}
          >
            USER PROFILE EDIT
          </Typography>
          <TextField
            error={nickNameErrMessage !== '' ? true : false}
            id="standard-basic"
            color="success"
            label="NICK NAME"
            variant="standard"
            sx={{ width: '100%' }}
            value={editedProfile.nickName}
            onChange={changeNickName}
            helperText={nickNameErrMessage}
          />
          <ImageList sx={{ width: '300', height: '300' }} cols={1}>
            <ImageListItem>
              <img
                src={
                  myProfile !== undefined && myProfile.image
                    ? myProfile.image
                    : process.env.REACT_APP_NO_IMAGE_URL
                }
                alt=""
                id="imageTag"
              />
            </ImageListItem>
          </ImageList>
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
            sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}
          >
            <Grid item xs={6} sx={{ textAlign: 'center' }}>
              <Fab
                color="error"
                aria-label="add"
                variant="extended"
                sx={{ width: '50%' }}
                onClick={ExitButton}
              >
                Back
              </Fab>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'center' }}>
              <Fab
                color="success"
                aria-label="add"
                variant="extended"
                sx={{ width: '50%' }}
                onClick={clickUpdateProfile}
                disabled={
                  !editedProfile.nickName || nickNameErrMessage !== ''
                    ? true
                    : false
                }
              >
                Register
              </Fab>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
});

export default EditProfile;
