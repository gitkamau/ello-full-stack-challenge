export const typeDefs = `#graphql
  type Book {
    title: String
    author: String
    coverPhotoURL: String
    readingLevel: String
  }

  type Student {
    id: ID
    name: String
    readingLevel: String
  }

  type Query {
    books: [Book]
    students: [Student]
  }
`;
