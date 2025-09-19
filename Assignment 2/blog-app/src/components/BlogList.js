import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, initializeSampleData } from '../services/localStorage';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = () => {
      try {
        // Initialize sample data if no posts exist
        const allPosts = initializeSampleData();
        setPosts(allPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const refreshPosts = () => {
    const allPosts = getPosts();
    setPosts(allPosts);
  };

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  return (
    <div className="blog-list">
      <div className="list-header">
        <h2>All Blog Posts</h2>
        <Link to="/create" className="btn btn-primary">
          Create New Post
        </Link>
      </div>
      
      {posts.length === 0 ? (
        <div className="no-posts">
          <p>No posts yet. Create your first post!</p>
          <Link to="/create" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      ) : (
        <div className="posts-grid">
          {posts
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by newest first
            .map((post) => (
              <div key={post.id} className="post-card">
                <h3>{post.title}</h3>
                <p className="post-author">by {post.author}</p>
                {post.createdAt && (
                  <p className="post-date">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                )}
                <p className="post-preview">
                  {post.content.length > 150 
                    ? `${post.content.substring(0, 150)}...` 
                    : post.content
                  }
                </p>
                <div className="post-card-actions">
                  <Link to={`/post/${post.id}`} className="btn btn-secondary">
                    Read More
                  </Link>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;