import { takeEvery } from "redux-saga/effects";
import * as sagas from "./sagas";
import {
  deleteMovie,
  getCurrentMovie,
  getMovieList,
  editMovie,
  addMovie,
} from "./slice";

export default function* commonSagaWatcher() {
  yield takeEvery(getMovieList.type, sagas.fetchMovieListSaga);
  yield takeEvery(getCurrentMovie.type, sagas.fetchMovieSaga);
  yield takeEvery(deleteMovie.type, sagas.deleteMovieSaga);
  yield takeEvery(editMovie.type, sagas.editMovieSaga);
  yield takeEvery(addMovie.type, sagas.addMovieSaga);
}
