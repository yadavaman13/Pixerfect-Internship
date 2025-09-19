// localStorage service for blog posts

const POSTS_KEY = 'blogPosts';

// Get all posts from localStorage
export const getPosts = () => {
  try {
    const posts = localStorage.getItem(POSTS_KEY);
    return posts ? JSON.parse(posts) : [];
  } catch (error) {
    console.error('Error reading posts from localStorage:', error);
    return [];
  }
};

// Save posts to localStorage
const savePosts = (posts) => {
  try {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
    return true;
  } catch (error) {
    console.error('Error saving posts to localStorage:', error);
    return false;
  }
};

// Add a new post
export const addPost = (post) => {
  try {
    const posts = getPosts();
    const newPost = {
      ...post,
      id: post.id || Date.now().toString(), // Fallback ID if not provided
      createdAt: post.createdAt || new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
    posts.push(newPost);
    savePosts(posts);
    return newPost;
  } catch (error) {
    console.error('Error adding post:', error);
    return null;
  }
};

// Get a single post by ID
export const getPost = (id) => {
  try {
    const posts = getPosts();
    return posts.find(post => post.id === id) || null;
  } catch (error) {
    console.error('Error getting post:', error);
    return null;
  }
};

// Update an existing post
export const updatePost = (updatedPost) => {
  try {
    const posts = getPosts();
    const index = posts.findIndex(post => post.id === updatedPost.id);
    
    if (index === -1) {
      console.error('Post not found for update');
      return false;
    }
    
    posts[index] = {
      ...posts[index],
      ...updatedPost,
      lastModified: new Date().toISOString()
    };
    
    return savePosts(posts);
  } catch (error) {
    console.error('Error updating post:', error);
    return false;
  }
};

// Delete a post by ID
export const deletePost = (id) => {
  try {
    const posts = getPosts();
    const filteredPosts = posts.filter(post => post.id !== id);
    
    if (filteredPosts.length === posts.length) {
      console.error('Post not found for deletion');
      return false;
    }
    
    return savePosts(filteredPosts);
  } catch (error) {
    console.error('Error deleting post:', error);
    return false;
  }
};

// Clear all posts (utility function)
export const clearAllPosts = () => {
  try {
    localStorage.removeItem(POSTS_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing posts:', error);
    return false;
  }
};

// Initialize with sample data if no posts exist
export const initializeSampleData = () => {
  const posts = getPosts();
  if (posts.length === 0) {
    const samplePosts = [
      {
        id: '1',
        title: 'Welcome to Our Blog',
        author: 'Blog Admin',
        content: 'This is your first blog post! You can edit or delete this post, or create new ones using the navigation above.',
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Getting Started with React',
        author: 'React Developer',
        content: 'React is a powerful JavaScript library for building user interfaces. In this post, we\'ll explore the basics of React components, state management, and props.',
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        lastModified: new Date(Date.now() - 86400000).toISOString()
      }
    ];
    
    savePosts(samplePosts);
    return samplePosts;
  }
  return posts;
};