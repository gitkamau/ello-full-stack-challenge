import { booksData } from '../data/books';
import { studentsData } from '../data/students';

export const resolvers = {
  Query: {
    books: () => booksData,
    students: () => studentsData,
  },
};
