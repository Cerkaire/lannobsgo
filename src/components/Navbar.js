import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SignUpModal from './SignUpModal'; // Importez le composant de la modal d'inscription
import SignInModal from './SignInModal'; // Importez le composant de la modal de connexion
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Importez le contexte utilisateur
import { auth } from '../firebase-config';


export default function Navbar() {
  const { setOpenSignUp, openSignUp, setOpenSignIn, openSignIn,
    user
  } = useContext(UserContext); // Récupérez les états et les fonctions depuis le contexte utilisateur

  const handleOpenSignUp = () => setOpenSignUp(true); // Fonction pour ouvrir la modal d'inscription
  const handleCloseSignUp = () => setOpenSignUp(false); // Fonction pour fermer la modal d'inscription

  const handleOpenSignIn = () => setOpenSignIn(true); // Fonction pour ouvrir la modal de connexion
  const handleCloseSignIn = () => setOpenSignIn(false); // Fonction pour fermer la modal de connexion

  const navigate = useNavigate()

  const logOut = async () => {
    try {
      await signOut(auth)
      navigate("/")
    } catch {
      alert("Pour une raison inconnu la deconnexion n'a pas fonctionné")
    }
  }
  console.log(user)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => navigate('/')}>
            Lann'Obs Go
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          {!user && (
            <>

              <Button color="inherit" onClick={handleOpenSignIn}>Login</Button>
              <Button color="inherit" onClick={handleOpenSignUp}>Inscription</Button>
            </>
          )}
          {user && (

            <Button color="inherit" onClick={logOut}>Déconnexion</Button>
          )}
        </Toolbar>
      </AppBar>
      {/* Modal d'inscription */}
      <SignUpModal open={openSignUp} handleClose={handleCloseSignUp} />
      {/* Modal de connexion */}
      <SignInModal open={openSignIn} handleClose={handleCloseSignIn} />
    </Box>
  );
}
