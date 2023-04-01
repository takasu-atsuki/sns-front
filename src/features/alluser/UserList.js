import React, { memo } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import {
  Paper,
  Avatar,
  List,
  Fab,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import { setSelectUserId, setSelectDmailUserId } from './allUserSlice';
import {
  selectMyProfile,
  selectProfiles,
  selectFriendList,
  postFriend,
} from '../profile/profileSlice';

const UserList = memo((props) => {
  const [cookies] = useCookies(['pass_token']);
  const { setOpen } = props;
  const { token } = cookies.pass_token;
  const myProfile = useSelector(selectMyProfile);
  const profiles = useSelector(selectProfiles);
  const myFriend = useSelector(selectFriendList);

  const dispatch = useDispatch();

  const filterProfiles = profiles.filter((profile) => {
    return profile.userPro !== myProfile.userPro;
  });

  const handleChangeUserId = (id) => {
    dispatch(setSelectUserId(id));
  };

  const clickPostFriend = (id) => {
    const data = {
      id,
      token,
    };
    dispatch(postFriend(data));
  };

  const modalOpen = (id) => {
    setOpen(true);
    dispatch(setSelectDmailUserId(id));
  };

  return (
    <Paper elevation={3}>
      <List
        dense
        sx={{
          bgcolor: 'background.paper',
          overFlow: 'hidden',
          maxHeight: 400,
          overflowY: 'scroll',
        }}
      >
        {filterProfiles.length > 0 &&
          filterProfiles.map((profile) => {
            return (
              <ListItem key={profile.id} sx={{ padding: 1 }}>
                <ListItemButton
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    handleChangeUserId(profile.userPro);
                  }}
                >
                  <ListItemAvatar
                    sx={{
                      '@media screen and (min-width:600px)': {
                        mr: 2,
                      },
                    }}
                  >
                    <Avatar
                      alt={`Avatar`}
                      src={profile.image}
                      sx={{
                        '@media screen and (max-width:600px)': {
                          width: '30px',
                          height: '30px',
                        },
                        width: '60px',
                        height: '60px',
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={profile.nickName}
                    primaryTypographyProps={{
                      sx: {
                        '@media screen and (max-width:600px)': {
                          fontSize: '8px',
                        },
                      },
                    }}
                  />
                  <Fab
                    variant="extended"
                    sx={{
                      mr: 1,
                      '@media screen and (max-width:600px)': {
                        fontSize: '8px',
                      },
                    }}
                    size="small"
                    disabled={
                      myFriend.filter(
                        (friend) =>
                          friend.askTo === profile.userPro ||
                          friend.askFrom === profile.userPro
                      )[0]
                        ? true
                        : false
                    }
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      clickPostFriend(profile.userPro);
                    }}
                  >
                    FRIEND REQUEST
                  </Fab>
                  <Fab
                    variant="extended"
                    size="small"
                    sx={{
                      '@media screen and (max-width:600px)': {
                        fontSize: '8px',
                      },
                    }}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      modalOpen(profile.userPro);
                    }}
                    disabled={
                      myFriend.filter(
                        (friend) =>
                          (friend.askTo === profile.userPro &&
                            friend.approved === true) ||
                          (friend.askFrom === profile.userPro &&
                            friend.approved === true)
                      )[0]
                        ? false
                        : true
                    }
                  >
                    Send DM
                  </Fab>
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    </Paper>
  );
});

export default UserList;
