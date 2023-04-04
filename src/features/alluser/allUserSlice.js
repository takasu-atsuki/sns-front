import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllDiary = createAsyncThunk(
  'diary/all_get',
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(process.env.REACT_APP_DIARY_URL, {
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

export const updateLiked = createAsyncThunk(
  'diary/updateLike',
  async (data, { rejectWithValue }) => {
    const currentLiked = data.diary.liked;
    const obj = { liked: [] };
    const num_list = [];
    let overLap = false;
    currentLiked.forEach((current) => {
      if (current === data.new) {
        overLap = true;
      } else {
        num_list.push(current);
      }
    });
    if (!overLap) {
      num_list.push(data.new);
    } else if (currentLiked.length === 1) {
      const res = await axios.patch(
        `${process.env.REACT_APP_DIARY_URL}${data.diary.id}/`,
        obj,
        {
          headers: {
            AUthorization: `Token ${data.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return res.data;
    }
    try {
      obj.liked = num_list;
      const res = await axios.patch(
        `${process.env.REACT_APP_DIARY_URL}${data.diary.id}/`,
        obj,
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
  allDiary: [],
  selectUserAllDiary: [],
  selectUserId: 0,
  selectDmailUserId: 0,
  allDiaryLoading: false,
  errMessage: {},
  allUserLoading: false,
};

const allUserSlice = createSlice({
  name: 'allUser',
  initialState,
  reducers: {
    setSelectUserId: (state, action) => {
      state.selectUserId = action.payload;
    },
    resetSelectUserId: (state, action) => {
      state.selectUserId = 0;
    },
    setSelectDmailUserId: (state, action) => {
      state.selectDmailUserId = action.payload;
    },
    resetSelectDmailUserId: (state) => {
      state.selectDmailUserId = 0;
    },
    setSelectUserDiary: (state, action) => {
      if (action.payload !== 0) {
        state.selectUserAllDiary = state.allDiary.filter((diary) => {
          return diary.userId === action.payload;
        });
      }
    },
    setAllUserLoading: (state) => {
      state.allUserLoading = true;
    },
    resetAllUserLoading: (state) => {
      state.allUserLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllDiary.fulfilled, (state, action) => {
      state.allDiaryLoading = false;
      state.allDiary = action.payload;
    });
    builder.addCase(getAllDiary.rejected, (state, action) => {
      state.errMessage = action.payload;
    });
    builder.addCase(updateLiked.fulfilled, (state, action) => {
      if (state.selectUserAllDiary.length > 0) {
        state.selectUserAllDiary.map((diary) => {
          return diary.id === action.payload.id ? action.payload : diary;
        });
      } else {
        state.allDiary = state.allDiary.map((diary) => {
          return diary.id === action.payload.id ? action.payload : diary;
        });
      }
    });
    builder.addCase(updateLiked.rejected, (state, action) => {
      state.errMessage = action.payload;
    });
  },
});

export const {
  setSelectUserId,
  setSelectUserDiary,
  resetSelectUserId,
  setSelectDmailUserId,
  resetSelectDmailUserId,
  setAllUserLoading,
  resetAllUserLoading,
} = allUserSlice.actions;

export const selectAllDiary = (state) => state.allUser.allDiary;
export const selectSelectUserAllDiary = (state) =>
  state.allUser.selectUserAllDiary;
export const selectSelectUserId = (state) => state.allUser.selectUserId;
export const selectAllDiaryLoading = (state) => state.allUser.allDiaryLoading;
export const selectErrMessage = (state) => state.allUser.errMessage;
export const selectSelectDmailUserId = (state) =>
  state.allUser.selectDmailUserId;
export const selectAllUserLoading = (state) => state.allUser.allUserLoading;
export const selectAllUserErrMessage = (state) => state.allUser.errMessage;

export default allUserSlice.reducer;
