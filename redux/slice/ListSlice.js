import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchLists,
  createNewList,
  archiveListById,
} from "@/services/apiCalls";

export const fetchAllLists = createAsyncThunk(
  "list/fetchAllLists",
  async (boardId) => {
    // const boardsData = await fetchBoards();
    // return boardsData;

    let allLists = await fetchLists(boardId);
    return allLists;
  }
);

export const addList = createAsyncThunk(
  "list/addList",
  async ({ BoardID, name }) => {
    const newList = await createNewList(BoardID, name);
    return newList;
    //listsUpdate((prevLists) => [...prevLists, newList]);
    //   let newBoard = await createNewBoard(boardName);
    //   return newBoard;
  }
);

export const deleteList = createAsyncThunk(
  "list/deleteList",
  async (boardId) => {
    await archiveListById(boardId);
    return boardId;

    // await deleteBoardById(boardId);
    // return boardId;
  }
);

const listSlice = createSlice({
  name: "list",
  initialState: {
    lists: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLists.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllLists.fulfilled, (state, action) => {
        state.loading = false;
        state.lists = action.payload;
      })
      .addCase(fetchAllLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addList.fulfilled, (state, action) => {
        state.lists.push(action.payload); // Store fetched data
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.lists = state.lists.filter((list) => list.id != action.payload);

        //setLists((prev) => prev.filter((item) => item.id !== e.target.id));
      });
  },
});

export default listSlice.reducer;
