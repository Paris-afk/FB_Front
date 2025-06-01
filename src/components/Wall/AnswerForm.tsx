import * as React from "react";
import { User } from "../../models/User";

interface AnswerFormProps {
  currentUser: User;
  onSubmit: (content: string) => void;
  placeholder?: string;
}

function AnswerForm({ currentUser, onSubmit, placeholder = "Write a comment..." }: AnswerFormProps) {
  const [comment, setComment] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment.trim());
      setComment("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div>
      <div className="row g-0 comentario">
        <div className="col-auto photo">
          <a href="/#">
            <img src={currentUser.avatar} alt={currentUser.fullName} />
          </a>
        </div>
        <div className="col">
          <form onSubmit={handleSubmit}>
            <textarea 
              name="comment" 
              id="comment"
              placeholder={placeholder}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={2}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AnswerForm;
