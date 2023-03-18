import React, { memo, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, List, Container } from '@mui/material';
import {
  selectMyProfile,
  selectProfiles,
  selectFriendList,
  getProfiles,
} from '../profile/profileSlice';
import FriendApproveList from './FriendApproveList';

const FriendRequest = memo(() => {
  const [cookies] = useCookies('pass_token');
  const { token } = cookies.pass_token;
  const dispatch = useDispatch();
  const myProfile = useSelector(selectMyProfile);
  const profiles = useSelector(selectProfiles);
  const friendList = useSelector(selectFriendList);

  useEffect(() => {
    (async () => {
      dispatch(getProfiles(token));
    })();
  }, [dispatch, token]);

  const filterFriendList = friendList.filter((friend) => {
    return friend.askTo === myProfile.userPro && friend.approved === false;
  });

  return (
    <Container sx={{ mt: 2 }} maxWidth="sm">
      <Paper elevation={3}>
        <List
          dense
          sx={{
            bgcolor: 'background.paper',
            paddingX: 1,
            maxHeight: 500,
            overFlow: 'hidden',
            overflowY: 'scroll',
          }}
        >
          {filterFriendList.length > 0 &&
            filterFriendList.map((friend) => {
              return (
                <FriendApproveList
                  key={friend.id}
                  profiles={profiles.filter(
                    (profile) =>
                      profile.userPro === friend.askFrom &&
                      friend.approved === false
                  )}
                  myProfile={myProfile}
                  request={friend}
                />
              );
            })}
        </List>
      </Paper>
    </Container>
  );
});

export default FriendRequest;
