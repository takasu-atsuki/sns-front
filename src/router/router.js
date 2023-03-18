import { createBrowserRouter } from 'react-router-dom';
import Login from '../features/login/Login';
import AllUser from '../features/alluser/AllUser';
import AllChatGroup from '../features/chat/AllChatGroup';
import Chat from '../features/chat/Chat';
import Profile from '../features/profile/Profile';
import Diary from '../features/diary/Diary';
import Core from '../components/Core';
import FriendRequest from '../features/profile/FriendRequest';
import GroupRequest from '../features/profile/GroupRequest';
import EditProfile from '../features/profile/EditProfile';
import ErrorPage from '../components/ErrorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Core>
        <Login />
      </Core>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: 'all_user',
    element: (
      <Core>
        <AllUser />
      </Core>
    ),
  },
  {
    path: 'all_chat',
    element: (
      <Core>
        <AllChatGroup />
      </Core>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: 'all_chat/chat',
    element: <Chat />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'profile',
    element: (
      <Core>
        <Profile />
      </Core>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: 'diary',
    element: (
      <Core>
        <Diary />
      </Core>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: 'approvefrq',
    element: (
      <Core>
        <FriendRequest />
      </Core>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: 'approveGrq',
    element: (
      <Core>
        <GroupRequest />
      </Core>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: 'editProf',
    element: (
      <Core>
        <EditProfile />
      </Core>
    ),
    errorElement: <ErrorPage />,
  },
]);
