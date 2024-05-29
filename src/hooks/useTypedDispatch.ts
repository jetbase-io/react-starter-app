import { useDispatch } from "react-redux";
import { RematchDispatch } from "@rematch/core";
import { RootModel } from "../store/models";

export const useTypedDispatch = () => useDispatch<RematchDispatch<RootModel>>();
