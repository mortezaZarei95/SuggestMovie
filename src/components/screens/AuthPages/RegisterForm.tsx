import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";

import { IUserRegisterForm } from "types/types";
import classes from "./RegisterForm.module.scss";

interface Iprops {
  onSubmit: SubmitHandler<IUserRegisterForm>;
}

const schema = yup
  .object({
    email: yup
      .string()
      .required("this field is required")
      .matches(
        /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
        "Enter a valid Email Address"
      ),
    password: yup
      .string()
      .required("this field is required")
      .min(4, "Password is too short - should be 4 chars minimum."),
    confirmPassword: yup
      .string()
      .required("this field is required")
      .min(4, "Password is too short - should be 4 chars minimum.")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

const RegisterForm = (props: Iprops) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRegisterForm>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [confirmPasswordShown, setconfirmPasswordShown] =
    useState<boolean>(false);

  const onSubmit = async (data: IUserRegisterForm) => {
    props.onSubmit(data);
  };

  return (
    <Form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <FormGroup className={classes.formGroup}>
        <Label htmlFor="email">Email Address:</Label>
        <Controller
          // id="email"
          name="email"
          control={control}
          render={({ field }) => (
            <Input type="email" {...field} invalid={!!errors.email} />
          )}
        />
        <FormFeedback className={classes.errText}>
          {errors.email?.message}
        </FormFeedback>
      </FormGroup>
      <FormGroup className={classes.formGroup}>
        <Label htmlFor="password">Password:</Label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              invalid={!!errors.password}
              type={passwordShown ? "text" : "password"}
            />
          )}
        />
        <span onClick={() => setPasswordShown(!passwordShown)}>show</span>
        <FormFeedback className={classes.errText}>
          {errors.password?.message}
        </FormFeedback>
      </FormGroup>
      <FormGroup className={classes.formGroup}>
        <Label htmlFor="confirmPassword"> Confirm Password:</Label>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              invalid={!!errors.confirmPassword}
              type={confirmPasswordShown ? "text" : "password"}
            />
          )}
        />
        <span onClick={() => setconfirmPasswordShown(!confirmPasswordShown)}>
          show
        </span>
        <FormFeedback className={classes.errText}>
          {errors.confirmPassword?.message}
        </FormFeedback>
      </FormGroup>
      <Button type="submit" color="primary">
        Submit
      </Button>
    </Form>
  );
};

export default RegisterForm;
