import { Fragment } from "react";
import { useNavigate } from "react-router";

import classes from "./MovieCard.module.scss";
import { useAppSelector } from "redux/hooks";
import Button from "../Button";
import { IMovie } from "types/types";
import { Card } from "reactstrap";

interface Iprops extends IMovie {
  onDelete: (id: string, name: string) => void;
}
const MovieCard = (props: Iprops) => {
  let currentUserEmail = useAppSelector((state) => state.Auth.email);
  const navigate = useNavigate();

  const editMovie = () => {
    navigate(`/edit-movie/${props.id}`);
  };
  const navigateToMoviePage = () => {
    navigate(`/movie/${props.id}`);
  };
  const deleteMovie = () => {
    props.onDelete(props.id.toString(), props.name);
  };
  return (
    <Card className={classes.cardWrapper}>
      <div>
        <h2>{props.name}</h2>
      </div>
      <div className={classes.btnWrapper}>
        {currentUserEmail === props.creator && (
          <Fragment>
            <Button onClick={deleteMovie} color="danger">
              Delete
            </Button>
            <Button onClick={editMovie} color="warning">
              Edit
            </Button>
          </Fragment>
        )}
        <Button onClick={navigateToMoviePage} color="primary" outline={true}>
          View Details
        </Button>
      </div>
    </Card>
  );
};

export default MovieCard;
