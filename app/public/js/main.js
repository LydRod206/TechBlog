// Function to handle user login
const handleLogin = async (event) => {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const credentials = {
      username,
      password,
    };
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      if (response.ok) {
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Login failed';
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
    }
  };
  
  document.getElementById('login-form').addEventListener('submit', handleLogin);
  
  // Function to handle user signup
  const handleSignup = async (event) => {
    event.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const credentials = {
      username,
      password,
    };
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      if (response.ok) {
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Signup failed';
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup. Please try again.');
    }
  };
  
  document.getElementById('signup-form').addEventListener('submit', handleSignup);
  
  // Function to handle adding a new blog post
  const handleAddPost = async (event) => {
    event.preventDefault();
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const newPost = {
      title,
      content,
    };
  
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
  
      if (response.ok) {
        window.location.href = '/dashboard';
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Failed to save the new blog post';
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Add post error:', error);
      alert('An error occurred while adding the new blog post. Please try again.');
    }
  };
  
  document.getElementById('add-post-form').addEventListener('submit', handleAddPost);
  
  // Function to handle updating a blog post
const handleUpdatePost = (event, postId) => {
    event.preventDefault();
    const updatedTitle = document.getElementById(`post-title-${postId}`).value;
    const updatedContent = document.getElementById(`post-content-${postId}`).value;
    fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: updatedTitle, content: updatedContent }),
    })
      .then(response => {
        if (response.ok) {
          window.location.href = '/dashboard';
        } else {
          throw new Error('Failed to update the blog post');
        }
      })
      .catch(error => {
        console.error(error);
        alert('An error occurred while updating the blog post. Please try again.');
      });
  };
  
  // Function to handle deleting a blog post
  const handleDeletePost = (postId) => {
    fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          window.location.reload();
        } else {
          throw new Error('Failed to delete the blog post');
        }
      })
      .catch(error => {
        console.error(error);
        alert('An error occurred while deleting the blog post. Please try again.');
      });
  };
  
  // Function to handle adding a new comment
  const handleAddComment = (event, postId) => {
    event.preventDefault();
    const comment = document.getElementById(`comment-${postId}`).value;
    fetch(`/api/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment }),
    })
      .then(response => {
        if (response.ok) {
          window.location.reload();
        } else {
          throw new Error('Failed to add the comment');
        }
      })
      .catch(error => {
        console.error(error);
        alert('An error occurred while adding a comment. Please try again.');
      });
  };
  
  // Function to handle user logout
  const handleLogout = () => {
    fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          window.location.href = '/login';
        } else {
          throw new Error('Failed to logout');
        }
      })
      .catch(error => {
        console.error(error);
        alert('An error occurred during logout. Please try again.');
      });
  };
  
  document.getElementById('login-form').addEventListener('submit', handleLogin);
  document.getElementById('signup-form').addEventListener('submit', handleSignup);
  document.getElementById('add-post-form').addEventListener('submit', handleAddPost);
  
  // Attach event listeners to dynamic elements (using event delegation)
  document.addEventListener('click', (event) => {
    if (event.target.matches('.update-post-btn')) {
      const postId = event.target.dataset.postId;
      handleUpdatePost(event, postId);
    } else if (event.target.matches('.delete-post-btn')) {
      const postId = event.target.dataset.postId;
      handleDeletePost(postId);
    } else if (event.target.matches('.add-comment-btn')) {
      const postId = event.target.dataset.postId;
      handleAddComment(event, postId);
    }
  });
  
  document.getElementById('logout-btn').addEventListener('click', handleLogout);
  
  // Check if the user is logged in and show/hide relevant elements
const checkLoginStatus = () => {
    const isLoggedIn = true;
    
    if (isLoggedIn) {
      document.getElementById('login-link').style.display = 'none';
      document.getElementById('signup-link').style.display = 'none';
      document.getElementById('dashboard-link').style.display = 'block';
      document.getElementById('logout-link').style.display = 'block';
      document.getElementById('add-post-form').style.display = 'block';
    } else {
      document.getElementById('login-link').style.display = 'block';
      document.getElementById('signup-link').style.display = 'block';
      document.getElementById('dashboard-link').style.display = 'none';
      document.getElementById('logout-link').style.display = 'none';
      document.getElementById('add-post-form').style.display = 'none';
    }
  };
  
  checkLoginStatus();
  
  