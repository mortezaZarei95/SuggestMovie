import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { IUserLoginForm } from "types/types";
import classes from "./RegisterForm.module.scss";
import {
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";

interface Iprops {
  onSubmit: SubmitHandler<IUserLoginForm>;
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
  })
  .required();

const RegisterForm = (props: Iprops) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IUserLoginForm>({
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  const onSubmit = async (data: IUserLoginForm) => {
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
              type={passwordShown ? "text" : "password"}
              invalid={!!errors.password}
            />
          )}
        />
        <span onClick={() => setPasswordShown(!passwordShown)}>show</span>

        <FormFeedback className={classes.errText}>
          {errors.password?.message}
        </FormFeedback>
      </FormGroup>
      <Button type="submit" color="primary">
        Submit
      </Button>
    </Form>
  );
};

export default RegisterForm;
