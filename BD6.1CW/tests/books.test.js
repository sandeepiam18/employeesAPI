// const { equal } = require('assert');
const { title } = require('process');
let { getBooks, getBookById, addBook } = require('../book');
describe('Book functions', () => {
  it('should get all the books ', () => {
    let books = getBooks();
    expect(books.length).toBe(4);
    expect(books).toEqual([
      { id: 1, title: '1984', author: 'George Orwell' },
      { id: 2, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
      { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen' },
      { id: 4, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    ]);
  });
  it('should return a books by id', () => {
    let book = getBookById(4);
    expect(book).toEqual({
      id: 4,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
    });
  });
  it('should return a book by id', () => {
    let boook = getBookById(22);
    expect(book).toBeUndefined();
  });
  it('should add a new book', () => {
    let newBook = { title: 'new book', author: 'newAuthor' };
    let addedBook = addBook(newBook);
    expect(addedBook).toEqual({
      id: 5,
      title: 'new book',
      author: 'newAuthor',
    });
  });
});
