import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCards, createNewCard, deleteCardById } from "@/services/apiCalls";

export const fetchAllCards = createAsyncThunk(
  "card/fetchAllCards",
  async (id) => {
    let cardsData = await fetchCards(id);
    //setCards(cardsData);
    return cardsData;
    // const boardsData = await fetchBoards();
    // return boardsData;
  }
);

export const addCard = createAsyncThunk(
  "card/addCard",
  async ({ name, list }) => {
    let newCard = await createNewCard(name, list);
    return newCard;
    // setCards((prev) => [...prev, newCard]);
    //   let newBoard = await createNewBoard(boardName);
    //   return newBoard;
  }
);

export const deleteCard = createAsyncThunk(
  "card/deleteCard",
  async ({ id }) => {
    //setCards((prev) => prev.filter((item) => item.id !== e.target.id));
    // toast.success("Card deleted");
    await deleteCardById(id);
    return id;
    // await deleteBoardById(boardId);
    // return boardId;
  }
);

const cardSlice = createSlice({
  name: "card",
  initialState: {
    cards: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCards.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload;
      })
      .addCase(fetchAllCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.cards.push(action.payload);
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.cards = state.cards.filter((card) => card.id != action.payload);
      });
  },
});

export default cardSlice.reducer;
