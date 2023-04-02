import React, { memo } from 'react';
import { AvatarGroup } from '@mui/material';
import GroupAvatar from './GroupAvatar';

const UserAvatarGroup = memo((props) => {
  const { inUser, openGrouper } = props;
  console.log(inUser);
  console.log(openGrouper);
  const groupMember =
    inUser.length > 0 ? inUser.unshift(openGrouper) : [openGrouper];
  return (
    <AvatarGroup max={5}>
      {groupMember.length > 0 &&
        groupMember.map((user) => {
          return <GroupAvatar user={user} key={user} />;
        })}
    </AvatarGroup>
  );
});

export default UserAvatarGroup;
