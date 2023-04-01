import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { sortItems } from "../utils";
let header;

const api = process.env.REACT_APP_API_URL;

export const fetchNotes = createAsyncThunk("notes/getAllNotes", async () => {
  const res = await axios(api+"/getAllNotes", header);
  return res.data;
});
export const login = createAsyncThunk("notes/login", async (values) => {
  const res = await axios.post(api+"/login", values);
  return res.data;
});
export const signUp = createAsyncThunk("notes/signUp", async (values) => {
  const res = await axios.post(api+"/signUp", values);
  return res.data;
});
export const isRemember = createAsyncThunk("notes/isRemember", async () => {
  header = localStorage.getItem("header") ? JSON.parse(localStorage.getItem("header")) : null;
  const res = await axios.post(api+"/meInfo", {}, header);
  return res.data;
});
export const changeTheme = createAsyncThunk("notes/changeTheme", async (values) => {
  const res = await axios.post(api+"/userUpdate", values, header);
  return res.data;
});
export const layoutStyle = createAsyncThunk("notes/layoutStyle", async (values) => {
  const res = await axios.post(api+"/userUpdate", values, header);
  return res.data;
});
export const addTag = createAsyncThunk("notes/addTag", async (values) => {
  const res = await axios.post(api+"/userUpdate", values, header);
  return res.data;
});
export const createNote = createAsyncThunk("notes/createNote", async (values) => {
  const res = await axios.post(api+"/createNote", values, header);
  return res.data;
});
export const updateNote = createAsyncThunk("notes/updateNote", async (values) => {
  const res = await axios.post(api+"/editNote", values, header);
  return res.data;
});
export const deleteNote = createAsyncThunk("notes/deleteNote", async (values) => {
  const res = await axios.post(api+"/deleteNote", values, header);
  return res.data;
});

const note = createSlice({
  name: "note",
  initialState: {
    loading: false,
    error: null,
    theme: false,
    archive: false,
    search: "",
    tags: [],
    selectedTag: "all",
    layout: true,
    authToken: "",
    isSignUp: true,
    user: null,
    remember: false,
    notes: [],
  },
  reducers: {
    searchNote: (state, action) => {
      state.search = action.payload;
    },
    logout: (state) => {
      localStorage.clear();
      header = "";
      state.authToken = "";
    },

    archiveShow: (state) => {
      state.archive = !state.archive;
    },

    setIsSignUp: (state) => {
      state.isSignUp = !state.isSignUp;
    },
    changeRemember: (state) => {
      state.remember = !state.remember;
    },

    changeSelectedTag: (state, action) => {
      state.selectedTag = action.payload;
    },
  },
  extraReducers: {
    [isRemember.fulfilled]: (state, action) => {
      state.loading = false;
      header = {
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      };
      state.user = action.payload;
      state.theme = action.payload.theme;
      state.layout = action.payload.layout;
      state.tags = action.payload.tags;
      state.authToken = action.payload.token;
    },

    [changeTheme.fulfilled]: (state, action) => {
      state.theme = action.payload.theme;
    },
    [layoutStyle.fulfilled]: (state, action) => {
      state.layout = action.payload.layout;
    },
    [addTag.fulfilled]: (state, action) => {
      state.tags = action.payload.tags;
    },
    [signUp.pending]: (state, action) => {
      state.loading = true;
    },
    [signUp.fulfilled]: (state, action) => {
      state.loading = false;
      state.isSignUp = false;
    },
    [signUp.rejected]: (state, action) => {
      state.isSignUp = true;
      state.error = action.payload;
    },
    [fetchNotes.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchNotes.fulfilled]: (state, action) => {
      state.loading = false;
      state.notes = action.payload.sort(sortItems);
    },
    [fetchNotes.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = true;
    },

    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      header = {
        headers: {
          Authorization: `Bearer ${action.payload.token}`,
        },
      };
      state.user = action.payload;
      state.theme = action.payload.theme;
      state.layout = action.payload.layout;
      state.tags = action.payload.tags;
      state.authToken = action.payload.token;
      if (state.remember) {
        localStorage.setItem("header", JSON.stringify(header));
        localStorage.setItem("authToken", action.payload.token);
      }
    },
    [login.rejected]: (state, action) => {
      state.error = action.error.message;
    },

    [createNote.fulfilled]: (state, action) => {
      state.notes.push(action.payload);
      state.notes = state.notes.sort(sortItems);
      state.loading = false;
    },
    [createNote.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [updateNote.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.notes.findIndex((note) => note.id === action.payload.id);
      state.notes[index] = action.payload;
    },
    [updateNote.rejected]: (state, action) => {
      state.error = action.error.message;
    },

    [deleteNote.fulfilled]: (state, action) => {
      state.loading = false;
      state.notes = state.notes.filter((note) => note.id !== action.payload.id).sort(sortItems);
    },

    [deleteNote.rejected]: (state, action) => {
      state.error = action.error.message;
    },
  },
});
export const {
  changeRemember,
  setIsSignUp,
  archiveShow,
  searchNote,
  getAllNotes,
  addNote,
  changeSelectedTag,
  logout,
} = note.actions;
export default note.reducer;
