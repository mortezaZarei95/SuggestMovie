import { Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";

import WithRedirect from "HOC/withRedirect";
import routeList from "./routeList";
import Loading from "components/common/Loading";
import WithPopUp from "HOC/WithPopUp";
import WithAlert from "HOC/WithAlert";
import { useAppDispatch } from "redux/hooks";
import { checkTokenEXP } from "util/helpers";

function SwitchRouter() {

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {routeList.map((item) => (
          <Route key={item.path} path={item.path} element={item.element}>
            {!!item.subRoute &&
              item.subRoute.map((subItem) => (
                <Route
                  key={subItem.path}
                  path={subItem.path}
                  element={subItem.element}
                >
                  {!!subItem.subRoute &&
                    subItem.subRoute.map((endItem) => (
                      <Route
                        key={endItem.path}
                        path={endItem.path}
                        element={endItem.element}
                      />
                    ))}
                </Route>
              ))}
          </Route>
        ))}
      </Routes>
    </Suspense>
  );
}

export default WithRedirect(WithPopUp(WithAlert(SwitchRouter)));
