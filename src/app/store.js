import { configureStore } from "@reduxjs/toolkit";
import ui from "features/ui/uiSlice";
import cart from "features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    ui,
    cart,
  },
});
