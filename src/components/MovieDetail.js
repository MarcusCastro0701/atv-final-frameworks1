// MovieDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Container,
  CardMedia,
  AppBar,
  Toolbar,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const API_KEY = 'acbe95a6b9a9d0f691d1bd98bfcdb612';

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
    h4: {
      fontWeight: 700,
      color: '#0d47a1',
    },
    h5: {
      fontWeight: 600,
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

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: API_KEY,
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do filme:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div>Carregando...</div>;

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Detalhes do Filme</Typography>
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: '40px' }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '10px',
              }}
            >
              {movie.poster_path ? (
                <CardMedia
                  component="img"
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  style={{
                    width: '50%',
                    margin: '0 auto',
                    borderRadius: '10px',
                  }}
                />
              ) : (
                <Typography variant="body2" align="center">
                  Imagem indisponível
                </Typography>
              )}

              <CardContent>
                <Typography variant="h4" align="center" gutterBottom>
                  {movie.title}
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  paragraph
                  style={{ marginTop: '20px' }}
                >
                  {movie.overview}
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  color="textSecondary"
                  gutterBottom
                >
                  Lançado em: {movie.release_date}
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  color="textSecondary"
                  gutterBottom
                >
                  Nota: {movie.vote_average}
                </Typography>
              </CardContent>
            </Card>

            {/* Botão para voltar ao Dashboard, fora do card */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/')}
              style={{
                display: 'block',
                margin: '20px auto',
                fontWeight: 'bold',
                width: '200px',
                color: '#fff',
              }}
              sx={{
                transition: '0.3s',
                '&:hover': {
                  backgroundColor: theme.palette.secondary.main,
                },
              }}
            >
              Voltar ao Dashboard
            </Button>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default MovieDetail;
