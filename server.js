import express from 'express';
import dotenv from 'dotenv';
import {fusionData} from "./services/fusionData.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        service: 'lol-data',
        version: '1.0.0',
        endpoints: {
            '/champion/data/:patch/:language/:champion': 'Champion data (ex: /champion/data/16.12.1/fr_FR/Ahri)',
        },
        usage: {
            example: `${req.protocol}://${req.get('host')}/champion/aatrox`,
            docs: 'https://github.com/clement-pro/lol-data'
        }
    });
});

app.get('/champion/data/:patch/:language/:champion', async (req, res) => {
    const { patch, language, champion } = req.params;

    try {

        const data = await fusionData(patch,champion, language);

        res.json(data);
    } catch (error) {
        res.status(404).json({ error: 'Champion not found' });
    }
})

// Gestion globale des erreurs non capturées
process.on('uncaughtException', (error) => {
    console.error('❌ Erreur non gérée:', error);
    // Le serveur continue de tourner au lieu de crasher
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Promise rejetée:', reason);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});