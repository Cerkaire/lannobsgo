import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { db } from '../db/db';
import { sendLoginRequest } from './Utils';

export default function LoginForm({ setStatus, fetchUsers }) {
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const apiResponse = await sendLoginRequest(mail, pass);
        if (apiResponse) {
            try {
                const id = await db.user.add(apiResponse);
                setStatus(`Utilisateur ajouté avec l'ID ${id}`);
                setMail('');
                setPass('');
                fetchUsers();
            } catch (error) {
                setStatus(`Échec de l'ajout de l'utilisateur: ${error}`);
            }
        }
    }

    async function handleAddFictitiousUser() {
        const fictitiousUser = {
            email: 'fictitious@user.com',
            password: 'hashed_password',
            firstName: 'John',
            lastName: 'Doe'
        };
        try {
            const id = await db.user.add(fictitiousUser);
            setStatus(`Utilisateur fictif ajouté avec l'ID ${id}`);
            fetchUsers();
        } catch (error) {
            setStatus(`Échec de l'ajout de l'utilisateur fictif: ${error}`);
        }
    }

    async function handleClearDatabase() {
        try {
            await db.user.clear();
            setStatus('Base de données des utilisateurs vidée');
            fetchUsers();
        } catch (error) {
            setStatus(`Échec du vidage de la base de données: ${error}`);
        }
    }

    return (
        <Card sx={{ height: "450px", width: "100%", marginBottom: "20px" }}>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <TextField
                        label="Email"
                        name="mail"
                        value={mail}
                        fullWidth
                        margin="normal"
                        onChange={(ev) => setMail(ev.target.value)}
                    />
                    <TextField
                        label="Mot de passe"
                        name="pass"
                        type="password"
                        value={pass}
                        fullWidth
                        margin="normal"
                        onChange={(ev) => setPass(ev.target.value)}
                    />
                </CardContent>
                <CardActions>
                    <Button type="submit" size="small">Submit</Button>
                    <Button onClick={handleAddFictitiousUser} size="small">Ajouter un utilisateur fictif</Button>
                    <Button onClick={handleClearDatabase} size="small">Vider la base de données</Button>
                </CardActions>
            </form>
        </Card>
    );
}
