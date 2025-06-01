import { useState, useEffect, useCallback } from 'react';
import { PostModel } from '../models/Post';
import { UserModel } from '../models/User';
import { CommentModel } from '../models/Comment';
import { PostRepository } from '../repositories/PostRepository';

export const usePosts = () => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [currentUser, setCurrentUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const repository = PostRepository.getInstance();

  useEffect(() => {
    try {
      setLoading(true);
      const allPosts = repository.getAllPosts();
      const user = repository.getCurrentUser();
      
      setPosts(allPosts);
      setCurrentUser(user);
      setError(null);
    } catch (err) {
      setError('Error loading posts');
      console.error('Error loading posts:', err);
    } finally {
      setLoading(false);
    }
  }, [repository]);

  const createPost = useCallback((content: string, imageUrl?: string): PostModel | null => {
    try {
      const newPost = repository.createPost(content, imageUrl);
      setPosts(repository.getAllPosts()); // Refresh posts
      return newPost;
    } catch (err) {
      setError('Error creating post');
      console.error('Error creating post:', err);
      return null;
    }
  }, [repository]);

  const toggleLike = useCallback((postId: string): boolean => {
    try {
      const isLiked = repository.toggleLike(postId);
      setPosts(repository.getAllPosts()); // Refresh posts to update UI
      return isLiked;
    } catch (err) {
      setError('Error toggling like');
      console.error('Error toggling like:', err);
      return false;
    }
  }, [repository]);

  const addComment = useCallback((postId: string, content: string): CommentModel | null => {
    try {
      const comment = repository.addComment(postId, content);
      setPosts(repository.getAllPosts()); // Refresh posts to update UI
      return comment;
    } catch (err) {
      setError('Error adding comment');
      console.error('Error adding comment:', err);
      return null;
    }
  }, [repository]);

  const toggleCommentLike = useCallback((postId: string, commentId: string): boolean => {
    try {
      const isLiked = repository.toggleCommentLike(postId, commentId);
      setPosts(repository.getAllPosts()); // Refresh posts to update UI
      return isLiked;
    } catch (err) {
      setError('Error toggling comment like');
      console.error('Error toggling comment like:', err);
      return false;
    }
  }, [repository]);

  const deletePost = useCallback((postId: string): boolean => {
    try {
      const success = repository.deletePost(postId);
      if (success) {
        setPosts(repository.getAllPosts()); // Refresh posts
      }
      return success;
    } catch (err) {
      setError('Error deleting post');
      console.error('Error deleting post:', err);
      return false;
    }
  }, [repository]);

  const refreshPosts = useCallback(() => {
    try {
      setLoading(true);
      repository.refreshData();
      setPosts(repository.getAllPosts());
      setCurrentUser(repository.getCurrentUser());
      setError(null);
    } catch (err) {
      setError('Error refreshing posts');
      console.error('Error refreshing posts:', err);
    } finally {
      setLoading(false);
    }
  }, [repository]);

  return {
    posts,
    currentUser,
    loading,
    error,
    createPost,
    toggleLike,
    addComment,
    toggleCommentLike,
    deletePost,
    refreshPosts
  };
};
