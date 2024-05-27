import React, { useRef, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import { UserContext } from '../context/UserContext';

function SignUpError({ message }) {
  return <Typography variant="caption" color="error">{message}</Typography>;
}

export default function SignUpModal({ open, handleClose }) { // Utilisez les props open et handleClose
  const { signUp } = useContext(UserContext);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputsRef = useRef([]);

  const addInputRef = (el) => {
    if (el && !inputsRef.current.includes(el)) {
      inputsRef.current.push(el);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const password = inputsRef.current[1].value;
    const repeatPassword = inputsRef.current[2].value;

    if (password.length < 6) {
      setErrorMessage('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    } else {
      setPasswordError(false);
    }

    if (password !== repeatPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return;
    } else {
      setPasswordMatchError(false);
    }

    try {
      await signUp(inputsRef.current[0].value, password);
      handleClose(); // Fermez la modal après une inscription réussie
    } catch (error) {
      setErrorMessage(`Erreur lors de l'inscription : ${error.message}`);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        component="form"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%', // Ajustement de la largeur à 80% de la largeur parente
          maxWidth: 400, // Limite de la largeur maximale à 400px
          bgcolor: 'background.paper',
          border: '2px solid #000',
          borderRadius: '8px', // Ajout de bordures arrondies
          boxShadow: 24,
          p: 4,
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField inputRef={addInputRef} id="signupemail" label="Email" variant="outlined" required fullWidth /> {/* Utilisez fullWidth pour que le champ prenne toute la largeur */}
          </Grid>
          <Grid item xs={12}>
            <TextField inputRef={addInputRef} id="signuppwd" label="Mot de passe" variant="outlined" type="password" required fullWidth /> {/* Utilisez fullWidth pour que le champ prenne toute la largeur */}
          </Grid>
          <Grid item xs={12}>
            {passwordError && <SignUpError message="Le mot de passe doit contenir au moins 6 caractères." />} {/* Déplacez cette composante à l'extérieur de la grille pour un meilleur positionnement */}
          </Grid>
          <Grid item xs={12}>
            <TextField inputRef={addInputRef} id="repeatpwd" label="Retaper votre mot de passe" variant="outlined" type="password" required fullWidth /> {/* Utilisez fullWidth pour que le champ prenne toute la largeur */}
          </Grid>
          <Grid item xs={12}>
            {passwordMatchError && <SignUpError message="Les mots de passe ne correspondent pas." />} {/* Déplacez cette composante à l'extérieur de la grille pour un meilleur positionnement */}
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>Valider</Button> {/* Utilisez fullWidth pour que le bouton prenne toute la largeur */}
          </Grid>
          <Grid item xs={12}>
            {errorMessage && <SignUpError message={errorMessage} />} {/* Déplacez cette composante à l'extérieur de la grille pour un meilleur positionnement */}
          </Grid>
        </Grid>
      </Box>

    </Modal>
  );
}
