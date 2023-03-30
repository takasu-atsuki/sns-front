import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../utils/axiosCustom';

export const getMyProf = createAsyncThunk(
  'profile/getMyProf',
  async (token, { rejectWithValue }) => {
    try {
      const res = await client.get(process.env.REACT_APP_MYPROF_URL, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getProfiles = createAsyncThunk(
  'profile/getProfiles',
  async (token, { rejectWithValue }) => {
    try {
      const res = await client.get(process.env.REACT_APP_PROFILE_URL, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getMyFriend = createAsyncThunk(
  'profile/getMyFriend',
  async (token, { rejectWithValue }) => {
    try {
      const res = await client.get(process.env.REACT_APP_APPROVAL_URL, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getMail = createAsyncThunk(
  'profile/getMail',
  async (token, { rejectWithValue }) => {
    try {
      const res = await client.get(process.env.REACT_APP_DMAIL_URL, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getMyDiary = createAsyncThunk(
  'profile/myDiary',
  async (token, { rejectWithValue }) => {
    try {
      const res = await client.get(process.env.REACT_APP_MYDIARY_URL, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const postDiary = createAsyncThunk(
  'profile/postDiary',
  async (data, { rejectWithValue }) => {
    const updateDiary = new FormData();
    updateDiary.append('message', data.diary.message);
    data.diary.image.name &&
      updateDiary.append('image', data.diary.image, data.diary.image.name);
    try {
      const res = await client.post(
        process.env.REACT_APP_DIARY_URL,
        updateDiary,
        {
          headers: {
            Authorization: `Token ${data.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const postMyProf = createAsyncThunk(
  'profile/postProf',
  async (data, { rejectWithValue }) => {
    const updateProf = new FormData();
    updateProf.append('nickName', data.prof.nickName);
    data.prof.image.name &&
      updateProf.append('image', data.prof.image, data.prof.image.name);
    try {
      const res = await client.post(
        process.env.REACT_APP_PROFILE_URL,
        updateProf,
        {
          headers: {
            Authorization: `Token ${data.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateProf = createAsyncThunk(
  'profile/updateMyProf',
  async (data, { rejectWithValue }) => {
    const updateProf = new FormData();
    updateProf.append('nickName', data.prof.nickName);
    data.prof.image.name &&
      updateProf.append('image', data.prof.image, data.prof.image.name);
    try {
      const res = await client.put(
        `${process.env.REACT_APP_PROFILE_URL}${data.id}/`,
        updateProf,
        {
          headers: {
            Authorization: `Token ${data.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateDiary = createAsyncThunk(
  'profile/updateDiary',
  async (data, { rejectWithValue }) => {
    const updateDiary = new FormData();
    updateDiary.append('message', data.diary.message);
    data.diary.image.name &&
      updateDiary.append('image', data.diary.image, data.diary.image.name);
    try {
      const res = await client.put(
        `${process.env.REACT_APP_DIARY_URL}${data.id}/`,
        updateDiary,
        {
          headers: {
            Authorization: `Token ${data.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteProf = createAsyncThunk(
  'profile/deleteMyProf',
  async (data, { rejectWithValue }) => {
    try {
      await client.delete(`${process.env.REACT_APP_PROFILE_URL}${data.id}/`, {
        headers: {
          Authorization: `Token ${data.token}`,
        },
      });
      return data.id;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteDiary = createAsyncThunk(
  'profile/deleteDiary',
  async (data, { rejectWithValue }) => {
    try {
      await client.delete(`${process.env.REACT_APP_DIARY_URL}${data.id}/`, {
        headers: {
          Authorization: `Token ${data.token}`,
        },
      });
      return data.id;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const postFriend = createAsyncThunk(
  'approved/post',
  async (data, { rejectWithValue }) => {
    const postData = new FormData();
    postData.append('askTo', data.id);
    try {
      const res = await client.post(
        process.env.REACT_APP_APPROVAL_URL,
        postData,
        {
          headers: {
            Authorization: `Token ${data.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateFriendReq = createAsyncThunk(
  'friend/patch',
  async (data, { rejectWithValue }) => {
    const uploadData = { approved: true };
    try {
      const res = await client.patch(
        `${process.env.REACT_APP_APPROVAL_URL}${data.request.id}/`,
        uploadData,
        {
          headers: {
            Authorization: `Token ${data.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const newData = { askTo: data.request.askFrom, approved: true };

      const patchData = { approved: true };

      const friendFilter = data.friendList.filter((friend) => {
        return (
          friend.askTo === data.request.askFrom &&
          friend.askFrom === data.myProfile.userPro
        );
      });

      if (!friendFilter[0]) {
        await client.post(process.env.REACT_APP_APPROVAL_URL, newData, {
          headers: {
            Authorization: `Token ${data.token}`,
            'Content-Type': 'application/json',
          },
        });
      } else {
        await client.patch(
          `${process.env.REACT_APP_APPROVAL_URL}${friendFilter[0].id}/`,
          patchData,
          {
            headers: {
              Authorization: `Token ${data.token}`,
              'Content-Type': 'application/json',
            },
          }
        );
      }

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const postDmail = createAsyncThunk(
  'mail/post',
  async (data, { rejectWithValue }) => {
    const updateData = { getUser: data.getUser, message: data.message };
    try {
      const res = await client.post(
        process.env.REACT_APP_DMAIL_URL,
        updateData,
        {
          headers: {
            Authorization: `Token ${data.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  myProfile: {},
  profiles: [],
  friendList: [],
  mailList: [],
  mydiary: [],
  editedProfile: {
    nickName: '',
    image: {},
  },
  editedDiary: {
    id: 0,
    image: {},
    message: '',
  },
  isLoading: false,
  errMessage: {},
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileNickName: (state, action) => {
      state.editedProfile.nickName = action.payload;
    },
    setProfileImage: (state, action) => {
      state.editedProfile.image = action.payload;
    },
    setDiaryImage: (state, action) => {
      state.editedDiary.image = action.payload;
    },
    setDiaryMessage: (state, action) => {
      state.editedDiary.message = action.payload;
    },
    setEditedDiary: (state, action) => {
      state.editedDiary = action.payload;
    },
    resetEditedDiary: (state) => {
      state.editedDiary = { id: 0, image: {}, message: '' };
    },
    resetEditProfile: (state) => {
      state.editedProfile = { nickName: '', image: {} };
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
    resetLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyProf.fulfilled, (state, action) => {
      state.myprofileLoading = false;
      state.myProfile = action.payload[0];
    });
    builder.addCase(getMyProf.rejected, (state, action) => {
      state.errMessage = action.payload;
    });

    builder.addCase(getProfiles.fulfilled, (state, action) => {
      state.profilesLoading = false;
      state.profiles = action.payload;
    });

    builder.addCase(getProfiles.rejected, (state, action) => {
      state.errMessage = action.payload;
    });

    builder.addCase(getMyFriend.fulfilled, (state, action) => {
      state.friendListLoading = false;
      state.friendList = action.payload;
    });

    builder.addCase(getMyFriend.rejected, (state, action) => {
      state.errMessage = action.payload;
    });

    builder.addCase(getMail.fulfilled, (state, action) => {
      state.mailListLoading = false;
      state.mailList = action.payload;
    });

    builder.addCase(getMail.rejected, (state, action) => {
      state.errMessage = action.payload;
    });

    builder.addCase(getMyDiary.fulfilled, (state, action) => {
      state.mydiaryLoading = false;
      state.mydiary = action.payload;
    });

    builder.addCase(getMyDiary.rejected, (state, action) => {
      state.errMessage = action.payload;
    });

    builder.addCase(postDiary.fulfilled, (state, action) => {
      state.mydiary = [...state.mydiary, action.payload];
    });

    builder.addCase(postDiary.rejected, (state, action) => {
      state.errMessage = action.payload;
    });

    builder.addCase(postMyProf.fulfilled, (state, action) => {
      state.myProfile = [action.payload];
    });

    builder.addCase(postMyProf.rejected, (state, action) => {
      state.errMessage = action.payload;
    });

    builder.addCase(updateProf.fulfilled, (state, action) => {
      state.myProfile = action.payload;
    });

    builder.addCase(updateProf.rejected, (state, action) => {
      state.errMessage = action.payload;
    });

    builder.addCase(updateDiary.fulfilled, (state, action) => {
      state.mydiary = state.mydiary.filter((diary) => {
        return diary.id === action.payload.id ? action.payload : diary;
      });
    });

    builder.addCase(updateDiary.rejected, (state, action) => {
      state.errMessage = action.payload;
    });

    builder.addCase(deleteProf.fulfilled, (state, action) => {
      state.myProfile = [];
      state.editedProfile = { nickName: '', image: {} };
    });

    builder.addCase(deleteProf.rejected, (state, action) => {
      state.errMessage = action.payload;
    });

    builder.addCase(deleteDiary.fulfilled, (state, action) => {
      state.mydiary = state.mydiary.filter((diary) => {
        return diary.id !== action.payload;
      });
    });
    builder.addCase(deleteDiary.rejected, (state, action) => {
      state.errMessage = action.payload;
    });

    builder.addCase(postFriend.fulfilled, (state, action) => {
      state.friendList = [...state.friendList, action.payload];
    });

    builder.addCase(postFriend.rejected, (state, action) => {
      state.errMessage = action.payload;
    });

    builder.addCase(updateFriendReq.fulfilled, (state, action) => {
      state.friendList = state.friendList.map((friend) => {
        return friend.id === action.payload.id ? action.payload : friend;
      });
    });

    builder.addCase(updateFriendReq.rejected, (state, action) => {
      state.errMessage = action.payload;
    });

    builder.addCase(postDmail.fulfilled, (state, action) => {
      state.mailList = [...state.mailList, action.payload];
    });

    builder.addCase(postDmail.rejected, (state, action) => {
      state.errMessge = action.payload;
    });
  },
});

export const {
  setProfileNickName,
  setProfileImage,
  setDiaryImage,
  setDiaryMessage,
  setEditedDiary,
  resetEditedDiary,
  resetEditProfile,
  setSelectUserId,
  resetSelectUserId,
  setLoading,
  resetLoading,
} = profileSlice.actions;

export const selectMyProfile = (state) => state.profile.myProfile;
export const selectProfiles = (state) => state.profile.profiles;
export const selectFriendList = (state) => state.profile.friendList;
export const selectMailList = (state) => state.profile.mailList;
export const selectMyDiary = (state) => state.profile.mydiary;
export const selectEditedProfile = (state) => state.profile.editedProfile;
export const selectEditedDiary = (state) => state.profile.editedDiary;
export const selectIsLoading = (state) => state.profile.isLoading;

export const selectErrMessage = (state) => state.profile.errMessage;

export default profileSlice.reducer;
