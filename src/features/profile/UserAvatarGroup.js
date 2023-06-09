import React, { memo } from 'react';
import { AvatarGroup } from '@mui/material';
import GroupAvatar from './GroupAvatar';

const UserAvatarGroup = memo((props) => {
  const { inUser, openGrouper } = props;
  const groupMember = [];
  groupMember.push(openGrouper);
  inUser.map((user) => {
    groupMember.push(user);
    return null;
  });
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
