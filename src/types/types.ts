export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface IButtonEvent extends React.MouseEvent<HTMLButtonElement> {}

export interface IpopUpBTN {
  value: string;
  color?: string;
  isCloseBTN?: boolean;
  onClick: () => void;
}


export interface IFormValues {
  creator: string;
  id: number;
  name: string;
  description: string;
  genre: string;
  releaseDate: number;
}
export interface IMovie {
  creator: string;
  id: number;
  name: string;
  description: string;
  genre: string;
  releaseDate: number;
}

export interface IUserRegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUserLoginForm {
  email: string;
  password: string;
}
