import React, { memo } from 'react';
import { useCookies } from 'react-cookie';
import { Paper, Box, Avatar, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { deleteChat } from './chatSlice';
import { selectMyProfile } from '../profile/profileSlice';

const ChatPersonalMessage = memo((props) => {
  const [cookies] = useCookies(['pass_token']);
  const { token } = cookies.pass_token;
  const { chat, profile } = props;
  const dispatch = useDispatch();
  const myProfile = useSelector(selectMyProfile);

  const chatDelete = (id) => {
    const data = {
      id,
      token,
    };
    dispatch(deleteChat(data));
  };
  return (
    <>
      {chat.sender === myProfile.userPro ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            mt: 6,
            alignItems: 'center',
          }}
          key={chat.id}
        >
          <IconButton
            color="error"
            aria-label="upload picture"
            component="label"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              chatDelete(chat.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              width: '300px',
              m: 3,
              position: 'relative',
              backgroundColor: '#b6f9b6',
            }}
          >
            {chat.message}
          </Paper>
          <Avatar alt="" src={profile.image} />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'start',
            mt: 6,
            alignItems: 'center',
          }}
          key={chat.id}
        >
          <Avatar alt="" src={profile.image} />
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              width: '300px',
              m: 3,
              backgroundColor: '#4d4d4d',
              color: '#fff',
            }}
          >
            {chat.message}
          </Paper>
        </Box>
      )}
    </>
  );
});

export default ChatPersonalMessage;
