import { put } from "redux-saga/effects";

import { setAlert, setLoading, setRedirect } from "../Common/slice";

import axios from "../../axiosInstance";
import { PayloadAction } from "@reduxjs/toolkit";
import { IUserLoginForm } from "types/types";
import { logoutUser, setEmail } from "./slice";
import jwt from "jwt-decode";

export function* registerSaga(
  action: PayloadAction<IUserLoginForm>
): Generator {
  yield put(setLoading(true));
  try {
    const result: any = yield axios.post("/auth/register", {
      email: action.payload.email,
      password: action.payload.password,
    });
    console.log(result, result.data.access_token, "result");

    yield put(setEmail(action.payload.email));

    let userData: any = jwt(result.data.access_token);

    yield localStorage.setItem("email", userData.email.toString());
    yield localStorage.setItem("Mtoken", result.data.access_token);
    yield localStorage.setItem("exp", userData.exp);

    yield put(
      setAlert({
        state: true,
        text: "Welcome to my Movie App :)",
        color: "success",
      })
    );
    yield put(setRedirect({ state: true, url: "/" }));
  } catch (err) {
    console.error("sagaERR registerSaga", err);
    yield put(
      setAlert({
        state: true,
        text: "Something Wrong!",
        color: "danger",
      })
    );
  } finally {
    yield put(setLoading(false));
  }
}

export function* loginSaga(action: PayloadAction<IUserLoginForm>): Generator {
  yield put(setLoading(true));
  try {
    const result: any = yield axios.post("/auth/login", {
      email: action.payload.email,
      password: action.payload.password,
    });
    console.log(result, result.data.access_token, "result");

    yield put(setEmail(action.payload.email));
    let userData: any = jwt(result.data.access_token);

    yield localStorage.setItem("email", userData.email.toString());
    yield localStorage.setItem("Mtoken", result.data.access_token);
    yield localStorage.setItem("exp", userData.exp);

    yield put(
      setAlert({
        state: true,
        text: "Welcome to my Movie App :)",
        color: "success",
      })
    );
    yield put(setRedirect({ state: true, url: "/" }));
  } catch (err) {
    console.error("sagaERR registerSaga", err);
    yield put(
      setAlert({
        state: true,
        text: "Something Wrong!",
        color: "danger",
      })
    );
  } finally {
    yield put(setLoading(false));
  }
}

export function* logoutSaga(): Generator {
  yield put(setLoading(true));
  try {
    yield localStorage.removeItem("email");
    yield localStorage.removeItem("Mtoken");
    yield put(setEmail(""));

    yield put(setRedirect({ state: true, url: "/login" }));
  } catch (err) {
    console.error("sagaERR logoutSaga", err);
    yield put(
      setAlert({
        state: true,
        text: "Something Wrong!",
        color: "danger",
      })
    );
  } finally {
    yield put(setLoading(false));
  }
}