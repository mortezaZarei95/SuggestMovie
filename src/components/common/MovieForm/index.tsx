import * as yup from "yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { IFormValues } from "types/types";
import classes from "./MovieForm.module.scss";

const schema = yup
  .object({
    name: yup.string().required("this field is required"),
    description: yup
      .string()
      .required("this field is required")
      .min(16, "description is too short - should be 16 chars minimum."),
    genre: yup.string().required("this field is required"),
    releaseDate: yup.string().required("this field is required"),
  })
  .required();

interface Iprops {
  onSubmit: SubmitHandler<IFormValues>;
  initValue?: IFormValues | undefined;
}

const MovieForm = (props: Iprops) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>({
    reValidateMode: "onChange",
    defaultValues: {
      name: props.initValue?.name,
      description: props.initValue?.description,
      genre: props.initValue?.genre,
      releaseDate: props.initValue?.releaseDate,
    },
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });

  const radioBtnList = ["Action", "Comedy", "Romance"];

  return (
    <Form onSubmit={handleSubmit(props.onSubmit)} className={classes.form}>
      <FormGroup className={classes.formGroup}>
        <Label for="name">Name</Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input {...field} invalid={!!errors.name} />}
        />
        <FormFeedback className={classes.ErrText}>
          {errors.name?.message}
        </FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label>Genre</Label>
        {radioBtnList.map((item) => (
          <FormGroup key={item} check>
            <Label check>
              <Controller
                name="genre"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      defaultChecked={props.initValue?.genre === item}
                      defaultValue={props.initValue?.genre}
                      value={item}
                      type="radio"
                      invalid={!!errors.genre}
                      name="genre"
                    />
                  );
                }}
              />
              {item}
            </Label>
          </FormGroup>
        ))}
      </FormGroup>
      <FormGroup>
        <Label>Realase Date</Label>
        <Controller
          name="releaseDate"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onChange={onChange}
              onBlur={onBlur}
              value={props.initValue?.releaseDate}
              defaultValue={props.initValue?.releaseDate}
              invalid={!!errors.releaseDate}
              name="releaseDate"
              type="date"
            />
          )}
        />
      </FormGroup>
      <FormGroup className={classes.formGroup}>
        <Label for="description">Description</Label>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <Input {...field} invalid={!!errors.description} type="textarea" />
          )}
        />
        <FormFeedback className={classes.ErrText}>
          {errors.description?.message}
        </FormFeedback>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
};
export default MovieForm;
