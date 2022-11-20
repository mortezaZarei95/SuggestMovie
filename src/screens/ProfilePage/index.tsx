import { Card, CardBody, CardColumns, CardHeader } from "reactstrap";
import { useAppSelector } from "redux/hooks";
import classes from "./ProfilePage.module.scss";

const ProfilePage = () => {
  const email = useAppSelector((state) => state.Auth.email);
  return (
    <Card className={classes.Wrapper}>
      <CardHeader>
        <h1>Profile Page</h1>
      </CardHeader>
      <CardBody>
        <CardColumns className={classes.col}>
          <span> email:</span>
          <p>{email}</p>
        </CardColumns>
      </CardBody>
    </Card>
  );
};

export default ProfilePage;
