import { gql } from 'urql';

export const GET_BOOKS_QUERY = gql`
  query GetBooks {
    books {
      title
      author
      coverPhotoURL
      readingLevel

    }
  }
`;

export const GET_STUDENTS_QUERY = gql`
  query GetStudents {
    students {
      id
      name
      readingLevel
    }
  }
`;

export const ADD_READING_LIST_MUTATION = gql`
  mutation AddReadingList($student: String!, $books: [String!]!, $name: String!) {
    addReadingList(student: $student, books: $books, name: $name) {
      id
      name
    }
  }
`;

export const GET_READING_LISTS = gql  `
query GetReadingLists {
  readingLists {
    id
    name
    students {
      id
      name
    }
  }
}
`;