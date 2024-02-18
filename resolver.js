const data = {
  authors: [],
  books: [],
};

for (let i = 1; i <= 10; i++) {
  let author = {
    id: i,
    name: `Author ${i}`,
    bookIds: [],
  };

  for (let j = 1; j <= 10; j++) {
    let book = {
      id: `${(i - 1) * 10 + j}`,
      title: `Book ${j} of Author ${i}`,
      publishmentYear: 2000 + j,
      authorId: i,
    };
    data.books.push(book);
    author.bookIds.push(book.id);
  }

  data.authors.push(author);
}

// console.log(data);

export const resolvers = {
  Book: {
    author: (parent, args, context, info) => {
      console.log(parent, "parent");
      return data.authors.find(
        (authorDetails) => authorDetails.id === parent.authorId
      );
    },
  },
  Author: {
    books: (parent, args, context, info) => {
      return data.books.filter((book) => parent.bookIds.includes(book.id));
    },
  },
  Query: {
    authors: () => {
      return data.authors;
    },
    books: () => {
      return data.books;
    },
  },
  Mutation: {
    addBook: (parent, args, context, info) => {
      console.log(args);
      const newRecord = {
        ...args,
        id: data.books.length + 1,
      };
      data.books.push(newRecord);
      return newRecord;
    },
  },
};
