import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  CLEAR_COMMENTS
} from '../actions/postActions'; // Assumindo que todas as actions vêm daqui

const initialState = {
  // Estado para os posts
  posts: {
    items: [],
    loading: false,
    error: null,
  },
  // Estado para os comentários do post atualmente visualizado
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
        posts: { // Atualiza apenas a fatia 'posts'
          ...state.posts,
          loading: true,
          error: null,
        },
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: { // Atualiza apenas a fatia 'posts'
          ...state.posts,
          loading: false,
          items: action.payload,
          error: null,
        },
      };
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        posts: { // Atualiza apenas a fatia 'posts'
          ...state.posts,
          loading: false,
          error: action.payload,
        },
      };

    case FETCH_COMMENTS_REQUEST:
      return {
        ...state,
        comments: { // Atualiza apenas a fatia 'comments'
          ...state.comments,
          loading: true,
          error: null,
        },
      };
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: { // Atualiza apenas a fatia 'comments'
          ...state.comments,
          loading: false,
          items: action.payload, // Agora os comentários vão para 'comments.items'
          error: null,
        },
      };
    case FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        comments: { // Atualiza apenas a fatia 'comments'
          ...state.comments,
          loading: false,
          error: action.payload,
        },
      };
    case CLEAR_COMMENTS: // Novo case para limpar os comentários
      return {
        ...state,
        comments: {
          ...initialState.comments, // Reseta o estado dos comentários para o valor inicial
        },
      };
    default:
      return state;
  }
};

export default postReducer;