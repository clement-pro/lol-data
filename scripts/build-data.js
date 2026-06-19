// scripts/build-data.js
import fs from 'fs/promises';
import path from 'path';
import axios from "axios";
import {fusionData} from "../services/fusionData.js";

async function buildChampionData() {
    const version = axios.get(process.env.URL_PATH);
    const languages = ['fr_FR', 'en_US'];

    const championsDir = path.join(__dirname, '../data/');
    await fs.mkdir(championsDir, { recursive: true });

    try {
        // Récupérer la liste des champions
        const championList = await fetch(
            `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
        ).then(r => r.json());

        // Pour chaque champion
        for (const championId in championList.data) {
            const championName = championId.toLowerCase();

            // Fusionner
            const merged = fusionData(version, championName, languages);

            // Sauvegarder
            const filePath = path.join(championsDir, `${championName}.json`);
            await fs.writeFile(filePath, JSON.stringify(merged, null, 2));

            console.log(`✓ ${championName}`);
        }

        console.log('✅ Build terminé');
    } catch (error) {
        console.error('❌ Build échoué:', error);
        process.exit(1);
    }
}

buildChampionData();