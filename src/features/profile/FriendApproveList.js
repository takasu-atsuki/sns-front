import React, { memo } from 'react';
import { useCookies } from 'react-cookie';
import {
  Avatar,
  Fab,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { selectFriendList, updateFriendReq } from './profileSlice';

const FriendApproveList = memo((props) => {
  const [cookies] = useCookies(['pass_token']);
  const { token } = cookies.pass_token;
  const dispatch = useDispatch();
  const { profiles, request, myProfile } = props;
  const friendList = useSelector(selectFriendList);
  const clickFriendReqApproved = () => {
    const data = {
      myProfile: myProfile,
      request: request,
      friendList: friendList,
      token,
    };
    dispatch(updateFriendReq(data));
  };
  return (
    <>
      {profiles.length > 0 &&
        profiles.map((profile) => {
          return (
            <ListItem key={profile.id} sx={{ padding: 2 }}>
              <ListItemAvatar sx={{ mr: 2 }}>
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
                    fontSize: '18px',
                  },
                }}
              />
              <Fab
                variant="extended"
                sx={{
                  mr: 2,
                  '@media screen and (max-width:600px)': {
                    fontSize: '8px',
                  },
                  fontSize: '15px',
                }}
                size="small"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  clickFriendReqApproved();
                }}
              >
                APPROVAL
              </Fab>
            </ListItem>
          );
        })}
    </>
  );
});

export default FriendApproveList;
