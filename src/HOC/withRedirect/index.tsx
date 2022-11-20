import React, { ComponentType } from "react";
import { useNavigate } from "react-router";

import { setRedirect } from "redux/Common/slice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export default function WithRedirect<T>(WrappedComponent: ComponentType<T>) {
  const Component = (props: T) => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const redirectStateStore = useAppSelector(
      (state) => state.Common.redirectState
    );
    const redirectURLStore = useAppSelector(
      (state) => state.Common.redirectURL
    );

    React.useEffect(() => {
      if (redirectStateStore) {
        navigate(redirectURLStore);
        setTimeout(() => {
          dispatch(setRedirect({ state: false, url: "" }));
        }, 500);
      }
    }, [redirectStateStore, redirectURLStore]);
    return <WrappedComponent {...props} />;
  };
  return Component;
}
