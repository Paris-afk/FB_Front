import { User } from './User';

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
  likes: string[]; // Array of user IDs who liked the comment
  isEdited: boolean;
}

export class CommentModel implements Comment {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
  likes: string[];
  isEdited: boolean;

  constructor(data: Comment) {
    this.id = data.id;
    this.content = data.content;
    this.author = data.author;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.likes = data.likes;
    this.isEdited = data.isEdited;
  }

  getLikesCount(): number {
    return this.likes.length;
  }

  isLikedBy(userId: string): boolean {
    return this.likes.includes(userId);
  }

  toggleLike(userId: string): void {
    const index = this.likes.indexOf(userId);
    if (index > -1) {
      this.likes.splice(index, 1);
    } else {
      this.likes.push(userId);
    }
  }

  getTimeAgo(): string {
    const now = new Date();
    const diff = now.getTime() - this.createdAt.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return this.createdAt.toLocaleDateString();
  }
}
