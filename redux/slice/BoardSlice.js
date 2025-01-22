import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchBoards,
  createNewBoard,
  deleteBoardById,
} from "@/services/apiCalls";

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const boardsData = await fetchBoards();
  return boardsData;
});

export const addData = createAsyncThunk("data/addData", async (boardName) => {
  let newBoard = await createNewBoard(boardName);
  return newBoard;
});

export const deleteData = createAsyncThunk(
  "data/deleteData",
  async (boardId) => {
    await deleteBoardById(boardId);
    return boardId;
  }
);

const boardSlice = createSlice({
  name: "data",
  initialState: {
    boards: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addData.fulfilled, (state, action) => {
        state.boards.push(action.payload); // Store fetched data
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.boards = state.boards.filter(
          (board) => board.id != action.payload
        );
      });
  },
});

export default boardSlice.reducer;
