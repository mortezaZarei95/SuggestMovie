import classes from "./Loading.module.scss";

const ComponentLoading = () => {
  return (
    <div className={classes.Wrapper}>
      <div className={classes.loading}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default ComponentLoading;
