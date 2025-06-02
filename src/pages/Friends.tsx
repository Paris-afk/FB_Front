import * as React from "react";
import { PostRepository } from "../repositories/PostRepository";
import { faker } from '@faker-js/faker';
import '../css/wall/style.css';

// Key for storing friend relationships in localStorage
const FRIENDS_KEY = 'facebook_clone_friends';

const Friends: React.FC = () => {
  const postRepo = PostRepository.getInstance();
  const currentUser = postRepo.getCurrentUser();
  // Get all users except current
  const allUsers = postRepo.getAllUsers().filter(u => u.id !== currentUser.id);

  // Load friends from localStorage or initialize
  const [friends, setFriends] = React.useState<string[]>(() => {
    const saved = localStorage.getItem(FRIENDS_KEY + '_' + currentUser.id);
    if (saved) return JSON.parse(saved);
    // By default, no friends
    return [];
  });

  // Show feedback message when adding a friend
  const [addedFriendId, setAddedFriendId] = React.useState<string | null>(null);

  // Save friends to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem(FRIENDS_KEY + '_' + currentUser.id, JSON.stringify(friends));
  }, [friends, currentUser.id]);

  // Simulate mutual friends
  const getMutualFriends = (userId: string) => Math.floor(Math.random() * 30) + 1;

  // Handle add friend
  const handleAddFriend = (userId: string) => {
    if (!friends.includes(userId)) {
      setFriends(prev => [...prev, userId]);
      setAddedFriendId(userId);
      setTimeout(() => setAddedFriendId(null), 2000); // Hide message after 2s
    }
  };

  // Handle remove friend
  const handleRemoveFriend = (userId: string) => {
    setFriends(prev => prev.filter(id => id !== userId));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4" style={{ color: '#1877f2' }}>Amis</h2>
      <div className="row">
        {allUsers.map(user => (
          <div className="col-md-3 mb-4" key={user.id}>
            <div className="card shadow-sm h-100" style={{ borderRadius: 12 }}>
              <img src={user.avatar} className="card-img-top" alt={user.fullName} style={{ height: 180, objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12 }} />
              <div className="card-body text-center p-2">
                <h5 className="card-title mb-1" style={{ fontSize: 17 }}>{user.fullName}</h5>
                <div style={{ fontSize: 13, color: '#65676b', marginBottom: 8 }}>
                  <span>
                    <img src={user.avatar} alt="mutual" style={{ width: 18, height: 18, borderRadius: '50%', marginRight: 2, border: '1px solid #fff' }} />
                    {getMutualFriends(user.id)} amis en commun
                  </span>
                </div>
                {/* Show add/remove friend button and feedback in French */}
                {friends.includes(user.id) ? (
                  <>
                    <div className="alert alert-success p-1 mb-2" style={{ fontSize: 13 }}>
                      {addedFriendId === user.id ? 'Vous êtes maintenant amis' : 'Déjà ami'}
                    </div>
                    <button className="btn btn-light btn-sm w-100" style={{ border: '1px solid #ddd', color: '#65676b', fontWeight: 600 }} onClick={() => handleRemoveFriend(user.id)}>
                      Supprimer
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-primary btn-sm w-100 mb-2" style={{ background: '#e7f3ff', color: '#1877f2', border: 'none', fontWeight: 600 }} onClick={() => handleAddFriend(user.id)}>
                      Ajouter comme ami
                    </button>
                    <button className="btn btn-light btn-sm w-100" style={{ border: '1px solid #ddd', color: '#65676b', fontWeight: 600 }} onClick={() => handleRemoveFriend(user.id)}>
                      Supprimer
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
