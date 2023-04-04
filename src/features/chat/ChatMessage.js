import React, { memo, useState } from 'react';
import { Box, Toolbar, TextField, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { selectChoiceGroup, postChat } from './chatSlice';

const ChatMessage = memo((props) => {
  const [cookies] = useCookies(['pass_token']);
  const { token } = cookies.pass_token;
  const dispatch = useDispatch();
  const choiceGroup = useSelector(selectChoiceGroup);
  const [message, setMessage] = useState('');

  const [chatErrorMessage, setChatErrorMessage] = useState('');

  const changeMessage = (event) => {
    setChatErrorMessage('');
    const message = event.target.value;
    message.length === 0 && setChatErrorMessage('Required fields');
    message.length > 30 && setChatErrorMessage('30 characters or less');
    setMessage(message);
  };

  const clickPostMessage = () => {
    const data = {
      groupId: choiceGroup.id,
      message: message,
      token,
    };
    dispatch(postChat(data));
    setMessage('');
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100vw',
        backgroundColor: '#dddddd',
      }}
    >
      <Toolbar sx={{ justifyContent: 'center' }}>
        <TextField
          error={chatErrorMessage !== '' ? true : false}
          placeholder="Send Message"
          variant="standard"
          color="success"
          multiline
          sx={{
            width: '50%',
            '@media screen and (max-width:600px)': {
              width: '60%',
            },
          }}
          value={message}
          onChange={changeMessage}
          helperText={chatErrorMessage}
        />
        <Button
          variant="contained"
          color="success"
          size="large"
          sx={{
            ml: 2,
            '@media screen and (max-width:600px)': {
              width: '20px',
            },
          }}
          onClick={clickPostMessage}
          disabled={!message || chatErrorMessage !== '' ? true : false}
        >
          SEND
        </Button>
      </Toolbar>
    </Box>
  );
});
export default ChatMessage;
