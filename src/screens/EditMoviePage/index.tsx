import { Fragment, useEffect } from "react";
import { useParams } from "react-router";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { editMovie, getCurrentMovie, setCurrentMovie } from "redux/Movie/slice";
import { setEmail } from "redux/Auth/slice";
import { IFormValues } from "types/types";
import MovieForm from "components/common/MovieForm";
import { setAlert } from "redux/Common/slice";

const EditMoviePage = () => {
  const currentMovie = useAppSelector((state) => state.Movie.currentMovie);

  const loading = useAppSelector((state) => state.Common.loading);
  const email = useAppSelector((state) => state.Auth.email);

  const params = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    (!currentMovie || currentMovie?.id.toString() !== params.id) &&
      !loading &&
      dispatch(getCurrentMovie(params.id));
    if (!email) {
      const localStorageEmail = localStorage.getItem("email");
      localStorageEmail && dispatch(setEmail(localStorageEmail));
    }
    // return () => {
    //   dispatch(setCurrentMovie(null));
    // };
  }, [params.id, currentMovie, dispatch, email, loading]);

  const submitForm = (data: IFormValues) => {
    if (
      currentMovie?.name !== data.name ||
      currentMovie.description !== data.description ||
      currentMovie?.releaseDate !== data.releaseDate ||
      currentMovie.genre !== data.genre
    ) {
      if (currentMovie?.id)
        dispatch(editMovie({ ...data, id: currentMovie?.id }));
    } else {
      dispatch(
        setAlert({
          state: true,
          text: "You didn't change anything",
          color: "warning",
        })
      );
    }
  };

  if (!!currentMovie && currentMovie?.id.toString() === params.id)
    return (
      <Fragment>
        <h3>Edit Movie</h3>
        <MovieForm onSubmit={submitForm} initValue={currentMovie} />
      </Fragment>
    );
  return null;
};
export default EditMoviePage;
