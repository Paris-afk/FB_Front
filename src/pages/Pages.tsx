import * as React from "react";
import { faker } from '@faker-js/faker';
import '../css/wall/style.css';

// Key for storing liked pages in localStorage
const PAGES_KEY = 'facebook_clone_pages';

// Generate a fixed set of pages only once
function getInitialPages() {
  const saved = localStorage.getItem('facebook_clone_initial_pages');
  if (saved) return JSON.parse(saved);
  const pages = Array.from({ length: 12 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    description: faker.company.catchPhrase(),
    image: faker.image.urlPicsumPhotos({ width: 400, height: 300 }),
    followers: faker.number.int({ min: 100, max: 100000 }),
    category: faker.commerce.department(),
  }));
  localStorage.setItem('facebook_clone_initial_pages', JSON.stringify(pages));
  return pages;
}

const Pages: React.FC = () => {
  const allPages = getInitialPages();
  // Load liked pages from localStorage or initialize
  const [likedPages, setLikedPages] = React.useState<string[]>(() => {
    const saved = localStorage.getItem(PAGES_KEY);
    if (saved) return JSON.parse(saved);
    return [];
  });
  // Show feedback message when liking a page
  const [likedPageId, setLikedPageId] = React.useState<string | null>(null);

  // Save liked pages to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem(PAGES_KEY, JSON.stringify(likedPages));
  }, [likedPages]);

  // Handle like page
  const handleLikePage = (pageId: string) => {
    if (!likedPages.includes(pageId)) {
      setLikedPages(prev => [...prev, pageId]);
      setLikedPageId(pageId);
      setTimeout(() => setLikedPageId(null), 2000);
    }
  };

  // Handle unlike page
  const handleUnlikePage = (pageId: string) => {
    setLikedPages(prev => prev.filter(id => id !== pageId));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4" style={{ color: '#1877f2' }}>Pages</h2>
      <div className="row">
        {allPages.map(page => (
          <div className="col-md-4 mb-4" key={page.id}>
            <div className="card shadow-sm h-100 d-flex flex-column" style={{ borderRadius: 12 }}>
              <img src={page.image} className="card-img-top" alt={page.name} style={{ height: 180, objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12 }} />
              <div className="card-body text-center p-2 d-flex flex-column justify-content-between" style={{ minHeight: 180 }}>
                <div>
                  <h5 className="card-title mb-1" style={{ fontSize: 17 }}>{page.name}</h5>
                  <div style={{ fontSize: 13, color: '#65676b', marginBottom: 8 }}>
                    <span>{page.followers.toLocaleString('fr-FR')} abonnés • {page.category}</span>
                  </div>
                </div>
                <div className="mt-auto d-flex flex-column gap-1">
                  {likedPages.includes(page.id) ? (
                    <>
                      <div className="alert alert-success p-1 mb-2" style={{ fontSize: 13, minHeight: 28 }}>
                        {likedPageId === page.id ? 'Vous aimez cette page' : 'Déjà aimée'}
                      </div>
                      <button className="btn btn-light btn-sm w-100" style={{ border: '1px solid #ddd', color: '#65676b', fontWeight: 600 }} onClick={() => handleUnlikePage(page.id)}>
                        Ne plus aimer
                      </button>
                    </>
                  ) : (
                    <>
                      <div style={{ minHeight: 28 }}></div>
                      <button className="btn btn-primary btn-sm w-100 mb-2" style={{ background: '#e7f3ff', color: '#1877f2', border: 'none', fontWeight: 600 }} onClick={() => handleLikePage(page.id)}>
                        Aimer la page
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

export default Pages;
