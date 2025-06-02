import * as React from "react";
import { PostRepository } from "../repositories/PostRepository";
import { faker } from '@faker-js/faker';
import '../css/wall/style.css';

// Util to generate a fake conversation (French UI)
function generateConversation(userId: string, currentUserId: string) {
  const messages = [];
  let lastSender = userId;
  for (let i = 0; i < 10; i++) {
    const sender = lastSender === userId ? currentUserId : userId;
    messages.push({
      id: faker.string.uuid(),
      senderId: sender,
      text: sender === currentUserId ? faker.lorem.sentence() : faker.lorem.sentence(),
      date: faker.date.recent({ days: 10 })
    });
    lastSender = sender;
  }
  return messages.sort((a, b) => a.date.getTime() - b.date.getTime());
}

const MESSAGES_KEY = 'facebook_clone_messages';

const Messages: React.FC = () => {
  const postRepo = PostRepository.getInstance();
  const currentUser = postRepo.getCurrentUser();
  const allUsers = postRepo.getAllUsers().filter(u => u.id !== currentUser.id);

  // Load conversations from localStorage or generate
  const [conversations, setConversations] = React.useState<Record<string, any[]>>(() => {
    const saved = localStorage.getItem(MESSAGES_KEY + '_' + currentUser.id);
    if (saved) return JSON.parse(saved);
    // Generate a fake conversation for each user
    const convos: Record<string, any[]> = {};
    allUsers.forEach(user => {
      convos[user.id] = generateConversation(user.id, currentUser.id);
    });
    localStorage.setItem(MESSAGES_KEY + '_' + currentUser.id, JSON.stringify(convos));
    return convos;
  });

  // Selected conversation
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(null);
  const selectedUser = allUsers.find(u => u.id === selectedUserId);

  // Message input
  const [message, setMessage] = React.useState("");

  // Send a message
  const handleSend = () => {
    if (!selectedUserId || !message.trim()) return;
    const newMsg = {
      id: faker.string.uuid(),
      senderId: currentUser.id,
      text: message,
      date: new Date()
    };
    setConversations(prev => {
      const updated = { ...prev };
      updated[selectedUserId] = [...(updated[selectedUserId] || []), newMsg];
      localStorage.setItem(MESSAGES_KEY + '_' + currentUser.id, JSON.stringify(updated));
      return updated;
    });
    setMessage("");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4" style={{ color: '#1877f2' }}>Messages privés</h2>
      <div className="row flex-md-row flex-column-reverse">
        {/* On mobile, show chat first, then user list above */}
        <div className="col-md-8 order-2 order-md-1 mb-3 mb-md-0">
          {selectedUser ? (
            <div className="card h-100 d-flex flex-column chat-card-responsive" style={{ minHeight: 400, height: '70vh', maxHeight: 700 }}>
              <div className="card-header bg-white d-flex align-items-center" style={{ borderBottom: '1px solid #eee' }}>
                <img src={selectedUser.avatar} alt={selectedUser.fullName} style={{ width: 36, height: 36, borderRadius: '50%', marginRight: 10 }} />
                <span style={{ fontWeight: 600 }}>{selectedUser.fullName}</span>
              </div>
              <div className="card-body flex-grow-1 d-flex flex-column-reverse overflow-auto p-3 chat-body-responsive" style={{ minHeight: 0, maxHeight: 'calc(70vh - 120px)' }}>
                <div>
                  {(conversations[selectedUserId!] || []).map(msg => (
                    <div key={msg.id} className={`d-flex mb-2 ${msg.senderId === currentUser.id ? 'justify-content-end' : 'justify-content-start'}`} style={{ width: '100%' }}>
                      <div
                        className={msg.senderId === currentUser.id ? 'bg-primary text-white' : 'bg-light'}
                        style={{
                          borderRadius: 12,
                          padding: '8px 14px',
                          maxWidth: '70%',
                          fontSize: 15,
                          wordBreak: 'break-word',
                          background: msg.senderId === currentUser.id ? '#1877f2' : '#f0f2f5',
                          color: msg.senderId === currentUser.id ? 'white' : '#222'
                        }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-footer bg-white d-flex chat-footer-responsive" style={{ borderTop: '1px solid #eee' }}>
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Écrire un message..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                  style={{ minWidth: 0 }}
                />
                <button className="btn btn-primary" onClick={handleSend} disabled={!message.trim()}>
                  Envoyer
                </button>
              </div>
            </div>
          ) : (
            <div className="alert alert-info">Sélectionnez un contact pour commencer à discuter.</div>
          )}
        </div>
        <div className="col-md-4 order-1 order-md-2 mb-3 mb-md-0">
          <div className="list-group user-list-responsive">
            {allUsers.map(user => (
              <button
                key={user.id}
                className={`list-group-item list-group-item-action${selectedUserId === user.id ? ' active' : ''}`}
                onClick={() => setSelectedUserId(user.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 10 }}
              >
                <img src={user.avatar} alt={user.fullName} style={{ width: 36, height: 36, borderRadius: '50%' }} />
                <span>{user.fullName}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;

/* Responsive design improvements */
/* Add to the bottom of the file or in your CSS:
@media (max-width: 768px) {
  .card.h-100 {
    min-height: 60vh !important;
    max-height: 80vh !important;
  }
  .card-body.flex-grow-1 {
    max-height: 50vh !important;
  }
}
*/
