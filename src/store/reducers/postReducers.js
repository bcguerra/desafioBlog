import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_COMMENTS_BY_POSTID_REQUEST,
  FETCH_COMMENTS_BY_POSTID_SUCCESS,
  FETCH_COMMENTS_BY_POSTID_FAILURE,
  CLEAR_COMMENTS
} from '../actions/postActions';

const initialState = {
  posts: {
    items: [],
    loading: false,
    error: null,
  },
  comments: {
    items: [],
    loading: false,
    error: null,
  },
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        posts: {
          ...state.posts,
          loading: true,
          error: null,
        },
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: {
          ...state.posts,
          loading: false,
          items: action.payload,
          error: null,
        },
      };
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        posts: {
          ...state.posts,
          loading: false,
          error: action.payload,
        },
      };

    case FETCH_COMMENTS_BY_POSTID_REQUEST:
      return {
        ...state,
        comments: {
          ...state.comments,
          loading: true,
          error: null,
        },
      };
    case FETCH_COMMENTS_BY_POSTID_SUCCESS:
      return {
        ...state,
        comments: {
          ...state.comments,
          loading: false,
          items: action.payload,
          error: null,
        },
      };
    case FETCH_COMMENTS_BY_POSTID_FAILURE:
      return {
        ...state,
        comments: {
          ...state.comments,
          loading: false,
          error: action.payload,
        },
      };
    case CLEAR_COMMENTS:
      return {
        ...state,
        comments: {
          ...initialState.comments,
        },
      };
    default:
      return state;
  }
};

export default postReducer;