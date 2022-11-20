import { Fragment } from "react";

import RegisterForm from "components/screens/AuthPages/RegisterForm";
import { useAppDispatch } from "redux/hooks";
import { registerUser } from "redux/Auth/slice";
import { IUserRegisterForm } from "types/types";

const RegisterPage = () => {
  const dispatch = useAppDispatch();

  const onRegisterUser = (data: IUserRegisterForm) => {
    dispatch(registerUser(data));
  };
  return (
    <Fragment>
      <RegisterForm onSubmit={onRegisterUser} />
    </Fragment>
  );
};
export default RegisterPage;
