import MovieCard from "components/common/MovieCard";
import { IMovie } from "types/types";
import classes from "./HomePage.module.scss";

interface Iprops {
  movieList: IMovie[];
  onDelete: (id: string, name: string) => void;
}
const MovieList = (props: Iprops) => {
  return (
    <section className={classes.Wrapper}>
      {props.movieList.map((item) => (
        <MovieCard key={item.id} {...item} onDelete={props.onDelete} />
      ))}
    </section>
  );
};

export default MovieList;
