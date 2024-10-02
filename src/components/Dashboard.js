import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TextField, Button, Grid, Card, CardContent, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const API_KEY = 'acbe95a6b9a9d0f691d1bd98bfcdb612'; // Sua chave de API

// Paleta de cores personalizada (azul tematizada)
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',  // Azul para botões e destaques
    },
    secondary: {
      main: '#64b5f6',  // Azul claro para outros elementos
    },
    background: {
      default: '#e3f2fd',  // Azul claro para o fundo
    },
  },
  typography: {
    h4: {
      fontWeight: 600,  // Estilizando os títulos
    },
    h5: {
      fontWeight: 500,  // Estilizando subtítulos
    },
    body1: {
      fontWeight: 400,  // Estilizando o corpo do texto
    },
    body2: {
      fontWeight: 300,  // Estilizando textos menores
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
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
        params: {
          api_key: API_KEY,
        },
      });
      setPopularMovies(response.data.results.slice(0, 10));
    } catch (error) {
      console.error('Erro ao buscar filmes populares:', error);
    }
  };

  // Função para buscar os filmes mais bem avaliados
  const fetchTopRatedMovies = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated`, {
        params: {
          api_key: API_KEY,
        },
      });
      setTopRatedMovies(response.data.results.slice(0, 10)); // Limitar a 10 filmes
    } catch (error) {
      console.error('Erro ao buscar filmes mais bem avaliados:', error);
    }
  };

  // Função para buscar filmes baseados na busca do usuário
  const fetchMovies = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: API_KEY,
          query: query,
        },
      });
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
      <div style={{ backgroundColor: theme.palette.background.default, padding: '20px' }}>
        <Typography variant="h3" align="center" gutterBottom>
          Catálogo de Filmes
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Buscar filmes"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={fetchMovies}>
              Buscar
            </Button>
          </Grid>
        </Grid>

        {/* Exibe os resultados da busca, se houver */}
        {searchResults.length > 0 && (
          <div>
            <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
              Resultados da busca
            </Typography>
            <Grid container spacing={3}>
              {searchResults.map((movie) => (
                <Grid item xs={12} sm={6} md={4} key={movie.id}>
                  <Card>
                    <CardContent>
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                          alt={movie.title}
                          style={{ width: '70%', borderRadius: '8px', display: 'block', margin: '0 auto' }}
                        />
                      ) : (
                        <Typography variant="body2">Imagem indisponível</Typography>
                      )}
                      <Typography variant="h5" align="center">{movie.title}</Typography>
                      <Typography variant="body2" align="center">{movie.release_date}</Typography>
                      <Typography variant="body2" align="center">{movie.overview.substring(0, 100)}...</Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{
                          display: 'block',
                          margin: '10px auto',
                          fontWeight: 600,     // Tornando a fonte mais grossa
                          width: '150px',      // Reduzindo a largura do botão
                          color: '#fff'        // Cor branca no texto
                        }}
                        component={Link}
                        to={`/movie/${movie.id}`}
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
        <Typography variant="h4" gutterBottom style={{ marginTop: '40px' }}>
          Top 10 Filmes Mais Bem Avaliados
        </Typography>
        <Grid container spacing={3}>
          {topRatedMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Card>
                <CardContent>
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      style={{ width: '70%', borderRadius: '8px', display: 'block', margin: '0 auto' }}
                    />
                  ) : (
                    <Typography variant="body2">Imagem indisponível</Typography>
                  )}
                  <Typography variant="h5" align="center">{movie.title}</Typography>
                  <Typography variant="body2" align="center">Nota: {movie.vote_average}</Typography>
                  <Typography variant="body2" align="center">{movie.release_date}</Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{
                      display: 'block',
                      margin: '10px auto',
                      fontWeight: 600,     // Tornando a fonte mais grossa
                      width: '150px',      // Reduzindo a largura do botão
                      color: '#fff'        // Cor branca no texto
                    }}
                    component={Link}
                    to={`/movie/${movie.id}`}
                  >
                    Ver detalhes
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Seção dos Filmes Populares com mais espaço entre as seções */}
        <Typography variant="h4" gutterBottom style={{ marginTop: '60px' }}>
          Top 10 Filmes Populares
        </Typography>
        <Grid container spacing={3}>
          {popularMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Card>
                <CardContent>
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      style={{ width: '70%', borderRadius: '8px', display: 'block', margin: '0 auto' }}
                    />
                  ) : (
                    <Typography variant="body2">Imagem indisponível</Typography>
                  )}
                  <Typography variant="h5" align="center">{movie.title}</Typography>
                  <Typography variant="body2" align="center">Nota: {movie.vote_average}</Typography>
                  <Typography variant="body2" align="center">{movie.release_date}</Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{
                      display: 'block',
                      margin: '10px auto',
                      fontWeight: 600,     // Tornando a fonte mais grossa
                      width: '150px',      // Reduzindo a largura do botão
                      color: '#fff'        // Cor branca no texto
                    }}
                    component={Link}
                    to={`/movie/${movie.id}`}
                  >
                    Ver detalhes
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default Dashboard;
