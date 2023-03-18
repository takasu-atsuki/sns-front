import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';
import profileReducer from '../features/profile/profileSlice';
import allUserReducer from '../features/alluser/allUserSlice';
import chatReducer from '../features/chat/chatSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    profile: profileReducer,
    allUser: allUserReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
