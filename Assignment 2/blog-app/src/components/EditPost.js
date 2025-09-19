import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPost, updatePost } from '../services/localStorage';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = () => {
      try {
        const post = getPost(id);
        
        if (post) {
          setFormData({
            title: post.title,
            author: post.author,
            content: post.content
          });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author name is required';
    } else if (formData.author.trim().length < 2) {
      newErrors.author = 'Author name must be at least 2 characters long';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.trim().length < 10) {
      newErrors.content = 'Content must be at least 10 characters long';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const originalPost = getPost(id);
      
      if (!originalPost) {
        alert('Post not found. It may have been deleted.');
        navigate('/');
        return;
      }

      const updatedPostData = {
        ...originalPost,
        title: formData.title.trim(),
        author: formData.author.trim(),
        content: formData.content.trim(),
        lastModified: new Date().toISOString()
      };

      const success = updatePost(updatedPostData);
      
      if (success) {
        navigate(`/post/${id}`);
      } else {
        alert('Failed to update post. Please try again.');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Error updating post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading post...</div>;
  }

  if (error) {
    return (
      <div className="error-state">
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/" className="btn btn-secondary">
          ← Back to All Posts
        </Link>
      </div>
    );
  }

  return (
    <div className="edit-post">
      <div className="form-header">
        <h2>Edit Post</h2>
        <div className="header-actions">
          <Link to={`/post/${id}`} className="back-link">
            ← Back to Post
          </Link>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="title">Post Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? 'error' : ''}
            placeholder="Enter an engaging title for your post"
            maxLength="100"
            disabled={isSubmitting}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="author">Author Name *</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={errors.author ? 'error' : ''}
            placeholder="Your name"
            maxLength="50"
            disabled={isSubmitting}
          />
          {errors.author && <span className="error-message">{errors.author}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="content">Post Content *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className={errors.content ? 'error' : ''}
            placeholder="Write your post content here..."
            rows="12"
            disabled={isSubmitting}
          />
          {errors.content && <span className="error-message">{errors.content}</span>}
          <small className="char-count">
            {formData.content.length} characters
          </small>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update Post'}
          </button>
          <Link 
            to={`/post/${id}`} 
            className="btn btn-secondary"
            style={{ pointerEvents: isSubmitting ? 'none' : 'auto' }}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditPost;