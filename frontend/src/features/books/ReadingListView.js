import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Grid,
  Box,
  CircularProgress,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useQuery, useMutation } from 'urql';
import { GET_BOOKS_QUERY, GET_STUDENTS_QUERY, ADD_READING_LIST_MUTATION } from '../slices/bookApiSlice';
import { setBooks, setError, addBookToReadingList, removeBookFromReadingList } from '../slices/bookSlice';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  searchResults: {
    marginBottom: theme.spacing(4),
  },
  createButton: {
    marginBottom: theme.spacing(4),
    backgroundColor: '#335C6E',
  },
  formControl: {
    marginBottom: theme.spacing(3),
    minWidth: 300,
    width: '100%',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  dialog: {
    minWidth: '500px',
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
}));

const ReadingListView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [readingListName, setReadingListName] = useState('');
  const [students, setStudents] = useState([]);
  const [books, setBooksState] = useState([]);
  const [selectedReadingList, setSelectedReadingList] = useState('');

  const [booksResult] = useQuery({ query: GET_BOOKS_QUERY });
  const [studentsResult] = useQuery({ query: GET_STUDENTS_QUERY });
  const [addReadingListResult, addReadingList] = useMutation(ADD_READING_LIST_MUTATION);

  const reduxBooks = useSelector((state) => state.books.books);
  const readingList = useSelector((state) => state.books.readingList);


  useEffect(() => {
    if (booksResult.data) {
      dispatch(setBooks(booksResult.data.books));
      setBooksState(booksResult.data.books);
    } else if (booksResult.error) {
      dispatch(setError(booksResult.error.message));
    }
  }, [booksResult, dispatch]);

  useEffect(() => {
    if (studentsResult.data) {
      setStudents(studentsResult.data.students);
      if (studentsResult.data.students.length > 0) {
        const firstStudent = studentsResult.data.students[0].name;
        setSelectedStudent(firstStudent);
        setReadingListName(`${firstStudent}'s Reading List`);
        setSelectedReadingList(`${firstStudent}'s Reading List`);
      }
    }
  }, [studentsResult]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleAddBook = (book) => {
    dispatch(addBookToReadingList(book));
  };

  const handleRemoveBook = (book) => {
    dispatch(removeBookFromReadingList(book));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStudentChange = (event) => {
    const studentName = event.target.value;
    setSelectedStudent(studentName);
    setReadingListName(`${studentName}'s Reading List`);
    setSelectedReadingList(`${studentName}'s Reading List`);
    setSelectedBook('');
  };

  const handleBookChange = (event) => {
    setSelectedBook(event.target.value);
  };

  const handleAddReadingList = () => {
    const variables = {
      student: selectedStudent,
      books: [selectedBook],
      name: readingListName,
    };

    addReadingList(variables).then((result) => {
      if (result.error) {
        console.error('Error adding reading list:', result.error);
      } else {
        console.log('Reading list added successfully');
        setOpen(false);
      }
    });
  };

  const handleReadingListChange = (event) => {
    setSelectedReadingList(event.target.value);
  };


  const filteredBooks = reduxBooks.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className={classes.root}>
      <Box mb={2}>
        <SearchBar books={reduxBooks} searchQuery={searchQuery} onSearch={handleSearch} onSelect={handleAddBook} />
      </Box>

      <Grid container spacing={3} className={classes.flexContainer}>
        <Grid item xs={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="reading-list-label">Reading List</InputLabel>
            <Select
              labelId="reading-list-label"
              value={selectedReadingList}
              onChange={handleReadingListChange}
              fullWidth
            >
              {students.map((student) => (
                <MenuItem key={student.id} value={`${student.name}'s Reading List`}>
                  {`${student.name}'s Reading List`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            style={{ backgroundColor: '#335C6E', color: '#FFFFFF' }}
            onClick={handleClickOpen}
            className={classes.createButton}
          >
            Create Reading List
          </Button>
        </Grid>
      </Grid>

      {booksResult.fetching && <CircularProgress />}
      {booksResult.error && <Typography color="error">{booksResult.error.message}</Typography>}
      {!booksResult.fetching && !booksResult.error && (
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.searchResults}>
            <SearchResults books={filteredBooks} onAddBook={handleAddBook} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              {readingListName}
            </Typography>
            <SearchResults books={readingList} onRemoveBook={handleRemoveBook} />
          </Grid>
        </Grid>
      )}

      <Dialog open={open} onClose={handleClose} classes={{ paper: classes.dialog }}>
        <DialogTitle>Create Reading List</DialogTitle>
        <DialogContent className={classes.formContainer}>
          <FormControl className={classes.formControl}>
            <InputLabel id="student-select-label">Student</InputLabel>
            <Select
              labelId="student-select-label"
              value={selectedStudent}
              onChange={handleStudentChange}
              fullWidth
            >
              {students.map((student) => (
                <MenuItem key={student.id} value={student.name}>
                  {student.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogContent className={classes.formContainer}>
          <FormControl className={classes.formControl}>
            <InputLabel id="book-select-label">Book</InputLabel>
            <Select
              labelId="book-select-label"
              value={selectedBook}
              onChange={handleBookChange}
              fullWidth
            >
              {books
                .filter((book) => {
                  const selectedStudentData = students.find(student => student.name === selectedStudent);
                  return selectedStudentData && book.readingLevel === selectedStudentData.readingLevel;
                })
                .map((book) => (
                  <MenuItem key={book.id} value={book.title}>
                    {book.title}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogContent className={classes.formContainer}>
          <TextField
            label="Reading List Name"
            value={readingListName}
            onChange={(e) => setReadingListName(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" style={{ backgroundColor: '#FABD33', color: '#FFFFFF' }}>
            Cancel
          </Button>
          <Button onClick={handleAddReadingList} color="primary" style={{ backgroundColor: '#335C6E', color: '#FFFFFF' }}>
            Add Reading List
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ReadingListView;
