import { BrowserRouter, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

import "./App.scss";
import SwitchRoute from "routes/SwitchRouter";
import { useAppDispatch } from "redux/hooks";
import { checkTokenEXP } from "util/helpers";

function App() {
  return (
    <BrowserRouter>
      <SwitchRoute />
    </BrowserRouter>
  );
}

export default App;
