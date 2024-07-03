import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
  searchQuery: '',
  readingList: [],
  error: null,
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    addBookToReadingList(state, action) {
      state.readingList.push(action.payload);
    },
    removeBookFromReadingList(state, action) {
      state.readingList = state.readingList.filter(book => book.id !== action.payload.id);
    },
    setBooks(state, action) {
      state.books = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setReadingLists(state, action) {
      state.readingLists = action.payload;
    },
  }
});

export const { setSearchQuery, addBookToReadingList, removeBookFromReadingList, setBooks, setError } = bookSlice.actions;
export default bookSlice.reducer;
