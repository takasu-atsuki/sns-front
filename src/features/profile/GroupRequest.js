import React, { useEffect, memo } from 'react';
import { Paper, List, Container } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { selectGroupIns, selectGroups, getGroup } from '../chat/chatSlice';
import {
  selectMyProfile,
  selectProfiles,
  getProfiles,
} from '../profile/profileSlice';
import GroupApprovedList from './GroupApprovedList';

const GroupRequest = memo(() => {
  const [cookies] = useCookies(['pass_token']);
  const { token } = cookies.pass_token;
  const dispatch = useDispatch();
  const myProfile = useSelector(selectMyProfile);
  const groupIn = useSelector(selectGroupIns);
  const groups = useSelector(selectGroups);
  const profiles = useSelector(selectProfiles);

  useEffect(() => {
    (async () => {
      dispatch(getGroup(token));
      dispatch(getProfiles(token));
    })();
  }, [dispatch, token]);

  const filterGroupIn = groupIn.filter((member) => {
    return member.showUser === myProfile.userPro && member.approved === false;
  });

  return (
    <Container sx={{ mt: 2 }} maxWidth="sm">
      <Paper elevation={3}>
        <List
          dense
          sx={{
            bgcolor: 'background.paper',
            paddingX: 1,
            maxHeight: 800,
            overFlow: 'hidden',
            overflowY: 'scroll',
          }}
        >
          {filterGroupIn.length > 0 &&
            filterGroupIn.map((groupIn) => {
              return (
                <GroupApprovedList
                  key={groupIn.id}
                  groups={groups.filter(
                    (group) => group.id === groupIn.targetGroup
                  )}
                  myProfile={myProfile}
                  profiles={profiles}
                  groupIn={groupIn}
                />
              );
            })}
        </List>
      </Paper>
    </Container>
  );
});

export default GroupRequest;
