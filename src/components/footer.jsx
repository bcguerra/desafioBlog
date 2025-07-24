import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';

function Footer() {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 3,
        mt: 'auto',
        width: '100%',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="inherit" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://www.linkedin.com/company/jumpad/">
            Jumpad Blog
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;