import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "types/types";

type TinitState = {
  movieList: IMovie[];
  filteredList: IMovie[];
  searchedText: string;
  currentMovie: IMovie | null;
};

const initialState: TinitState = {
  movieList: [],
  filteredList: [],
  searchedText: "",
  currentMovie: null,
};
const commonSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    getMovieList: () => {},
    setMovieList: (state, action: PayloadAction<IMovie[]>) => {
      state.movieList = action.payload;
      state.filteredList = action.payload;
    },
    setFilteredMovieList: (state, action: PayloadAction<IMovie[]>) => {
      state.filteredList = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchedText = action.payload;
    },
    getCurrentMovie: (state, action: PayloadAction<string | undefined>) => {},
    setCurrentMovie: (state, action: PayloadAction<IMovie | null>) => {
      state.currentMovie = action.payload;
    },
    editMovie: (state, action: PayloadAction<IMovie>) => {},
    addMovie: (state, action: PayloadAction<IMovie>) => {},
    deleteMovie: (state, action: PayloadAction<string | undefined>) => {},
  },
});
export const {
  getMovieList,
  setMovieList,
  setSearchText,
  setFilteredMovieList,
  getCurrentMovie,
  setCurrentMovie,
  deleteMovie,
  editMovie,
  addMovie,
} = commonSlice.actions;

export default commonSlice.reducer;
