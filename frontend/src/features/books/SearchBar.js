import React from 'react';
import { TextField, Autocomplete, List, ListItem, ListItemText, Button } from '@mui/material';

const SearchBar = ({ books, searchQuery, onSearch, onSelect }) => {
  return (
    <Autocomplete
      freeSolo
      options={books}
      getOptionLabel={(option) => option.title}
      onInputChange={(event, newInputValue) => {
        onSearch(newInputValue);
      }}
      renderOption={(props, option) => (
        <ListItem {...props} alignItems="flex-start">
          <ListItemText primary={option.title} secondary={`Author: ${option.author}`} />
          <Button variant="contained" color="primary" onClick={() => onSelect(option)} style={{ backgroundColor: '#335C6E', color: '#FFFFFF' }}>
            Add
          </Button>
        </ListItem>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Books"
          variant="outlined"
        />
      )}
    />
  );
};

export default SearchBar;

