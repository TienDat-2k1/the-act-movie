import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getUserData } from '../../utils/firebase';
import { History, User } from '../../utils/types';

const initialState = {
  isLogged: false as boolean,
  user: {
    bookmarks: [] as { id: number; type: 'tv' | 'movie' }[],
    history: [] as History[],
  } as User,
  error: undefined,
};

export const getData = createAsyncThunk(
  'user/getBookmark',
  async (uid: string) => {
    const userData = await getUserData(uid);
    // console.log(userData);
    // if (!userData) {
    //   return [] as Bookmark[];
    // }

    // return userData.bookmarks;
    return userData;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInSuccess: (state, action: PayloadAction<Omit<User, 'createdAt'>>) => {
      const { displayName, email, photoURL, uid, bookmarks, history } =
        action.payload;
      state.error = undefined;
      state.isLogged = true;
      state.user.displayName = displayName;
      state.user.email = email;
      state.user.photoURL = photoURL;
      state.user.uid = uid;
      state.user.bookmarks = bookmarks;
      state.user.history = history;
    },
    signInError: (state, action) => {
      state.isLogged = false;
      state.error = action.payload;
    },
    logOut: state => {
      state.isLogged = false;
      state.user = {} as User;
      state.error = undefined;

      toast.success('Logout successful');
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getData.fulfilled,
      (state, action: PayloadAction<User | undefined>) => {
        if (!action.payload) return;
        const { bookmarks, history } = action.payload;
        state.user.bookmarks = bookmarks;
        state.user.history = history;
      }
    );
  },
});

export const { signInSuccess, signInError, logOut } = userSlice.actions;

export default userSlice.reducer;
