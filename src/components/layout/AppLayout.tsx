import { Outlet } from "react-router-dom";

import Header from "./Header";
import classes from "./Layout.module.scss";

const AppLayout = () => {
  return (
    <div className={classes.layoutWrapper}>
      <Header />
      <Outlet />
    </div>
  );
};

export default AppLayout;
