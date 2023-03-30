import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Paper, Box, Typography } from '@mui/material';
import {
  selectMailList,
  selectProfiles,
  getProfiles,
  getMail,
} from './profileSlice';

const MailList = memo(() => {
  const [cookies] = useCookies(['pass_token']);
  const { token } = cookies.pass_token;
  const dispatch = useDispatch();
  const mailList = useSelector(selectMailList);
  const profiles = useSelector(selectProfiles);

  useEffect(() => {
    dispatch(getProfiles(token));
    dispatch(getMail(token));
  }, [dispatch, token]);

  return (
    <Paper elevation={3} sx={{ padding: 3, mb: 3 }}>
      <Box sx={{ maxHeight: '200px' }}>
        <Typography variant="h6" align="center">
          DM BOX
        </Typography>
        <Box
          sx={{
            overflowY: 'scroll',
            height: '150px',
          }}
        >
          {mailList.length > 0 ? (
            mailList.map((m) => {
              return (
                <Box key={m.id}>
                  <Typography variant="p" sx={{ fontSize: '12px' }}>
                    {m.created_at} :{' '}
                    {profiles.length > 0 &&
                      profiles.filter(
                        (profile) =>
                          profile.userPro === m.sendUser ||
                          profile.userPro === m.getUser
                      )[0].nickName}
                  </Typography>
                  <br />
                  <Typography
                    variant="p"
                    sx={{ fontWeight: '600' }}
                    align="left"
                  >
                    {m.message}
                  </Typography>
                  <hr />
                </Box>
              );
            })
          ) : (
            <h3>受信・送信なし</h3>
          )}
        </Box>
      </Box>
    </Paper>
  );
});

export default MailList;
