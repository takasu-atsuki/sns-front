import React, { memo } from 'react';
import { AvatarGroup } from '@mui/material';
import GroupAvatar from './GroupAvatar';

const UserAvatarGroup = memo((props) => {
  const { inUser } = props;
  return (
    <AvatarGroup max={5}>
      {inUser.length > 0 &&
        inUser.map((user) => {
          return <GroupAvatar user={user} key={user} />;
        })}
    </AvatarGroup>
  );
});

export default UserAvatarGroup;
