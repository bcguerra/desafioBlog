export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

export const FETCH_COMMENTS_BY_POSTID_REQUEST = 'FETCH_COMMENTS_BY_POSTID_REQUEST';
export const FETCH_COMMENTS_BY_POSTID_SUCCESS = 'FETCH_COMMENTS_BY_POSTID_SUCCESS';
export const FETCH_COMMENTS_BY_POSTID_FAILURE = 'FETCH_COMMENTS_BY_POSTID_FAILURE';

export const CLEAR_COMMENTS = 'CLEAR_COMMENTS';

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

export const fetchCommentsByPostIdRequest = () => ({
  type: FETCH_COMMENTS_BY_POSTID_REQUEST,
});

export const fetchCommentsByPostIdSuccess = (comments) => ({
  type: FETCH_COMMENTS_BY_POSTID_SUCCESS,
  payload: comments,
});

export const fetchCommentsByPostIdFailure = (error) => ({
  type: FETCH_COMMENTS_BY_POSTID_FAILURE,
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

export const fetchCommentsByPostId = (postId) => {
  return async (dispatch) => {
    dispatch(fetchCommentsByPostIdRequest());
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      dispatch(fetchCommentsByPostIdSuccess(data));
    } catch (error) {
      dispatch(fetchCommentsByPostIdFailure(error.message));
    }
  };
};

