import { Fragment } from "react";

import LoginForm from "components/screens/AuthPages/LoginForm";
import { useAppDispatch } from "redux/hooks";
import { loginUser } from "redux/Auth/slice";
import { IUserLoginForm } from "types/types";

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const onLoginUser = (data: IUserLoginForm) => {
    dispatch(loginUser(data));
  };
  return (
    <Fragment>
      <LoginForm onSubmit={onLoginUser} />
    </Fragment>
  );
};
export default LoginPage;
