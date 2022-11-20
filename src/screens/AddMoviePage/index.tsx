import { useAppDispatch, useAppSelector } from "redux/hooks";
import { IFormValues } from "types/types";
import MovieForm from "components/common/MovieForm";
import { logoutUser, setEmail } from "redux/Auth/slice";
import { addMovie } from "redux/Movie/slice";
import { Fragment } from "react";

const AddMoviePage = () => {
  const emailStore = useAppSelector((state) => state.Auth.email);
  const dispatch = useAppDispatch();
  const submitForm = (data: IFormValues) => {
    if (!emailStore) {
      let email: string | null = localStorage.getItem("email");
      !!email ? dispatch(setEmail(email)) : dispatch(logoutUser());
    }
    dispatch(addMovie({ ...data, creator: emailStore }));
  };

  return (
    <Fragment>
      <h3>Add Movie</h3>
      <MovieForm onSubmit={submitForm} />
    </Fragment>
  );
};
export default AddMoviePage;
