import React from 'react';
import { Grid } from '@mui/material';
import BookItem from './BookItem';

const SearchResults = ({ books, onAddBook }) => {
  return (
    <Grid container spacing={2}>
      {books.map(book => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={book.title}>
          <BookItem book={book} actionLabel="Add" onAction={() => onAddBook(book)} />
        </Grid>
      ))}
    </Grid>
  );
}

export default SearchResults;
