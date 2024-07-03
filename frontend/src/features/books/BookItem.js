import React from 'react';
import { Card, CardActions, Button, Avatar, CardHeader, CardMedia } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2),
  },
  media: {
    height: 140,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#335C6E',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#2b4e5b',
    },
  },
}));

const BookItem = ({ book, actionLabel, onAction, onRemoveAction }) => {
  const classes = useStyles();

  const coverPhotoURL = `/${book.coverPhotoURL}`;

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={coverPhotoURL}
        title={book.title}
      />
      <CardHeader
        avatar={
          <Avatar aria-label="book" className={classes.avatar}>
            {book.title[0]}
          </Avatar>
        }
        title={book.title}
        subheader={book.author}
      />
      <CardActions className={classes.actions}>
        <Button size="small" className={classes.button} onClick={onRemoveAction} style={{ backgroundColor: '#F76434', color: '#FFFFFF' }}>
            Remove
        </Button>
      </CardActions>
    </Card>
  );
}

export default BookItem;
