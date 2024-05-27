import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, Button, Typography } from '@mui/material';
import { db } from '../db/db';
import speciesData from '../data/esp.json'; // Assume you have a JSON file with species data

export default function Parametre() {
    const [status, setStatus] = useState('');
    const [speciesCount, setSpeciesCount] = useState(0);
    const [observatoireCount, setObservatoireCount] = useState(0);

    useEffect(() => {
        fetchCounts();
    }, []);

    async function fetchCounts() {
        const speciesArray = await db.species.toArray();
        setSpeciesCount(speciesArray.length);

        const observatoireArray = await db.observatoire.toArray();
        setObservatoireCount(observatoireArray.length);
    }

    async function handleLoadSpeciesData() {
        try {
            await db.species.bulkAdd(speciesData);
            setStatus('Données des espèces chargées avec succès');
            fetchCounts();
        } catch (error) {
            setStatus(`Erreur lors du chargement des données : ${error}`);
        }
    }

    async function handleClearSpeciesData() {
        try {
            await db.species.clear();
            setStatus('Base de données des espèces vidée');
            fetchCounts();
        } catch (error) {
            setStatus(`Erreur lors du vidage de la base de données : ${error}`);
        }
    }

    async function handleLoadObservatoireData() {
        try {
            const context = require.context('../data/observatoires', false, /\.json$/);
            const observatoireData = context.keys().map(context);
            await db.observatoire.bulkAdd(observatoireData);
            setStatus('Données des observatoires chargées avec succès');
            fetchCounts();
        } catch (error) {
            setStatus(`Erreur lors du chargement des données : ${error}`);
        }
    }

    async function handleClearObservatoireData() {
        try {
            await db.observatoire.clear();
            setStatus('Base de données des observatoires vidée');
            fetchCounts();
        } catch (error) {
            setStatus(`Erreur lors du vidage de la base de données : ${error}`);
        }
    }

    return (
        <Container>
            <Card>
                <CardContent>
                    <Typography variant="h5">Paramètres</Typography>
                    <Button onClick={handleLoadSpeciesData} size="small">Charger les données des espèces</Button>
                    <Button onClick={handleClearSpeciesData} size="small">Vider les données des espèces</Button>
                    <Typography variant="body1">Nombre d'espèces : {speciesCount}</Typography>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Typography variant="h5">Observatoires</Typography>
                    <Button onClick={handleLoadObservatoireData} size="small">Charger les données des observatoires</Button>
                    <Button onClick={handleClearObservatoireData} size="small">Vider les données des observatoires</Button>
                    <Typography variant="body1">Nombre d'observatoires : {observatoireCount}</Typography>
                </CardContent>
            </Card>
            <div>{status}</div>
        </Container>
    );
}
