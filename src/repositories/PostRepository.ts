import { PostModel } from '../models/Post';
import { UserModel } from '../models/User';
import { CommentModel } from '../models/Comment';
import { DataGenerator } from './DataGenerator';

export class PostRepository {
  private static instance: PostRepository;
  private posts: PostModel[] = [];
  private users: UserModel[] = [];
  private currentUser: UserModel;

  private constructor() {
    this.initializeData();
  }

  static getInstance(): PostRepository {
    if (!PostRepository.instance) {
      PostRepository.instance = new PostRepository();
    }
    return PostRepository.instance;
  }

  private initializeData(): void {
    const feedData = DataGenerator.generateFeedData();
    this.currentUser = feedData.currentUser;
    this.users = feedData.users;
    this.posts = feedData.posts;
  }

  // Posts
  getAllPosts(): PostModel[] {
    return [...this.posts];
  }

  getPostById(id: string): PostModel | undefined {
    return this.posts.find(post => post.id === id);
  }

  createPost(content: string, imageUrl?: string): PostModel {
    const newPost = DataGenerator.generatePost(this.currentUser, this.users);
    newPost.content = content;
    newPost.imageUrl = imageUrl;
    newPost.createdAt = new Date();
    newPost.updatedAt = new Date();
    newPost.likes = [];
    newPost.comments = [];
    
    this.posts.unshift(newPost); // Agregar al inicio
    return newPost;
  }

  toggleLike(postId: string, userId: string = 'current-user'): boolean {
    const post = this.getPostById(postId);
    if (post) {
      post.toggleLike(userId);
      return post.isLikedBy(userId);
    }
    return false;
  }

  addComment(postId: string, content: string, userId: string = 'current-user'): CommentModel | null {
    const post = this.getPostById(postId);
    if (post) {
      const comment = DataGenerator.generateComment(this.currentUser);
      comment.content = content;
      comment.createdAt = new Date();
      comment.updatedAt = new Date();
      comment.likes = [];
      
      post.addComment(comment);
      return comment;
    }
    return null;
  }

  toggleCommentLike(postId: string, commentId: string, userId: string = 'current-user'): boolean {
    const post = this.getPostById(postId);
    if (post) {
      const comment = post.comments.find(c => c.id === commentId) as CommentModel;
      if (comment) {
        comment.toggleLike(userId);
        return comment.isLikedBy(userId);
      }
    }
    return false;
  }

  deletePost(postId: string): boolean {
    const index = this.posts.findIndex(post => post.id === postId);
    if (index > -1) {
      this.posts.splice(index, 1);
      return true;
    }
    return false;
  }

  // Users
  getCurrentUser(): UserModel {
    return this.currentUser;
  }

  getAllUsers(): UserModel[] {
    return [...this.users];
  }

  getUserById(id: string): UserModel | undefined {
    return this.users.find(user => user.id === id);
  }

  // Utilidades
  refreshData(): void {
    this.initializeData();
  }

  getPostsCount(): number {
    return this.posts.length;
  }

  getUsersCount(): number {
    return this.users.length;
  }
}
