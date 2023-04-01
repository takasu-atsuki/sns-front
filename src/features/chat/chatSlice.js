import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postGroup = createAsyncThunk(
  'group/post',
  async (data, { rejectWithValue }) => {
    const uploadData = new FormData();
    uploadData.append('title', data.title);
    try {
      const res = await axios.post(
        process.env.REACT_APP_GROUP_URL,
        uploadData,
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

export const deleteGroup = createAsyncThunk(
  'group/delete',
  async (data, { rejectWithValue }) => {
    try {
      await axios.delete(`${process.env.REACT_APP_GROUP_URL}${data.id}/`, {
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

export const postGroupIn = createAsyncThunk(
  'groupIn/post',
  async (data, { rejectWithValue }) => {
    const uploadData = new FormData();
    uploadData.append('targetGroup', data.groupId);
    uploadData.append('showUser', data.showUser);
    try {
      const res = await axios.post(
        process.env.REACT_APP_GROUPIN_URL,
        uploadData,
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

export const getGroup = createAsyncThunk(
  'group/get',
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(process.env.REACT_APP_GROUP_URL, {
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

export const getGroupIn = createAsyncThunk(
  'groupIn/get',
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(process.env.REACT_APP_GROUPIN_URL, {
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

export const getChat = createAsyncThunk(
  'chat/get',
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(process.env.REACT_APP_CHAT_URL, {
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

export const postChat = createAsyncThunk(
  'chat/post',
  async (data, { rejectWithValue }) => {
    const uploadData = new FormData();
    uploadData.append('group', data.groupId);
    uploadData.append('message', data.message);
    try {
      const res = await axios.post(process.env.REACT_APP_CHAT_URL, uploadData, {
        headers: {
          Authorization: `Token ${data.token}`,
          'Content-Type': 'application/json',
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteChat = createAsyncThunk(
  'chat/delete',
  async (data, { rejectWithValue }) => {
    try {
      await axios.delete(`${process.env.REACT_APP_CHAT_URL}${data.id}/`, {
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

export const groupInUpdateGroupUp = createAsyncThunk(
  'group/patch',
  async (data, { rejectWithValue }) => {
    const updateData = { approved: true };
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_GROUPIN_URL}${data.groupIn.id}/`,
        updateData,
        {
          headers: {
            Authorization: `Token ${data.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const newUserList = [];
      data.group.inUser.forEach((user) => {
        if (user === data.userId) {
          return;
        }
        newUserList.push(user);
      });
      newUserList.push(data.userId);

      const groupUpdateData = {};
      groupUpdateData.title = data.group.title;
      groupUpdateData.inUser = newUserList;

      await axios.patch(
        `${process.env.REACT_APP_GROUP_URL}${data.group.id}/`,
        groupUpdateData,
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
  groups: [],
  groupIns: [],
  chats: [],
  chatLoading: false,
  choiceGroup: {
    id: 0,
    title: '',
    openGrouper: 0,
    inUser: [],
    createdAt: '',
    updatedAt: '',
  },
  currentAddUserList: [],
  groupChatLoading: false,
  errMessage: {},
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatLoading: (state) => {
      state.chatLoading = true;
    },
    resetChatLoading: (state) => {
      state.chatLoading = false;
    },
    setSelectChoiceGroup: (state, action) => {
      state.choiceGroup = action.payload;
    },
    resetSelectChoiceGroup: (state) => {
      state.choiceGroup = {
        id: 0,
        title: '',
        openGrouper: 0,
        inUser: [],
        createdAt: '',
        updatedAt: '',
      };
    },
    setCurrentAddUserList: (state, action) => {
      if (state.currentAddUserList.includes(action.payload)) {
        state.currentAddUserList = state.currentAddUserList.filter((user) => {
          return user !== action.payload;
        });
      } else {
        state.currentAddUserList = [
          ...state.currentAddUserList,
          action.payload,
        ];
      }
    },
    resetCurrentAddUserList: (state) => {
      state.currentAddUserList = [];
    },
    setGroupChatLoading: (state) => {
      state.groupChatLoading = false;
    },
    resetGroupChatLoaading: (state) => {
      state.groupChatLoading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postGroup.fulfilled, (state, action) => {
      state.groups = [...state.groups, action.payload];
    });
    builder.addCase(postGroup.rejected, (state, action) => {
      state.errMessage = action.payload;
    });
    builder.addCase(deleteGroup.fulfilled, (state, action) => {
      state.groups = state.groups.filter((group) => {
        return group.id !== action.payload;
      });
    });
    builder.addCase(deleteGroup.rejected, (state, action) => {
      state.errMessage = action.payload;
    });
    builder.addCase(postGroupIn.fulfilled, (state, action) => {
      state.groupIns = [...state.groupIns, action.payload];
    });
    builder.addCase(postGroupIn.rejected, (state, action) => {
      state.errMessage = action.payload;
    });
    builder.addCase(getChat.fulfilled, (state, action) => {
      state.chats = action.payload;
    });
    builder.addCase(getChat.rejected, (state, action) => {
      state.errMessage = action.payload;
    });
    builder.addCase(getGroup.fulfilled, (state, action) => {
      state.groups = action.payload;
    });
    builder.addCase(getGroup.rejected, (state, action) => {
      state.errMessage = action.payload;
    });
    builder.addCase(getGroupIn.fulfilled, (state, action) => {
      state.groupIns = action.payload;
    });
    builder.addCase(getGroupIn.rejected, (state, action) => {
      state.errMessage = action.payload;
    });
    builder.addCase(postChat.fulfilled, (state, action) => {
      state.chats = [...state.chats, action.payload];
    });
    builder.addCase(postChat.rejected, (state, action) => {
      state.errMessage = action.payload;
    });
    builder.addCase(deleteChat.fulfilled, (state, action) => {
      state.chats = state.chats.filter((chat) => {
        return chat.id !== action.payload;
      });
    });
    builder.addCase(deleteChat.rejected, (state, action) => {
      state.errMessage = action.payload;
    });
    builder.addCase(groupInUpdateGroupUp.fulfilled, (state, action) => {
      state.groupIns = state.groupIns.map((groupIn) => {
        return groupIn.id === action.payload.id ? action.payload : groupIn;
      });
    });
    builder.addCase(groupInUpdateGroupUp.rejected, (state, action) => {
      state.errMessage = action.payload;
    });
  },
});

export const {
  setChatLoading,
  resetChatLoading,
  setSelectChoiceGroup,
  resetSelectChoiceGroup,
  setCurrentAddUserList,
  resetCurrentAddUserList,
  setGroupChatLoading,
  resetGroupChatLoaading,
} = chatSlice.actions;

export const selectGroups = (state) => state.chat.groups;
export const selectGroupIns = (state) => state.chat.groupIns;
export const selectChats = (state) => state.chat.chats;
export const selectChatLoading = (state) => state.chat.chatLoading;
export const selectChoiceGroup = (state) => state.chat.choiceGroup;
export const selectGroupChatLoading = (state) => state.chat.groupChatLoading;
export const selectChatErrMessage = (state) => state.chat.errMessage;

export default chatSlice.reducer;
