import React, { memo } from 'react';
import AvatarGroup from '@mui/material/AvatarGroup';
import FriendMember from './FriendMember';
import { useSelector } from 'react-redux';
import { selectFriendList, selectMyProfile } from './profileSlice';

const FriendList = memo(() => {
  const myProfile = useSelector(selectMyProfile);
  const friendList = useSelector(selectFriendList);

  const filterFriendList = friendList.filter((friend) => {
    return friend.askFrom === myProfile.userPro && friend.approved === true;
  });

  return (
    <AvatarGroup max={4} sx={{ justifyContent: 'center' }}>
      {filterFriendList.length > 0 &&
        filterFriendList.map((friend) => {
          return <FriendMember friend={friend} key={friend.id} />;
        })}
    </AvatarGroup>
  );
});

export default FriendList;
