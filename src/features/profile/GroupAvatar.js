import React, { memo } from 'react';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectProfiles } from '../profile/profileSlice';

const GroupAvatar = memo((props) => {
  const { user } = props;
  const profiles = useSelector(selectProfiles);

  const filterProfiles = profiles.filter((profile) => {
    return profile.userPro === user;
  });

  return (
    <>
      {filterProfiles.length > 0 &&
        filterProfiles.map((profile) => {
          return (
            <Avatar
              alt={profile.nickName ? profile.nickName : 'NO NICKNAME'}
              src={profile.image}
              key={profile.id}
            />
          );
        })}
    </>
  );
});

export default GroupAvatar;
