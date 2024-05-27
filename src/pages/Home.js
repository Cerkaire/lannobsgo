import React, { useContext, useState, useEffect, useRef } from 'react';
import { Container, Card, Button, CardActionArea, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { UserContext } from '../context/UserContext';
import { db } from '../db/db';
import LoginForm from './LoginForm';
import UserList from './UserList';
import MapView from './MapView';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [mapCenter, setMapCenter] = useState([48.505, -4.29]);
  const [status, setStatus] = useState('');
  const mapRef = useRef(null);
  const [showMap, setShowMap] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleClearDatabase() {
    try {
      await db.user.clear();
      setStatus('Base de données des utilisateurs vidée');
      fetchUsers();
    } catch (error) {
      setStatus(`Échec du vidage de la base de données: ${error}`);
    }
  }

  async function fetchUsers() {
    const usersArray = await db.user.toArray();
    setUsers(usersArray);
  }

  const handleMapToggle = () => setShowMap(!showMap);

  return (
    <Container>
      {users.length === 0 ? (
        <LoginForm setStatus={setStatus} fetchUsers={fetchUsers} />
      ) : (
        <>
          {!showMap ? (
            <>
              <Box sx={{ flexGrow: 1 }} paddingTop={1}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  <Grid item xs={2} sm={4} md={4} >
                    <Card elevation={3}>
                      <CardActionArea onClick={() => navigate('/parametre')}>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            PARAMETRES
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Réglages des paramètres et téléchargement pour l'utilisation hors ligne
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                  <Grid item xs={2} sm={4} md={4} >
                    <Card elevation={3}>
                      <CardActionArea onClick={handleMapToggle} >
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            SAISIE
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Espace de saisie classique d'observation
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                  <Grid item xs={2} sm={4} md={4} >
                    <Card elevation={3}>
                      <CardActionArea>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            SUIVI
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Espace de saisie en suivi. Selectionner des espèces et compter les avant de valider
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                  <Grid item xs={2} sm={4} md={4} >
                    <Card elevation={3}>
                      <CardActionArea>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            QUICK OBS
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Espace de saisie simplifier et rapide
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                </Grid>
              </Box >
              <UserList users={users} />
              <Button onClick={handleClearDatabase} size="small">Vider la base de données</Button>
            </>
          ) : (
            <MapView mapRef={mapRef} mapCenter={mapCenter} setMapCenter={setMapCenter} />
          )
          }
        </>
      )}
      <div>{status}</div>
    </Container >
  );
}
