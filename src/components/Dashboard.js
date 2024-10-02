// Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
  Container,
  CardMedia,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';

const API_KEY = 'acbe95a6b9a9d0f691d1bd98bfcdb612'; // Substitua por sua chave da API

// Tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#0d47a1', // Azul escuro
    },
    secondary: {
      main: '#42a5f5', // Azul claro
    },
    background: {
      default: '#e3f2fd', // Fundo azul claro
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h3: {
      fontWeight: 700,
      color: '#0d47a1',
    },
    h4: {
      fontWeight: 600,
      color: '#0d47a1',
    },
    h5: {
      fontWeight: 500,
      color: '#0d47a1',
    },
    body1: {
      fontWeight: 400,
      color: '#0d47a1',
    },
    body2: {
      fontWeight: 300,
      color: '#0d47a1',
    },
  },
});

function Dashboard() {
  const [query, setQuery] = useState('');
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // Função para buscar filmes populares
  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular`,
        {
          params: {
            api_key: API_KEY,
          },
        }
      );
      setPopularMovies(response.data.results.slice(0, 10)); // Limitar a 10 filmes
    } catch (error) {
      console.error('Erro ao buscar filmes populares:', error);
    }
  };

  // Função para buscar os filmes mais bem avaliados
  const fetchTopRatedMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated`,
        {
          params: {
            api_key: API_KEY,
          },
        }
      );
      setTopRatedMovies(response.data.results.slice(0, 10)); // Limitar a 10 filmes
    } catch (error) {
      console.error('Erro ao buscar filmes mais bem avaliados:', error);
    }
  };

  // Função para buscar filmes baseados na busca do usuário
  const fetchMovies = async () => {
    if (query.trim() === '') return;
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: API_KEY,
            query: query,
          },
        }
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    }
  };

  // UseEffect para carregar os filmes populares e os mais bem avaliados ao carregar o componente
  useEffect(() => {
    fetchPopularMovies();
    fetchTopRatedMovies();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Catálogo de Filmes</Typography>
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: '20px' }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Buscar filmes"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{
                endAdornment: (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={fetchMovies}
                    style={{ marginLeft: '10px' }}
                  >
                    <SearchIcon />
                  </Button>
                ),
              }}
            />
          </Grid>
        </Grid>

        {/* Exibe os resultados da busca, se houver */}
        {searchResults.length > 0 && (
          <div>
            <Typography
              variant="h4"
              gutterBottom
              style={{ marginTop: '40px', textAlign: 'center' }}
            >
              Resultados da busca
            </Typography>
            <Grid container spacing={3}>
              {searchResults.map((movie) => (
                <Grid item xs={12} sm={6} md={4} key={movie.id}>
                  <Card
                    sx={{
                      '&:hover': {
                        boxShadow: 6,
                      },
                    }}
                  >
                    {movie.poster_path ? (
                      <CardMedia
                        component="img"
                        height="400"
                        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                      />
                    ) : (
                      <Typography variant="body2" align="center">
                        Imagem indisponível
                      </Typography>
                    )}
                    <CardContent>
                      <Typography variant="h5" align="center" gutterBottom>
                        {movie.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        align="center"
                        color="textSecondary"
                      >
                        {movie.release_date}
                      </Typography>
                      <Typography variant="body2" align="center">
                        {movie.overview.substring(0, 100)}...
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        component={Link}
                        to={`/movie/${movie.id}`}
                        style={{
                          marginTop: '10px',
                          fontWeight: 'bold',
                        }}
                        sx={{
                          transition: '0.3s',
                          '&:hover': {
                            backgroundColor: theme.palette.secondary.main,
                          },
                        }}
                      >
                        Ver detalhes
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        )}

        {/* Seção dos Filmes Mais Bem Avaliados */}
        <Typography
          variant="h4"
          gutterBottom
          style={{ marginTop: '60px', textAlign: 'center' }}
        >
          Top 10 Filmes Mais Bem Avaliados
        </Typography>
        <Grid container spacing={3}>
          {topRatedMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Card
                sx={{
                  '&:hover': {
                    boxShadow: 6,
                  },
                }}
              >
                {movie.poster_path ? (
                  <CardMedia
                    component="img"
                    height="400"
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                ) : (
                  <Typography variant="body2" align="center">
                    Imagem indisponível
                  </Typography>
                )}
                <CardContent>
                  <Typography variant="h5" align="center" gutterBottom>
                    {movie.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    color="textSecondary"
                  >
                    Nota: {movie.vote_average}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    color="textSecondary"
                  >
                    {movie.release_date}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    component={Link}
                    to={`/movie/${movie.id}`}
                    style={{
                      marginTop: '10px',
                      fontWeight: 'bold',
                    }}
                    sx={{
                      transition: '0.3s',
                      '&:hover': {
                        backgroundColor: theme.palette.secondary.main,
                      },
                    }}
                  >
                    Ver detalhes
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Seção dos Filmes Populares */}
        <Typography
          variant="h4"
          gutterBottom
          style={{ marginTop: '60px', textAlign: 'center' }}
        >
          Top 10 Filmes Populares
        </Typography>
        <Grid container spacing={3}>
          {popularMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Card
                sx={{
                  '&:hover': {
                    boxShadow: 6,
                  },
                }}
              >
                {movie.poster_path ? (
                  <CardMedia
                    component="img"
                    height="400"
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                ) : (
                  <Typography variant="body2" align="center">
                    Imagem indisponível
                  </Typography>
                )}
                <CardContent>
                  <Typography variant="h5" align="center" gutterBottom>
                    {movie.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    color="textSecondary"
                  >
                    Nota: {movie.vote_average}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    color="textSecondary"
                  >
                    {movie.release_date}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    component={Link}
                    to={`/movie/${movie.id}`}
                    style={{
                      marginTop: '10px',
                      fontWeight: 'bold',
                    }}
                    sx={{
                      transition: '0.3s',
                      '&:hover': {
                        backgroundColor: theme.palette.secondary.main,
                      },
                    }}
                  >
                    Ver detalhes
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default Dashboard;
