import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectErrMessage } from '../features/profile/profileSlice';
import { selectAllUserErrMessage } from '../features/alluser/allUserSlice';
import { selectChatErrMessage } from '../features/chat/chatSlice';
import { selectLoginErr } from '../features/login/loginSlice';

const ThrowingError = memo((props) => {
  const profileError = useSelector(selectErrMessage);
  const allUserError = useSelector(selectAllUserErrMessage);
  const chatError = useSelector(selectChatErrMessage);
  const loginError = useSelector(selectLoginErr);

  const { children } = props;
  if (
    profileError.code ||
    allUserError.code ||
    chatError.code ||
    loginError.code
  ) {
    throw Error('');
  } else {
    return <>{children}</>;
  }
});

export default ThrowingError;
