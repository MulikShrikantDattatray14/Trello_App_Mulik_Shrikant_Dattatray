import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchChecklists,
  createNewChecklist,
  deleteChecklistById,
} from "@/services/apiCalls";

export const fetchAllCheckList = createAsyncThunk(
  "checklist/fetchAllCheckList",
  async (id) => {
    const checkListData = await fetchChecklists(id);
    return checkListData;

    // const boardsData = await fetchBoards();
    // return boardsData;
  }
);

export const addCheckList = createAsyncThunk(
  "checklist/addCheckList",
  async ({ name, cardId }) => {
    let newChecklist = await createNewChecklist(name, cardId);
    return newChecklist;
    //setCheckLists((prev) => [...prev, newChecklist]);

    // let newBoard = await createNewBoard(boardName);
    // return newBoard;
  }
);

export const deleteCheckList = createAsyncThunk(
  "checklist/deleteCheckList",
  async (id) => {
    await deleteChecklistById(id);
    return id;
    // await deleteBoardById(boardId);
    // return boardId;
  }
);

const checklistSlice = createSlice({
  name: "checklist",
  initialState: {
    checkLists: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCheckList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCheckList.fulfilled, (state, action) => {
        state.loading = false;
        state.checkLists = action.payload;
      })
      .addCase(fetchAllCheckList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCheckList.fulfilled, (state, action) => {
        state.checkLists.push(action.payload); // Store fetched data
      })
      .addCase(deleteCheckList.fulfilled, (state, action) => {
        state.checkLists = state.checkLists.filter(
          (checkList) => checkList.id != action.payload
        );
      });
  },
});

export default checklistSlice.reducer;
