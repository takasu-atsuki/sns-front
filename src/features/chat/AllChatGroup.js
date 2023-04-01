import React, { useEffect, memo, useState } from 'react';
import { Container } from '@mui/system';
import {
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Fab,
  CircularProgress,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import {
  selectGroups,
  selectGroupIns,
  setSelectChoiceGroup,
  selectChatLoading,
  deleteGroup,
  getGroup,
  getGroupIn,
  setChatLoading,
  resetChatLoading,
} from './chatSlice';

import {
  getMyProf,
  getMyFriend,
  selectMyProfile,
} from '../profile/profileSlice';
import GroupCreate from './GroupCreate';
import GroupMemberAdd from './GroupMemberAdd';

const AllChatGroup = memo((props) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['pass_token']);
  const chatLoading = useSelector(selectChatLoading);

  const { token } = cookies.pass_token;
  const dispatch = useDispatch();

  const myProfile = useSelector(selectMyProfile);
  const groups = useSelector(selectGroups);
  const groupIn = useSelector(selectGroupIns);

  const [openGroupCreate, setOpenGroupCreate] = useState(false);
  const [openGroupMemberAdd, setOpenGroupMemberAdd] = useState(false);

  const handleGroupCreateClose = () => {
    setOpenGroupCreate(false);
  };

  const handleGroupCreateOpen = () => {
    setOpenGroupCreate(true);
  };

  const handleGroupMemberAddOpen = (group) => {
    dispatch(setSelectChoiceGroup(group));
    setOpenGroupMemberAdd(true);
  };

  const handleGroupMemberAddClose = () => {
    setOpenGroupMemberAdd(false);
  };

  const changePageChat = (group) => {
    dispatch(setSelectChoiceGroup(group));
    navigate('chat');
  };

  const groupDelete = (id) => {
    const data = {
      id,
      token,
    };
    dispatch(deleteGroup(data));
  };

  useEffect(() => {
    (async () => {
      await dispatch(setChatLoading());
      await dispatch(getMyProf(token));
      await dispatch(getMyFriend(token));
      await dispatch(getGroupIn(token));
      await dispatch(getGroup(token));
      await dispatch(resetChatLoading());
    })();
  }, [dispatch, token]);

  const filterGroup = groups.filter((group) => {
    return (
      group.openGrouper === myProfile.userPro ||
      group.inUser.includes(myProfile.userPro)
    );
  });

  return (
    <>
      <GroupCreate
        open={openGroupCreate}
        handleClose={handleGroupCreateClose}
      />
      <GroupMemberAdd
        open={openGroupMemberAdd}
        handleClose={handleGroupMemberAddClose}
        myProfile={myProfile}
        groupIn={groupIn}
      />
      <Container sx={{ mt: 2 }}>
        <Fab
          variant="extended"
          sx={{ backgroundColor: '#dddddd', width: '100%', mb: 2 }}
          onClick={handleGroupCreateOpen}
        >
          <GroupAddIcon />
        </Fab>
        {chatLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <CircularProgress color="success" />
          </Box>
        ) : (
          <Paper elevation={3}>
            <List dense sx={{ bgcolor: 'background.paper', paddingX: 1 }}>
              {filterGroup.length > 0 &&
                filterGroup.map((group) => {
                  return (
                    <ListItem key={group.id} sx={{ padding: 2 }}>
                      <ListItemButton
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          changePageChat(group);
                        }}
                      >
                        <ListItemText primary={group.title} />
                        {group.openGrouper === myProfile.userPro && (
                          <Fab
                            color="success"
                            sx={{ mr: 2, width: '100px' }}
                            variant="extended"
                            size="small"
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              handleGroupMemberAddOpen(group);
                            }}
                          >
                            <PersonAddIcon />
                          </Fab>
                        )}
                        {group.openGrouper === myProfile.userPro && (
                          <Fab
                            color="error"
                            variant="extended"
                            size="small"
                            sx={{ width: '100px' }}
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              groupDelete(group.id);
                            }}
                          >
                            <DeleteIcon />
                          </Fab>
                        )}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
            </List>
          </Paper>
        )}
      </Container>
    </>
  );
});

export default AllChatGroup;
