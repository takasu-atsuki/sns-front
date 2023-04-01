import React, { memo, useState } from 'react';
import { Fab, Box, Grid, Modal, Typography, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { postDmail } from '../profile/profileSlice';
import {
  selectSelectDmailUserId,
  resetSelectDmailUserId,
} from '../alluser/allUserSlice';

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

const DMailModal = memo((props) => {
  const [cookies] = useCookies(['pass_token']);
  const { token } = cookies.pass_token;
  const selectDmailUserId = useSelector(selectSelectDmailUserId);
  const { open, handleClose } = props;
  const dispatch = useDispatch();

  const [message, setMessage] = useState('');

  const [mailErrorMessage, setMailErrorMessage] = useState('');

  const changeMessage = (event) => {
    setMailErrorMessage('');
    const message = event.target.value;
    message.length === 0 && setMailErrorMessage('入力必須項目です');
    message.length > 15 && setMailErrorMessage('15文字以内に変更してください');
    setMessage(message);
  };

  const sendDmail = () => {
    const data = {
      getUser: selectDmailUserId,
      message,
      token,
    };
    dispatch(postDmail(data));
    dispatch(resetSelectDmailUserId());
    setMessage('');
    handleClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Send Content
          </Typography>
          <TextField
            error={mailErrorMessage !== '' ? true : false}
            id="standard-basic"
            color="success"
            label="message"
            variant="standard"
            sx={{ width: '100%' }}
            value={message}
            onChange={changeMessage}
            helperText={mailErrorMessage}
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
                onClick={sendDmail}
                disabled={!message || mailErrorMessage !== '' ? true : false}
              >
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
});

export default DMailModal;
