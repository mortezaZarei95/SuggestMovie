import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IpopUpBTN } from "types/types";

type TinitState = {
  loading: boolean;
  showAlert: boolean;
  messageAlert: string;
  colorAlert: string | undefined;
  redirectState: boolean;
  redirectURL: string;
  popUpState: boolean;
  popUpText: string;
  popUpButtons: IpopUpBTN[];
};
interface IAlert {
  state: boolean;
  text: string;
  color: string | undefined;
}

interface IPopUpPayLoad {
  state: boolean;
  text: string;
  buttons: IpopUpBTN[];
}

type TRedirectObj = {
  url: string;
  state: boolean;
};

const initialState: TinitState = {
  loading: false,
  //Alert
  showAlert: false,
  messageAlert: "",
  colorAlert: undefined,
  //Redirect
  redirectState: false,
  redirectURL: "",
  //popUp
  popUpState: false,
  popUpText: "",
  popUpButtons: [],
};
const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setShowAlert: (state, action: PayloadAction<boolean>) => {
      state.showAlert = action.payload;
    },
    setMessageAlert: (state, action: PayloadAction<string>) => {
      state.messageAlert = action.payload;
    },
    setcolorAlert: (state, action: PayloadAction<string>) => {
      state.colorAlert = action.payload;
    },
    setAlert: (state, action: PayloadAction<IAlert>) => {
      state.showAlert = action.payload.state;
      state.messageAlert = action.payload.text;
      state.colorAlert = action.payload.color;
    },

    setRedirect: (state, action: PayloadAction<TRedirectObj>) => {
      state.redirectURL = action.payload.url;
      state.redirectState = action.payload.state;
    },
    setRedirectState: (state, action: PayloadAction<boolean>) => {
      state.redirectState = action.payload;
    },
    setRedirectURL: (state, action: PayloadAction<string>) => {
      state.redirectURL = action.payload;
    },
    setPopUp: (state, action: PayloadAction<IPopUpPayLoad>) => {
      state.popUpState = action.payload.state;
      state.popUpText = action.payload.text;
      state.popUpButtons = action.payload.buttons;
    },
  },
});
export const {
  setLoading,
  setShowAlert,
  setMessageAlert,
  setcolorAlert,
  setRedirect,
  setRedirectState,
  setRedirectURL,
  setPopUp,
  setAlert,
} = commonSlice.actions;

export default commonSlice.reducer;
