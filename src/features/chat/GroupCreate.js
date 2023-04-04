import React, { memo, useState } from 'react';
import { Box, Typography, Modal, TextField, Grid, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { postGroup } from './chatSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const GroupCreate = memo((props) => {
  const [cookies] = useCookies(['pass_token']);
  const dispatch = useDispatch();
  const { token } = cookies.pass_token;
  const { open, handleClose } = props;

  const [groupErrMessage, setGroupErrorMessage] = useState('');
  const [title, setTitle] = useState('');

  const changeGroupTitle = (event) => {
    setGroupErrorMessage('');
    const title = event.target.value;
    title.length === 0 && setGroupErrorMessage('Required fields');
    title.length > 20 && setGroupErrorMessage('20 characters or less');
    setTitle(title);
  };

  const createGroup = () => {
    const data = { title, token };
    dispatch(postGroup(data));
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{
            '@media screen and (max-width:600px)': {
              fontSize: '15px',
            },
          }}
        >
          GROUP CREATE
        </Typography>
        <TextField
          error={groupErrMessage !== '' ? true : false}
          id="standard-basic"
          color="success"
          label="Title"
          variant="standard"
          sx={{ width: '100%' }}
          value={title}
          onChange={changeGroupTitle}
          helperText={groupErrMessage}
        />
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
              onClick={handleClose}
            >
              <CloseIcon />
            </Fab>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'center' }}>
            <Fab
              color="success"
              aria-label="add"
              variant="extended"
              sx={{ width: '50%' }}
              onClick={createGroup}
              disabled={!title || groupErrMessage !== '' ? true : false}
            >
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
});

export default GroupCreate;
