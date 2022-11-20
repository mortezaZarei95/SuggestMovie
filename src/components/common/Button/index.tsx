import React from "react";

import classes from "./Button.module.scss";
import { IButtonProps } from "types/types";
import { Button } from "reactstrap";

interface Iprops extends IButtonProps {
  color?: "danger" | "warning" | "primary";
  outline?: boolean;
}
const ButtonComponent: React.FC<Iprops> = (props) => {
  return (
    <Button
      {...props}
      color={props.color}
      className={[classes.Button].join(" ")}
    >
      {props.children}
    </Button>
  );
};

export default ButtonComponent;