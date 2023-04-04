import React, { memo, useState } from 'react';
import {
  AppBar,
  Badge,
  Toolbar,
  Typography,
  Button,
  List,
  ListItem,
  MenuItem,
  Menu,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useSelector, useDispatch } from 'react-redux';
import { selectGroupIns } from '../features/chat/chatSlice';
import {
  selectFriendList,
  selectMyProfile,
} from '../features/profile/profileSlice';
import { toggleLogin, selectIsLoginView } from '../features/login/loginSlice';
import styles from './Header.module.css';

const Header = memo((props) => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(['pass_token']);
  const dispatch = useDispatch();
  const myProfile = useSelector(selectMyProfile);
  const groupIns = useSelector(selectGroupIns);
  const friendList = useSelector(selectFriendList);
  const isLoginView = useSelector(selectIsLoginView);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open2 = Boolean(anchorEl2);
  const handleClickOpen = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClickClose = () => {
    setAnchorEl2(null);
  };

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickLogout = () => {
    navigate('/');
    removeCookie('pass_token');
  };

  const clickChange = () => {
    dispatch(toggleLogin());
  };

  const groupRequestCount = groupIns.filter((groupIn) => {
    return groupIn.showUser === myProfile.userPro && groupIn.approved === false;
  }).length;

  const friendRequestCount = friendList.filter((friend) => {
    return friend.askTo === myProfile.userPro && friend.approved === false;
  }).length;

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          SNS
        </Typography>
        {cookies.pass_token !== undefined && (
          <>
            <nav>
              <div>
                <Button
                  id="basic-button"
                  aria-controls={open2 ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open2 ? 'true' : undefined}
                  onClick={handleClickOpen}
                  color="success"
                >
                  Menu
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl2}
                  open={open2}
                  onClose={handleClickClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      setAnchorEl2(null);
                      navigate('/profile');
                    }}
                  >
                    PROFILE
                  </MenuItem>
                  <hr />
                  <MenuItem
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      setAnchorEl2(null);
                      navigate('/all_user');
                    }}
                  >
                    ALL USER
                  </MenuItem>
                  <hr />
                  <MenuItem
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      setAnchorEl2(null);
                      navigate('/all_chat');
                    }}
                  >
                    CHAT
                  </MenuItem>
                </Menu>
              </div>
            </nav>
            <div>
              <List component="nav" aria-label="Device settings">
                <ListItem
                  id="lock-button"
                  aria-haspopup="listbox"
                  aria-controls="lock-menu"
                  aria-label="when device is locked"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClickListItem}
                >
                  <Badge
                    badgeContent={friendRequestCount + groupRequestCount}
                    color="success"
                  >
                    <NotificationsIcon
                      color="action"
                      sx={{ cursor: 'pointer' }}
                    />
                  </Badge>
                </ListItem>
              </List>
              <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'lock-button',
                  role: 'listbox',
                }}
              >
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    navigate('/approvefrq');
                  }}
                  sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Typography>APPROVE FRIEND</Typography>
                  {friendRequestCount !== 0 && (
                    <div className={styles.countBack}>{friendRequestCount}</div>
                  )}
                </MenuItem>
                <hr />
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    navigate('/approveGrq');
                  }}
                  sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Typography>APPROVE GROUP</Typography>
                  {groupRequestCount !== 0 && (
                    <div className={styles.countBack}>{groupRequestCount}</div>
                  )}
                </MenuItem>
              </Menu>
            </div>
            <Button
              href="/"
              sx={{ my: 1, mx: 1.5 }}
              onClick={onClickLogout}
              color="success"
            >
              <LogoutIcon />
            </Button>
          </>
        )}
        {cookies.pass_token === undefined && (
          <>
            {isLoginView && (
              <Button
                onClick={clickChange}
                variant="contained"
                color="success"
                sx={{ my: 1, mx: 1.5 }}
              >
                Login
              </Button>
            )}
            {!isLoginView && (
              <Button
                onClick={clickChange}
                variant="contained"
                color="success"
                sx={{ my: 1, mx: 1.5 }}
              >
                Register
              </Button>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
});

export default Header;
