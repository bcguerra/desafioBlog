import React from 'react';
import Header from './components/header';
import PostList from './pages/postList/postList';
import Footer from './components/footer';
import PostDetail from './pages/postDetail/postDetail';
import UserDetail from './pages/userDetail';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#363636',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <Header />
          <Box component="main" sx={{ flexGrow: 1, background: '#EEEEEE'}}>
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/post/:postId" element={<PostDetail />} />
              <Route path="/user/:userId" element={<UserDetail />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;