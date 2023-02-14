import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import SearchForm from './components/SearchForm';
import Results from './components/Results';
import About from './components/About';

const App = () => {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">NCLASA</Typography>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/about" color="inherit">
            About
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<SearchForm />} />
        <Route path="results/" element={<Results />} />
        <Route path="about/" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;