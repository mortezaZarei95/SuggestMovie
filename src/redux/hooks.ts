import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { TDispatch, TStore } from "./store";

export const useAppSelector: TypedUseSelectorHook<TStore> = useSelector;

export const useAppDispatch = () => useDispatch<TDispatch>();
