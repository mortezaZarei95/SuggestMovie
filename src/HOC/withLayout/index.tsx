import React, { ComponentType } from "react";

import Loading from "components/common/Loading";
import { useAppSelector } from "redux/hooks";
import Header from "components/layout/Header";
import classes from "./withLayout.module.scss";

export default function withLayout<T>(WrappedComponent: ComponentType<T>) {
  const Component = (props: T) => {
    return (
      <section className={classes.wrapper}>
        <Header />
        <WrappedComponent {...props} />
      </section>
    );
  };
  return Component;
}
