import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addPost } from '../services/localStorage';
import { v4 as uuidv4 } from 'uuid';

const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
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
      const newPost = {
        id: uuidv4(),
        title: formData.title.trim(),
        author: formData.author.trim(),
        content: formData.content.trim(),
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString()
      };

      const savedPost = addPost(newPost);
      
      if (savedPost) {
        navigate(`/post/${savedPost.id}`);
      } else {
        alert('Failed to create post. Please try again.');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-post">
      <div className="form-header">
        <h2>Create New Post</h2>
        <Link to="/" className="back-link">
          ← Back to All Posts
        </Link>
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
            {isSubmitting ? 'Creating...' : 'Create Post'}
          </button>
          <Link 
            to="/" 
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

export default CreatePost;