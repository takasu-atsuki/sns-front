import React, { memo, useEffect } from 'react';
import {
  Box,
  Typography,
  Modal,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { selectProfiles, getProfiles } from '../profile/profileSlice';
import { selectChoiceGroup, postGroupIn } from './chatSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const GroupMemberAdd = memo((props) => {
  const [cookies] = useCookies(['pass_token']);
  const { token } = cookies.pass_token;
  const { open, handleClose, myProfile, groupIn } = props;
  const dispatch = useDispatch();
  const profiles = useSelector(selectProfiles);
  const choiceGroup = useSelector(selectChoiceGroup);
  const profileFilter = profiles.filter((profile) => {
    return profile.userPro !== myProfile.userPro;
  });

  const userAdd = (id) => {
    const data = {
      groupId: choiceGroup.id,
      showUser: id,
      token,
    };
    dispatch(postGroupIn(data));
  };

  useEffect(() => {
    (async () => {
      dispatch(getProfiles(token));
    })();
  }, [dispatch, token]);

  const filterGroupIn = groupIn.filter((group) => {
    return group.targetGroup === choiceGroup.id;
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          {profileFilter.length > 0 &&
            profileFilter.map((profile) => {
              return (
                <ListItem alignItems="flex-start" key={profile.id}>
                  <ListItemButton
                    onClick={() => userAdd(profile.userPro)}
                    disabled={
                      filterGroupIn.filter((group) => {
                        return group.showUser === profile.userPro;
                      })[0]
                        ? true
                        : false
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={
                          profile.nickName ? profile.nickName : 'NO NICKNAME'
                        }
                        src={profile.image}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={profile.nickName}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {profile.createdAt}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
        </List>
      </Box>
    </Modal>
  );
});

export default GroupMemberAdd;
