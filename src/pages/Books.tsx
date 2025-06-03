import * as React from "react";
import { faker } from '@faker-js/faker';
import '../css/wall/style.css';

// Key for storing liked books in localStorage
const BOOKS_KEY = 'facebook_clone_books';

// Generate a fixed set of books only once
function getInitialBooks() {
  const saved = localStorage.getItem('facebook_clone_initial_books');
  if (saved) return JSON.parse(saved);
  const books = Array.from({ length: 12 }).map(() => ({
    id: faker.string.uuid(),
    title: faker.lorem.words({ min: 2, max: 5 }),
    author: faker.person.fullName(),
    cover: faker.image.urlPicsumPhotos({ width: 400, height: 600 }),
    description: faker.lorem.sentences({ min: 1, max: 2 }),
    year: faker.date.past({ years: 50 }).getFullYear(),
  }));
  localStorage.setItem('facebook_clone_initial_books', JSON.stringify(books));
  return books;
}

const Books: React.FC = () => {
  const allBooks = getInitialBooks();
  // Load liked books from localStorage or initialize
  const [likedBooks, setLikedBooks] = React.useState<string[]>(() => {
    const saved = localStorage.getItem(BOOKS_KEY);
    if (saved) return JSON.parse(saved);
    return [];
  });
  // Show feedback message when liking a book
  const [likedBookId, setLikedBookId] = React.useState<string | null>(null);

  // Save liked books to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem(BOOKS_KEY, JSON.stringify(likedBooks));
  }, [likedBooks]);

  // Handle like book
  const handleLikeBook = (bookId: string) => {
    if (!likedBooks.includes(bookId)) {
      setLikedBooks(prev => [...prev, bookId]);
      setLikedBookId(bookId);
      setTimeout(() => setLikedBookId(null), 2000);
    }
  };

  // Handle unlike book
  const handleUnlikeBook = (bookId: string) => {
    setLikedBooks(prev => prev.filter(id => id !== bookId));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4" style={{ color: '#1877f2' }}>Books</h2>
      <div className="row">
        {allBooks.map(book => (
          <div className="col-md-4 mb-4" key={book.id}>
            <div className="card shadow-sm h-100 d-flex flex-column" style={{ borderRadius: 12 }}>
              <img src={book.cover} className="card-img-top" alt={book.title} style={{ height: 220, objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12 }} />
              <div className="card-body text-center p-2 d-flex flex-column justify-content-between" style={{ minHeight: 180 }}>
                <div>
                  <h5 className="card-title mb-1" style={{ fontSize: 17 }}>{book.title}</h5>
                  <div style={{ fontSize: 13, color: '#65676b', marginBottom: 8 }}>
                    <span>By {book.author} • {book.year}</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#65676b', marginBottom: 8 }}>
                    {book.description}
                  </div>
                </div>
                <div className="mt-auto d-flex flex-column gap-1">
                  {likedBooks.includes(book.id) ? (
                    <>
                      <div className="alert alert-success p-1 mb-2" style={{ fontSize: 13, minHeight: 28 }}>
                        {likedBookId === book.id ? 'Vous aimez ce livre' : 'Déjà aimé'}
                      </div>
                      <button className="btn btn-light btn-sm w-100" style={{ border: '1px solid #ddd', color: '#65676b', fontWeight: 600 }} onClick={() => handleUnlikeBook(book.id)}>
                        Ne plus aimer
                      </button>
                    </>
                  ) : (
                    <>
                      <div style={{ minHeight: 28 }}></div>
                      <button className="btn btn-primary btn-sm w-100 mb-2" style={{ background: '#e7f3ff', color: '#1877f2', border: 'none', fontWeight: 600 }} onClick={() => handleLikeBook(book.id)}>
                        Aimer le livre
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
