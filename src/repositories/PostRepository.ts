import { PostModel, Post } from '../models/Post';
import { UserModel, User } from '../models/User';
import { CommentModel, Comment } from '../models/Comment';
import { DataGenerator } from './DataGenerator';

interface StorageData {
  posts: any[];
  users: any[];
  currentUser: any;
  lastUpdated: string;
}

export class PostRepository {
  private static instance: PostRepository;
  private posts: PostModel[] = [];
  private users: UserModel[] = [];
  private currentUser: UserModel;
  private readonly STORAGE_KEY = 'facebook_clone_data';

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
    const savedData = this.loadFromStorage();
    
    if (savedData) {
      // Cargar datos desde localStorage
      this.currentUser = new UserModel(this.deserializeUser(savedData.currentUser));
      this.users = savedData.users.map(userData => new UserModel(this.deserializeUser(userData)));
      this.posts = savedData.posts.map(postData => new PostModel(this.deserializePost(postData)));
      console.log('Datos cargados desde localStorage:', this.posts.length, 'posts');
    } else {
      // Generar datos iniciales con faker
      const feedData = DataGenerator.generateFeedData();
      this.currentUser = feedData.currentUser;
      this.users = feedData.users;
      this.posts = feedData.posts;
      this.saveToStorage();
      console.log('Datos iniciales generados y guardados en localStorage');
    }
  }

  private loadFromStorage(): StorageData | null {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      localStorage.removeItem(this.STORAGE_KEY);
    }
    return null;
  }

  private saveToStorage(): void {
    try {
      const data: StorageData = {
        posts: this.posts.map(post => this.serializePost(post)),
        users: this.users.map(user => this.serializeUser(user)),
        currentUser: this.serializeUser(this.currentUser),
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      console.log('Datos guardados en localStorage');
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }

  private serializePost(post: PostModel): any {
    return {
      id: post.id,
      content: post.content,
      author: this.serializeUser(post.author),
      type: post.type,
      imageUrl: post.imageUrl,
      videoUrl: post.videoUrl,
      linkUrl: post.linkUrl,
      linkTitle: post.linkTitle,
      linkDescription: post.linkDescription,
      likes: post.likes,
      shares: post.shares,
      comments: post.comments.map(comment => this.serializeComment(comment)),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      isEdited: post.isEdited,
      privacy: post.privacy
    };
  }

  private deserializePost(data: any): Post {
    return {
      id: data.id,
      content: data.content,
      author: this.deserializeUser(data.author),
      type: data.type || 'text',
      imageUrl: data.imageUrl,
      videoUrl: data.videoUrl,
      linkUrl: data.linkUrl,
      linkTitle: data.linkTitle,
      linkDescription: data.linkDescription,
      likes: data.likes || [],
      shares: data.shares || 0,
      comments: (data.comments || []).map(commentData => new CommentModel(this.deserializeComment(commentData))),
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      isEdited: data.isEdited || false,
      privacy: data.privacy || 'public'
    };
  }

  private serializeComment(comment: CommentModel): any {
    return {
      id: comment.id,
      content: comment.content,
      author: this.serializeUser(comment.author),
      likes: comment.likes,
      createdAt: comment.createdAt.toISOString(),
      updatedAt: comment.updatedAt.toISOString(),
      isEdited: comment.isEdited
    };
  }

  private deserializeComment(data: any): Comment {
    return {
      id: data.id,
      content: data.content,
      author: this.deserializeUser(data.author),
      likes: data.likes || [],
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      isEdited: data.isEdited || false
    };
  }

  private serializeUser(user: User): any {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      isOnline: user.isOnline,
      lastSeen: user.lastSeen.toISOString(),
      joinDate: user.joinDate.toISOString()
    };
  }

  private deserializeUser(data: any): User {
    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      fullName: data.fullName,
      email: data.email,
      avatar: data.avatar,
      bio: data.bio,
      isOnline: data.isOnline || false,
      lastSeen: new Date(data.lastSeen),
      joinDate: new Date(data.joinDate)
    };
  }

  // Posts
  getAllPosts(): PostModel[] {
    return [...this.posts];
  }

  getPostById(id: string): PostModel | undefined {
    return this.posts.find(post => post.id === id);
  }

  createPost(content: string, imageUrl?: string): PostModel {
    const newPostData: Post = {
      id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      content: content,
      author: this.currentUser,
      type: imageUrl ? 'image' : 'text',
      imageUrl: imageUrl,
      likes: [],
      shares: 0,
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isEdited: false,
      privacy: 'public'
    };
    
    const newPost = new PostModel(newPostData);
    this.posts.unshift(newPost); // Agregar al inicio
    this.saveToStorage(); // Guardar inmediatamente
    return newPost;
  }

  toggleLike(postId: string, userId: string = 'current-user'): boolean {
    const post = this.getPostById(postId);
    if (post) {
      post.toggleLike(userId);
      this.saveToStorage(); // Guardar cambios
      return post.isLikedBy(userId);
    }
    return false;
  }

  addComment(postId: string, content: string, userId: string = 'current-user'): CommentModel | null {
    const post = this.getPostById(postId);
    if (post) {
      const commentData: Comment = {
        id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        content: content,
        author: this.currentUser,
        likes: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        isEdited: false
      };
      
      const comment = new CommentModel(commentData);
      post.addComment(comment);
      this.saveToStorage(); // Guardar cambios
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
        this.saveToStorage(); // Guardar cambios
        return comment.isLikedBy(userId);
      }
    }
    return false;
  }

  deletePost(postId: string): boolean {
    const index = this.posts.findIndex(post => post.id === postId);
    if (index > -1) {
      this.posts.splice(index, 1);
      this.saveToStorage(); // Guardar cambios
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

  // Métodos para gestión de localStorage
  clearStorage(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    console.log('LocalStorage limpiado');
  }

  resetToInitialData(): void {
    this.clearStorage();
    const feedData = DataGenerator.generateFeedData();
    this.currentUser = feedData.currentUser;
    this.users = feedData.users;
    this.posts = feedData.posts;
    this.saveToStorage();
    console.log('Datos reiniciados a valores iniciales');
  }

  exportData(): string {
    return JSON.stringify({
      posts: this.posts.map(post => this.serializePost(post)),
      users: this.users.map(user => this.serializeUser(user)),
      currentUser: this.serializeUser(this.currentUser),
      lastUpdated: new Date().toISOString()
    }, null, 2);
  }
}
