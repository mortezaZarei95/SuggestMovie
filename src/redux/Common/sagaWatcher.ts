import { takeEvery } from "redux-saga/effects";
import * as sagas from "./sagas";

export default function* commonSagaWatcher() {
  yield takeEvery("common/getData", sagas.fetchCommonSaga);
}
