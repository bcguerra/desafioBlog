import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';

function PostCard({ id, user, userId, title, description }) {
  const CARD_MIN_HEIGHT = 80;
  const CARD_WIDTH_PX = 300;

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: CARD_WIDTH_PX,
        minWidth: 280,
        height: '100%',
        minHeight: CARD_MIN_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
        },
        borderRadius: 2,
        mx: 'auto',
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          p: 3,
        }}
      >
        <Typography
          sx={{ fontSize: 14, mb: 1.5 }}
          color="text.secondary"
          gutterBottom
        >
          Por:{' '}
          {user ? (
            <Link
              to={`/user/${userId}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Typography
                component="span"
                variant="subtitle2"
                sx={{
                  color: 'primary.main',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {user}
              </Typography>
            </Link>
          ) : (
            `Usuário ${userId}`
          )}
        </Typography>
        <Box
          sx={{
            height: 38,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            mb: 1,
          }}
        >
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            minHeight: 120,
            maxHeight: 150,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 5,
            WebkitBoxOrient: 'vertical',
            mt: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
        <Button size="small" component={Link} to={`/post/${id}`} variant="contained">
          Ler Mais
        </Button>
      </CardActions>
    </Card>
  );
}

export default PostCard;