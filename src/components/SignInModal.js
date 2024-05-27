import React, { useRef, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function LoginError({ message }) {
    return <Typography variant="caption" color="error">{message}</Typography>;
}

export default function SignInModal({ open, handleClose }) { // Utilisez les props open et handleClose
    const { signIn } = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState('');
    const inputsRef = useRef([]);
    const navigate = useNavigate();

    const addInputRef = (el) => {
        if (el && !inputsRef.current.includes(el)) {
            inputsRef.current.push(el);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signIn(inputsRef.current[0].value, inputsRef.current[1].value);
            handleClose(); // Fermez la modal après une connexion réussie
        } catch (error) {
            setErrorMessage(`Erreur lors de la connexion : ${error.message}`);
        }
    };

    return (
        <div>
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
                            <TextField inputRef={addInputRef} id="loginemail" label="Email" variant="outlined" required fullWidth /> {/* Utilisez fullWidth pour que le champ prenne toute la largeur */}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField inputRef={addInputRef} id="loginpwd" label="Mot de passe" variant="outlined" type="password" required fullWidth /> {/* Utilisez fullWidth pour que le champ prenne toute la largeur */}
                        </Grid>
                        <Grid item xs={12}>
                            {errorMessage && <LoginError message={errorMessage} />} {/* Déplacez cette composante à l'extérieur de la grille pour un meilleur positionnement */}
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" fullWidth>Connexion</Button> {/* Utilisez fullWidth pour que le bouton prenne toute la largeur */}
                        </Grid>
                    </Grid>
                </Box>

            </Modal>
        </div >
    );
}
