export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

// Tipos de ações para comentários
export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';

export const CLEAR_COMMENTS = 'CLEAR_COMMENTS';

// Actions Creators
export const fetchPostsRequest = () => ({
  type: FETCH_POSTS_REQUEST,
});

export const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts,
});

export const fetchPostsFailure = (error) => ({
  type: FETCH_POSTS_FAILURE,
  payload: error,
});

export const fetchCommentsRequest = () => ({
  type: FETCH_COMMENTS_REQUEST,
});

export const fetchCommentsSuccess = (comments) => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload: comments,
});

export const fetchCommentsFailure = (error) => ({
  type: FETCH_COMMENTS_FAILURE,
  payload: error,
});

export const clearComments = () => ({
  type: CLEAR_COMMENTS,
});



export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch(fetchPostsRequest());
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      const formattedPosts = data.map(post => ({
        id: post.id,
        userId: post.userId,
        title: post.title,
        description: post.body,
      }));
      dispatch(fetchPostsSuccess(formattedPosts));
    } catch (error) {
      dispatch(fetchPostsFailure(error.message));
    }
  };
};

export const fetchComments = (postId) => {
  return async (dispatch) => {
    dispatch(fetchCommentsRequest());
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      dispatch(fetchCommentsSuccess(data));
    } catch (error) {
      dispatch(fetchCommentsFailure(error.message));
    }
  };
};

