import { useSelector, TypedUseSelectorHook } from "react-redux";
import { store } from "app/store";

type RootState = ReturnType<typeof store.getState>;

declare module "react-redux" {
  export const useSelector: TypedUseSelectorHook<RootState> = useSelector;
}
