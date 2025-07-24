import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCommentsByPostId, fetchPosts, clearComments } from '../../store/actions/postActions';
import { fetchUsers } from '../../store/actions/userActions';
import CommentCard from '../../components/commentCards';

import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Button,
  Divider,
  Fade,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import styles from './PostDetail.module.css';

function PostDetail() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allPostsItems = useSelector((state) => state.posts.posts.items || []);

  const post = allPostsItems.find((p) => p.id === parseInt(postId));

  const postsLoading = useSelector((state) => state.posts.posts.loading);
  const postsError = useSelector((state) => state.posts.posts.error);

  const comments = useSelector((state) => state.posts.comments.items);
  const commentsLoading = useSelector((state) => state.posts.comments.loading);
  const commentsError = useSelector((state) => state.posts.comments.error);

  const users = useSelector((state) => state.users.items || []);
  const usersLoading = useSelector((state) => state.users.loading);
  const usersError = useSelector((state) => state.users.error);

  const author = users.find(user => user.id === post?.userId);
  const authorName = author ? author.name : `Usuário ${post?.userId || 'desconhecido'}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);

  useEffect(() => {
    if (allPostsItems.length === 0 && !postsLoading && !postsError) {
      dispatch(fetchPosts());
    }

    dispatch(clearComments());
    if (postId) {
      dispatch(fetchCommentsByPostId(postId));
    }

    if (users.length === 0 && !usersLoading && !usersError) {
      dispatch(fetchUsers());
    }
  }, [dispatch, postId, post, allPostsItems.length, postsLoading, postsError, users.length, usersLoading, usersError]);


  let content;

  if (postsLoading || usersLoading) {
    content = (
      <Box className={`${styles.messageBox} ${styles.mainLoading}`}>
        <CircularProgress size={60} thickness={4} color="primary" />
        <Typography variant="h6" color="text.secondary" sx={{ mt: 3 }}>
          Carregando detalhes do post e autor...
        </Typography>
      </Box>
    );
  } else if (postsError || usersError) {
    content = (
      <Alert severity="error" className={styles.alertBox}>
        <Typography variant="h6" component="div">
          Ocorreu um erro!
        </Typography>
        <Typography variant="body1">
          Não foi possível carregar o post ou os dados do autor. Por favor, tente novamente mais tarde.
          {postsError && ` Erro posts: ${postsError}`}
          {usersError && ` Erro usuários: ${usersError}`}
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
          onClick={() => navigate('/')}
        >
          Voltar para a lista
        </Button>
      </Alert>
    );
  } else if (!post) {
    content = (
      <Box className={styles.messageBox}>
        <Typography variant="h5" color="text.secondary">
          Post não encontrado.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Parece que o post que você procura não existe ou foi removido.
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
          onClick={() => navigate('/')}
        >
          Voltar para a lista
        </Button>
      </Box>
    );
  } else {
    content = (
      <Fade in={true} timeout={500}>
        <Box className={styles.contentBox}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            className={styles.postTitle}
          >
            {post.title}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
            Por:{' '}
            {author && post?.userId ? (
              <Link
                to={`/user/${post.userId}`}
                className={styles.authorLink}
              >
                <Typography component="span" variant="subtitle1" className={styles.authorNameSpan}>
                  {authorName}
                </Typography>
              </Link>
            ) : (
              authorName
            )}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography
            variant="body1"
            paragraph
            className={styles.postBody}
          >
            {post.description}
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            className={styles.commentsTitle}
          >
            Comentários
          </Typography>

          {commentsLoading && (
            <Box className={styles.commentsLoadingBox}>
              <CircularProgress size={30} />
              <Typography variant="body1" color="text.secondary" sx={{ ml: 2 }}>Carregando comentários...</Typography>
            </Box>
          )}

          {commentsError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              <Typography variant="body1">
                Erro ao carregar comentários: {commentsError}
              </Typography>
            </Alert>
          )}

          {!commentsLoading && !commentsError && comments.length === 0 && (
            <Box className={styles.noCommentsBox}>
              <Typography variant="body2" color="text.secondary">
                Nenhum comentário para este post ainda. Seja o primeiro a comentar!
              </Typography>
            </Box>
          )}

          {!commentsLoading && !commentsError && comments.length > 0 && (
            <Box sx={{ mt: 2 }}>
              {comments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  name={comment.name}
                  email={comment.email}
                  body={comment.body}
                />
              ))}
            </Box>
          )}
        </Box>
      </Fade>
    );
  }

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        className={styles.backButton}
      >
        Lista de posts
      </Button>

      {content}
    </Container>
  );
}

export default PostDetail;
