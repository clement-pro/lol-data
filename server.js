import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import {fusionData} from "./services/fusionData.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        service: 'lol-data'
    });
});

app.get('/champion/data/:patch/:language/:champion', async (req, res) => {
    const { patch, language, champion } = req.params;

    try {
        /*const filePath = path.join(__dirname, './data/',
            `${champion}.json`);

        console.log(filePath);
        const data = await fs.readFile(filePath, 'utf8');*/

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