import { Fragment, useEffect, useRef, useState } from "react";

import MovieList from "components/screens/HomePage/MovieList";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { deleteMovie, getMovieList } from "redux/Movie/slice";
import { setEmail } from "redux/Auth/slice";
import { IMovie } from "types/types";
import SearchBox from "components/common/SearchBox";
import { setPopUp } from "redux/Common/slice";

const HomePage = () => {
  const movieList = useAppSelector((state) => state.Movie.movieList);
  // const searchedText = useAppSelector((state) => state.Movie.searchedText);
  const email = useAppSelector((state) => state.Auth.email);
  const loading = useAppSelector((state: any) => state.Common.loading);

  const [filteredList, setFilteredList] = useState<IMovie[]>([]);
  const [searchedText, setSearchedText] = useState<string>("");

  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const newList: IMovie[] = movieList.filter((item) =>
      item.name.toUpperCase().includes(searchedText.toUpperCase())
    );

    setFilteredList(newList);
  }, [searchedText]);

  useEffect(() => {
    !movieList.length && !loading && dispatch(getMovieList());
    if (!email) {
      const localStorageEmail = localStorage.getItem("email");
      localStorageEmail && dispatch(setEmail(localStorageEmail));
    }
  }, []);

  useEffect(() => {
    setFilteredList(movieList);
  }, [movieList]);

  const onSearch = () => {
    !!inputRef.current && setSearchedText(inputRef.current.value);
  };

  const onDelete = (id: string, name: string) => {
    dispatch(
      setPopUp({
        state: true,
        text: "are you sure about deleting " + name + " Movie ?",
        buttons: [
          {
            value: "Apply",
            color: "primary",
            isCloseBTN: false,
            onClick: () => {
              dispatch(deleteMovie(id));
              dispatch(setPopUp({ state: false, text: "", buttons: [] }));
            },
          },
          {
            value: "Close",
            color: undefined,
            isCloseBTN: true,
            onClick: () => {},
          },
        ],
      })
    );
  };

  return (
    <Fragment>
      <SearchBox ref={inputRef} onChange={onSearch} />
      <MovieList movieList={filteredList} onDelete={onDelete} />
    </Fragment>
  );
};
export default HomePage;
