import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getBannerMovieInfo,
  getBannerTvInfo,
  getHomeMoviesData,
  getHomeTvData,
} from '../../services/homeServices';
import {
  HomeMovie,
  HomeTv,
  IDetailMovie,
  IDetailTv,
  Item,
} from '../../utils/types';

const initialState = {
  Movies: {} as HomeMovie,
  Tv: {} as HomeTv,
  MovieBanner: {} as IDetailMovie[],
  TvBanner: {} as IDetailTv[],
  isLoading: false as boolean,
  error: '',
};

export const getHomeMovie = createAsyncThunk(
  'home/getMovies',
  async (params, thunkAPI) => {
    return await getHomeMoviesData();
  }
);
export const getHomeTv = createAsyncThunk(
  'home/getTV',
  async (params, thunkAPI) => {
    return await getHomeTvData();
  }
);

export const getBanner = createAsyncThunk(
  'home/getBanner',
  async (banner: Item[], thunkAPI) => {
    return await getBannerMovieInfo(banner);
  }
);

export const getTvBanner = createAsyncThunk(
  'home/getTvBanner',
  async (banner: Item[], thunkAPI) => {
    return await getBannerTvInfo(banner);
  }
);

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getHomeMovie.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        getHomeMovie.fulfilled,
        (state, action: PayloadAction<HomeMovie>) => {
          state.isLoading = false;
          state.Movies = action.payload;
        }
      );
    builder
      .addCase(getHomeTv.pending, state => {
        state.isLoading = true;
      })
      .addCase(getHomeTv.fulfilled, (state, action: PayloadAction<HomeTv>) => {
        state.isLoading = false;
        state.Tv = action.payload;
      });
    builder.addCase(
      getBanner.fulfilled,
      (state, action: PayloadAction<IDetailMovie[]>) => {
        state.MovieBanner = action.payload;
      }
    );
    builder.addCase(
      getTvBanner.fulfilled,
      (state, action: PayloadAction<IDetailTv[]>) => {
        state.TvBanner = action.payload;
      }
    );
  },
});

export const {} = homeSlice.actions;

export default homeSlice.reducer;
