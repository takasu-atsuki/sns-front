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
            <ListItem key={profile.id}>
              <ListItemAvatar sx={{ mr: 2 }}>
                <Avatar
                  alt={`Avatar`}
                  src={profile.image}
                  sx={{ width: 60, height: 60 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={profile.nickName}
                primaryTypographyProps={{
                  sx: {
                    fontSize: '18px',
                    '@media screen and (max-width:600px)': {
                      fontSize: '8px',
                    },
                  },
                }}
              />
              <Fab
                variant="extended"
                sx={{ mr: 2 }}
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
