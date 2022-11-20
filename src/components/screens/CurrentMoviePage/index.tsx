import Button from "components/common/Button";
import {
  Card,
  CardBody,
  CardColumns,
  CardFooter,
  CardHeader,
} from "reactstrap";
import { IMovie } from "types/types";
import classes from "./CurrentMoviePage.module.scss";

interface Iprops {
  email: string;
  currentMovie: IMovie;
  onDelete: () => void;
  onEdit: () => void;
}
const CurrentMoviePage = (props: Iprops) => {
  return (
    <Card className={classes.Wrapper}>
      <CardHeader>
        <h1>{props.currentMovie.name}</h1>
      </CardHeader>
      <CardBody>
        <CardColumns className={classes.col}>
          <span> Description:</span>
          <p>{props.currentMovie.description}</p>
        </CardColumns>
        <CardColumns className={classes.col}>
          <span>Creator Email:</span>
          <p>{props.currentMovie.creator}</p>
        </CardColumns>
        <CardColumns className={classes.col}>
          <span>Release Date: </span>
          <p>{new Date(props.currentMovie.releaseDate).toLocaleDateString()}</p>
        </CardColumns>
        <CardColumns className={classes.col}>
          <span>Genre:</span>
          <p>{props.currentMovie.genre}</p>
        </CardColumns>
      </CardBody>
      <CardFooter className={classes.cardFooter}>
        {props.email === props.currentMovie.creator && (
          <>
            <Button color="danger" onClick={props.onDelete}>
              Delete
            </Button>
            <Button color="warning" onClick={props.onEdit}>
              Edit
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default CurrentMoviePage;
