import React, { memo, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@mui/material';
import ChatMessage from './ChatMessage';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectChoiceGroup,
  selectChats,
  getChat,
  resetSelectChoiceGroup,
} from './chatSlice';
import { selectProfiles, getProfiles } from '../profile/profileSlice';
import ChatPersonalMessage from './ChatPersonalMessage';

const Chat = memo((props) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['pass_token']);
  const choiceGroup = useSelector(selectChoiceGroup);

  if (choiceGroup.openGrouper === 0) {
    window.location.href = '/all_chat';
  }
  const profiles = useSelector(selectProfiles);
  const { token } = cookies.pass_token;
  const dispatch = useDispatch();

  const chats = useSelector(selectChats);

  const onClickBackButton = () => {
    dispatch(resetSelectChoiceGroup());
    navigate(-1);
  };

  useEffect(() => {
    (async () => {
      dispatch(getProfiles(token));
      dispatch(getChat(token));
    })();
  }, [dispatch, token]);

  const chatFilter = chats.filter((chat) => {
    return chat.group === choiceGroup.id;
  });

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ backgroundColor: '#dddddd' }}>
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={onClickBackButton}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <Typography
              variant="h5"
              color="inherit"
              align="center"
              sx={{
                '@media screen and (max-width:600px)': {
                  fontSize: '15px',
                },
              }}
            >
              {choiceGroup.title}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Container sx={{ paddingBottom: 5 }}>
        {chatFilter.length > 0 &&
          chatFilter.map((chat) => {
            return (
              <ChatPersonalMessage
                chat={chat}
                profile={
                  profiles.length > 0 &&
                  profiles.filter(
                    (profile) => profile.userPro === chat.sender
                  )[0]
                }
                key={chat.id}
              />
            );
          })}
      </Container>
      <ChatMessage />
    </>
  );
});

export default Chat;
