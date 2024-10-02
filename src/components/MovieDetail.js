import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Card, CardContent, Button, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const API_KEY = 'acbe95a6b9a9d0f691d1bd98bfcdb612'; // Sua chave de API

// Tema azul e branco alinhado com o Dashboard
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Azul para botões e textos importantes
    },
    secondary: {
      main: '#64b5f6', // Azul claro para destaques
    },
    background: {
      default: '#e3f2fd', // Fundo azul claro
    },
  },
  typography: {
    h4: {
      fontWeight: 600, // Estilizando os títulos
    },
    h5: {
      fontWeight: 500, // Estilizando subtítulos
    },
    body1: {
      fontWeight: 400, // Estilizando o corpo do texto
    },
    body2: {
      fontWeight: 300, // Estilizando textos menores
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
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: API_KEY,
          },
        });
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
      <div style={{ backgroundColor: theme.palette.background.default, padding: '20px', minHeight: '100vh' }}>
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
          <Grid item xs={12} md={6}> {/* Ajustando a largura */}
            <Card 
              style={{ 
                backgroundColor: '#fff', 
                padding: '20px', 
                borderRadius: '10px', 
                maxHeight: '85vh',  // Garantindo que o card não ultrapasse 85% da altura da tela
                overflowY: 'auto'   // Caso haja necessidade de rolar o texto, mas mantendo a imagem visível
              }}
            >
              <CardContent>
                {/* Exibe o pôster do filme, se disponível */}
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    style={{ 
                      width: '50%',   // Reduzindo o tamanho da imagem em 25% novamente
                      height: 'auto', // Mantendo a proporção
                      display: 'block',
                      margin: '0 auto',
                      marginBottom: '20px',
                      borderRadius: '8px',
                    }} 
                  />
                ) : (
                  <Typography variant="body2" align="center">Imagem indisponível</Typography>
                )}

                {/* Título do filme */}
                <Typography variant="h4" align="center" gutterBottom>
                  {movie.title}
                </Typography>

                {/* Sinopse do filme */}
                <Typography variant="body1" align="center" gutterBottom>
                  {movie.overview}
                </Typography>

                {/* Informações adicionais */}
                <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
                  Lançado em: {movie.release_date}
                </Typography>
                <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
                  Nota: {movie.vote_average}
                </Typography>
              </CardContent>
            </Card>

            {}
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/')}
              style={{
                display: 'block',
                margin: '20px auto', 
                fontWeight: 600,
                width: '200px',
                color: '#fff',
              }}
            >
              Voltar ao Dashboard
            </Button>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default MovieDetail;
