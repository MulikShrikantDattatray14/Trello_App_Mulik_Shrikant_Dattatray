import { configureStore } from "@reduxjs/toolkit";
import BoardSlice from "../slice/BoardSlice.js";
import ListSlice from "../slice/ListSlice";
import CardSlice from "../slice/CardSlice";
import CheckListSlice from "../slice/CheckListSlice";

export const store = configureStore({
  reducer: {
    boards: BoardSlice,
    lists: ListSlice,
    cards: CardSlice,
    checkLists: CheckListSlice,
  },
});
