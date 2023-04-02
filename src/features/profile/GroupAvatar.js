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
              sx={{
                width: '40px',
                height: '40px',
                '@media screen and (max-width:600px)': {
                  width: '20px',
                  height: '20px',
                },
              }}
            />
          );
        })}
    </>
  );
});

export default GroupAvatar;
