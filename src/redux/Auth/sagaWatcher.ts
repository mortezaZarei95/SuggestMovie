import { takeEvery } from "redux-saga/effects";
import * as sagas from "./sagas";
import * as actions from "./slice";

export default function* commonSagaWatcher() {
  yield takeEvery(actions.registerUser.type, sagas.registerSaga);
  yield takeEvery(actions.loginUser.type, sagas.loginSaga);
  yield takeEvery(actions.logoutUser.type, sagas.logoutSaga);
}
