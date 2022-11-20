import React, { ComponentType, Fragment, useEffect } from "react";

import Loading from "components/common/Loading";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import Header from "components/layout/Header";
import classes from "./withAlert.module.scss";
import { Alert } from "reactstrap";
import { setAlert, setShowAlert } from "redux/Common/slice";

export default function WithAlert<T>(WrappedComponent: ComponentType<T>) {
  const Component = (props: T) => {
    const { showAlert, messageAlert, colorAlert } = useAppSelector(
      (state) => state.Common
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
      showAlert &&
        setTimeout(() => {
          if (showAlert) {
            dispatch(setShowAlert(false));
            dispatch(setAlert({ state: false, text: "", color: undefined }));
          }
        }, 4000);
    }, [showAlert]);
    const closeAlert = () => {
      dispatch(setShowAlert(false));
      dispatch(setAlert({ state: false, text: "", color: undefined }));
    };

    return (
      <Fragment>
        <Alert
          className={classes.alert}
          color={colorAlert}
          toggle={closeAlert}
          isOpen={showAlert}
        >
          {messageAlert}
        </Alert>
        <WrappedComponent {...props} />
      </Fragment>
    );
  };
  return Component;
}
