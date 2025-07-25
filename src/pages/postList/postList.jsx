import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../../store/actions/postActions';
import { fetchUsers } from '../../store/actions/userActions';
import PostCard from '../../components/postCard';

import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
  TextField,
  MenuItem,
  Grid,
  Fade,
  Pagination,
} from '@mui/material';

import styles from './postList.module.css';

function PostList() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts.items);
  const postsLoading = useSelector((state) => state.posts.posts.loading);
  const postsError = useSelector((state) => state.posts.posts.error);

  const users = useSelector((state) => state.users.items);
  const usersLoading = useSelector((state) => state.users.loading);
  const usersError = useSelector((state) => state.users.error);

  const [selectedUser, setSelectedUser] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const postsGridRef = useRef(null);

  useEffect(() => {
    if (!postsLoading && posts.length === 0 && !postsError) {
      dispatch(fetchPosts());
    }
    if (!usersLoading && users.length === 0 && !usersError) {
      dispatch(fetchUsers());
    }
  }, [dispatch, postsLoading, posts.length, postsError, usersLoading, users.length, usersError]);

  useEffect(() => {
    let currentPosts = posts;
    if (selectedUser) {
      const userFound = users.find((user) => user.name === selectedUser);
      if (userFound) {
        currentPosts = posts.filter((post) => post.userId === userFound.id);
      } else {
        currentPosts = [];
      }
    }
    setFilteredPosts(currentPosts);
    setCurrentPage(1);
  }, [posts, users, selectedUser]);

  useEffect(() => {
    if (currentPage > 1) {
      postsGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage, selectedUser, filteredPosts]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPostsToDisplay = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  let content;

  if (postsLoading || usersLoading) {
    content = (
      <Box className={styles.loadingContainer}>
        <CircularProgress size={60} thickness={4} color="primary" />
        <Typography variant="h6" color="text.secondary" className={styles.loadingText}>
          Carregando conteúdo...
        </Typography>
      </Box>
    );
  } else if (postsError || usersError) {
    content = (
      <Alert severity="error" className={styles.errorAlert}>
        <Typography variant="h6" component="div">
          Ocorreu um erro!
        </Typography>
        <Typography variant="body1">
          Não foi possível carregar os dados. Por favor, tente novamente mais tarde.
          {postsError && ` Erro posts: ${postsError}`}
          {usersError && ` Erro usuários: ${usersError}`}
        </Typography>
      </Alert>
    );
  } else if (posts.length === 0) {
    content = (
      <Box className={styles.noContentContainer}>
        <Typography variant="h5" color="text.secondary">
          Nenhuma postagem encontrada.
        </Typography>
        <Typography variant="body1" color="text.secondary" className={styles.noContentText}>
          Parece que não há posts para exibir no momento.
        </Typography>
      </Box>
    );
  } else {
    content = (
      <Fade in={true} timeout={500}>
        {currentPostsToDisplay.length > 0 ? (
          <Box>
            <Grid
              container
              spacing={4}
              justifyContent="center"
              alignItems="stretch"
              ref={postsGridRef}
            >
              {currentPostsToDisplay.map((post) => {
                const author = users.find((user) => user.id === post.userId);
                const authorName = author ? author.name : `Usuário ${post.userId}`;
                return (
                  <Grid key={post.id}>
                    <PostCard
                      id={post.id}
                      userId={post.userId}
                      user={authorName}
                      title={post.title}
                      description={post.description}
                    />
                  </Grid>
                );
              })}
            </Grid>
            {totalPages > 1 && (
              <Box className={styles.paginationContainer}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="small"
                />
              </Box>
            )}
          </Box>
        ) : (
          <Grid>
            <Box className={styles.noPostsForUserContainer}>
              <Typography variant="h5" color="text.secondary">
                Nenhuma postagem encontrada para o usuário selecionado.
              </Typography>
              <Typography variant="body1" color="text.secondary" className={styles.noPostsForUserText}>
                Tente selecionar "Todos os Autores" para ver mais posts.
              </Typography>
            </Box>
          </Grid>
        )}
      </Fade>
    );
  }

  return (
    <Container maxWidth="xl" className={styles.postListContainer}>
      <Box className={styles.headerContainer}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          className={styles.pageTitle}
        >
          Conheça nosso BLOG!
        </Typography>
        <Typography variant="h5" color="text.secondary" className={styles.subtitle}>
          Explore todas as postagens da nossa comunidade.
        </Typography>
      </Box>

      <Box className={styles.filterSection}>
        <TextField
          select
          label="Filtrar por Autor"
          value={selectedUser}
          onChange={handleUserChange}
          variant="outlined"
          className={styles.authorFilter}
          disabled={usersLoading || usersError || users.length === 0}
          helperText={usersLoading ? 'Carregando autores...' : usersError ? 'Erro ao carregar autores' : ''}
        >
          <MenuItem value="">Todos os Autores</MenuItem>
          {users.map((user) => (
            <MenuItem key={user.id} value={user.name}>
              {user.name}
            </MenuItem>
          ))}
        </TextField>
        {usersLoading && <CircularProgress size={24} />}
      </Box>

      {content}
    </Container>
  );
}

export default PostList;