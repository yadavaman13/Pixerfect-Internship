import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPost, deletePost } from '../services/localStorage';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = () => {
      try {
        const foundPost = getPost(id);
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        console.error('Error loading post:', err);
        setError('Error loading post');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadPost();
    } else {
      setError('Invalid post ID');
      setLoading(false);
    }
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      try {
        const success = deletePost(id);
        if (success) {
          navigate('/');
        } else {
          alert('Failed to delete post. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Error deleting post. Please try again.');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading post...</div>;
  }

  if (error || !post) {
    return (
      <div className="error-state">
        <h2>Post Not Found</h2>
        <p>{error || 'The post you are looking for does not exist.'}</p>
        <Link to="/" className="btn btn-secondary">
          ← Back to All Posts
        </Link>
      </div>
    );
  }

  return (
    <div className="blog-post">
      <div className="post-header">
        <Link to="/" className="back-link">
          ← Back to All Posts
        </Link>
        <div className="post-actions">
          <Link to={`/edit/${post.id}`} className="btn btn-primary">
            Edit Post
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete Post
          </button>
        </div>
      </div>
      
      <article className="post-content">
        <h1 className="post-title">{post.title}</h1>
        
        <div className="post-meta">
          <p className="post-author">by <strong>{post.author}</strong></p>
          {post.createdAt && (
            <p className="post-date">
              Published: {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          )}
          {post.lastModified && post.lastModified !== post.createdAt && (
            <p className="post-modified">
              Last modified: {new Date(post.lastModified).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          )}
        </div>

        <div className="post-body">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
};

export default BlogPost;