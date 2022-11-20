import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import commonReducer from "./Common/slice";
import authReducer from "./Auth/slice";
import movieReducer from "./Movie/slice";

import commonSagaWatcher from "./Common/sagaWatcher";
import authSagaWatcher from "./Auth/sagaWatcher";
import movieSagaWatcher from "./Movie/sagaWatcher";

const rootReducer = {
  Common: commonReducer,
  Auth: authReducer,
  Movie: movieReducer,
};

  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
    devTools: process.env.NODE_ENV !== "production",
  });

  sagaMiddleware.run(commonSagaWatcher);
  sagaMiddleware.run(authSagaWatcher);
  sagaMiddleware.run(movieSagaWatcher);

export default store;

export type TStore = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;
