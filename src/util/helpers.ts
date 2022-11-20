import jwt from "jwt-decode";
import { logoutUser } from "redux/Auth/slice";
import { setAlert, setRedirect } from "redux/Common/slice";

export const getBase64 = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const isAuth = () => {
  return !!localStorage.getItem("Mtoken")?.length;
};

export const checkTokenEXP = async (token: string, dispatch: any) => {
  let userData: any = jwt(token);

  const milliSecondsToBeValid =
    new Date(userData.exp * 1000).getTime() - new Date().getTime();
  console.log(milliSecondsToBeValid, "milliSecondsToBeValid");
  await setTimeout(() => {
    console.error("timeout");

    dispatch(
      setAlert({
        state: true,
        text: "your token is expire!",
        color: "danger",
      })
    );

    dispatch(logoutUser());
    // await dispatch(setRedirect({ state: true, url: "/login" }));
  }, milliSecondsToBeValid);
};
