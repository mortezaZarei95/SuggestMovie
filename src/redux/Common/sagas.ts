import { put } from "redux-saga/effects";

import { setLoading } from "./slice";

// import axios from "../../axiosInstance";

export function* fetchCommonSaga() {
  yield put(setLoading(true));
  try {
    // const response = yield axios.get(`/v2/someURL/`);
  } catch (err) {
    console.error("sagaERR fetchCommonSaga", err);
  } finally {
    yield put(setLoading(false));
  }
}
