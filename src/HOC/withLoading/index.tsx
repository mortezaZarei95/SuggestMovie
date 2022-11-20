import React, { ComponentType } from "react";

import Loading from "components/common/Loading";
import { useAppSelector } from "redux/hooks";

export default function WithLoading<T>(WrappedComponent: ComponentType<T>) {
  const Component = (props: T) => {
    const isLoading = useAppSelector((state) => state.Common.loading);

    return (
      <React.Fragment>
        {isLoading && <Loading />}
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };
  return Component;
}
