import React, { memo } from 'react';
import { Avatar, Skeleton } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectProfiles, selectIsLoading } from './profileSlice';

const FriendMember = memo((props) => {
  const isLoading = useSelector(selectIsLoading);
  const { friend } = props;
  const profiles = useSelector(selectProfiles);

  const askFriendFilter = profiles.filter((profile) => {
    return profile.userPro === friend.askTo;
  });

  return (
    <>
      {askFriendFilter.length > 0 &&
        askFriendFilter.map((profile) => {
          return (
            <>
              {isLoading ? (
                <Skeleton variant="circular" key={profile.id}>
                  <Avatar
                    alt={profile.nickName ? profile.nickName : 'NO NICK NAME'}
                    src={profile.image}
                  />
                </Skeleton>
              ) : (
                <Avatar
                  alt={profile.nickName ? profile.nickName : 'NO NICK NAME'}
                  src={profile.image}
                  key={profile.id}
                />
              )}
            </>
          );
        })}
    </>
  );
});

export default FriendMember;
