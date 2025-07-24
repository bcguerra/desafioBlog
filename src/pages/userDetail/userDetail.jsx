import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserById } from '../../store/actions/userActions';

import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Button,
  Paper,
  Divider,
  Fade,
  Link as MuiLink,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function UserDetail() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) =>
    state.users.items.find((u) => u.id === parseInt(userId))
  );
  const userLoading = useSelector((state) => state.users.loading);
  const userError = useSelector((state) => state.users.error);

  useEffect(() => {
    if (!user && !userLoading && !userError) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId, user, userLoading, userError]);

  let content;

  if (userLoading) {
    content = (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          py: 4,
        }}
      >
        <CircularProgress size={60} thickness={4} color="primary" />
        <Typography variant="h6" color="text.secondary" sx={{ mt: 3 }}>
          Carregando dados do usuário...
        </Typography>
      </Box>
    );
  } else if (userError) {
    content = (
      <Alert severity="error" sx={{ mt: 4, mx: 'auto', maxWidth: 600 }}>
        <Typography variant="h6" component="div">
          Ocorreu um erro!
        </Typography>
        <Typography variant="body1">
          Não foi possível carregar os dados do usuário.
          {userError && ` Erro: ${userError}`}
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
  } else if (!user) {
    content = (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '30vh',
          py: 4,
        }}
      >
        <Typography variant="h5" color="text.secondary">
          Usuário não encontrado.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Usuário que você procura não existe.
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
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, md: 4 },
            mb: 4,
            borderRadius: 2,
            bgcolor: 'background.paper',
            boxShadow: 3,
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: 'primary.dark',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              }}
            >
              {user.name}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              @{user.username}
            </Typography>
            <Divider sx={{ my: 3 }} />
          </Box>

          <Box sx={{ '& .MuiTypography-root': { mb: 1 } }}>
            <Typography variant="body1" color="text.primary">
              <Typography component="span" sx={{ fontWeight: 'bold', mr: 1 }}>Email:</Typography>
              {user.email}
            </Typography>
            <Typography variant="body1" color="text.primary">
              <Typography component="span" sx={{ fontWeight: 'bold', mr: 1 }}>Telefone:</Typography>
              {user.phone}
            </Typography>
            <Typography variant="body1" color="text.primary">
              <Typography component="span" sx={{ fontWeight: 'bold', mr: 1 }}>Website:</Typography>
              <MuiLink href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none', color: 'primary.main', '&:hover': { textDecoration: 'underline' } }}>
                {user.website}
              </MuiLink>
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" component="h2" gutterBottom sx={{ color: 'primary.dark', fontWeight: 'bold' }}>
              Endereço
            </Typography>
            <Typography variant="body1" color="text.primary">
              <Typography component="span" sx={{ fontWeight: 'bold', mr: 1 }}>Rua:</Typography>
              {user.address.street}, {user.address.suite}
            </Typography>
            <Typography variant="body1" color="text.primary">
              <Typography component="span" sx={{ fontWeight: 'bold', mr: 1 }}>Cidade:</Typography>
              {user.address.city}
            </Typography>
            <Typography variant="body1" color="text.primary">
              <Typography component="span" sx={{ fontWeight: 'bold', mr: 1 }}>CEP:</Typography>
              {user.address.zipcode}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" component="h2" gutterBottom sx={{ color: 'primary.dark', fontWeight: 'bold' }}>
              Empresa
            </Typography>
            <Typography variant="body1" color="text.primary">
              <Typography component="span" sx={{ fontWeight: 'bold', mr: 1 }}>Nome:</Typography>
              {user.company.name}
            </Typography>
            <Typography variant="body1" color="text.primary">
              <Typography component="span" sx={{ fontWeight: 'bold', mr: 1 }}>Slogan:</Typography>
              "{user.company.catchPhrase}"
            </Typography>
            <Typography variant="body2" color="text.secondary">
              "{user.company.bs}"
            </Typography>
          </Box>
        </Paper>
      </Fade>
    );
  }

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 4, px: 3, py: 1.5, borderRadius: 2 }}
      >
        Lista de posts
      </Button>

      {content}
    </Container>
  );
}

export default UserDetail;