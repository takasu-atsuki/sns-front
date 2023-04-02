import React, { memo } from 'react';
import { Fab, ListItem, ListItemText } from '@mui/material';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import UserAvatarGroup from './UserAvatarGroup';
import { groupInUpdateGroupUp } from '../chat/chatSlice';

const GroupApprovedList = memo((props) => {
  const [cookies] = useCookies(['pass_token']);
  const { token } = cookies.pass_token;
  const dispatch = useDispatch();
  const { groups, myProfile, groupIn } = props;

  const clickGroupReqApproved = (group) => {
    const data = {
      userId: myProfile.userPro,
      group: group,
      groupIn: groupIn,
      token,
    };
    dispatch(groupInUpdateGroupUp(data));
  };

  return (
    <>
      {groups.length > 0 &&
        groups.map((group) => {
          return (
            <ListItem key={group.id} sx={{ padding: 2 }}>
              <ListItemText
                primary={group.title}
                primaryTypographyProps={{
                  sx: {
                    '@media screen and (max-width:600px)': {
                      fontSize: '8px',
                    },
                    fontSize: '18px',
                  },
                }}
              />
              <UserAvatarGroup
                inUser={group.inUser}
                openGrouper={group.openGrouper}
              />
              <Fab
                variant="extended"
                sx={{
                  '@media screen and (max-width:600px)': {
                    fontSize: '8px',
                  },
                  mr: 2,
                  ml: 3,
                  fontSize: '15px',
                }}
                size="small"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  clickGroupReqApproved(group);
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

export default GroupApprovedList;
