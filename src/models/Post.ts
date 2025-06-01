import { User } from './User';
import { CommentModel } from './Comment';

export type PostType = 'text' | 'image' | 'video' | 'link';

export interface Post {
  id: string;
  content: string;
  author: User;
  type: PostType;
  imageUrl?: string;
  videoUrl?: string;
  linkUrl?: string;
  linkTitle?: string;
  linkDescription?: string;
  createdAt: Date;
  updatedAt: Date;
  likes: string[]; // Array of user IDs who liked the post
  comments: CommentModel[];
  shares: number;
  isEdited: boolean;
  privacy: 'public' | 'friends' | 'private';
}

export class PostModel implements Post {
  id: string;
  content: string;
  author: User;
  type: PostType;
  imageUrl?: string;
  videoUrl?: string;
  linkUrl?: string;
  linkTitle?: string;
  linkDescription?: string;
  createdAt: Date;
  updatedAt: Date;
  likes: string[];
  comments: CommentModel[];
  shares: number;
  isEdited: boolean;
  privacy: 'public' | 'friends' | 'private';

  constructor(data: Post) {
    this.id = data.id;
    this.content = data.content;
    this.author = data.author;
    this.type = data.type;
    this.imageUrl = data.imageUrl;
    this.videoUrl = data.videoUrl;
    this.linkUrl = data.linkUrl;
    this.linkTitle = data.linkTitle;
    this.linkDescription = data.linkDescription;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.likes = data.likes;
    this.comments = data.comments;
    this.shares = data.shares;
    this.isEdited = data.isEdited;
    this.privacy = data.privacy;
  }

  getLikesCount(): number {
    return this.likes.length;
  }

  getCommentsCount(): number {
    return this.comments.length;
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

  addComment(comment: CommentModel): void {
    this.comments.push(comment);
  }

  removeComment(commentId: string): void {
    this.comments = this.comments.filter(comment => comment.id !== commentId);
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

  hasMedia(): boolean {
    return !!(this.imageUrl || this.videoUrl);
  }

  hasLink(): boolean {
    return !!this.linkUrl;
  }
}
