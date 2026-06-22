import { fetchDdragonData, fetchCdragonData } from "./binParser.js";

export async function fusionData(patch, champion, langue) {
    const cdragonData = await fetchCdragonData(patch.slice(0, -2), champion);
    const ddragonData = await fetchDdragonData(patch, champion, langue);

    const newData = {
        type: ddragonData.type,
        version: ddragonData.version,
        data: ddragonData.data[champion]
    }

    newData.data.spells.forEach((spell) => {
        spell.datavalues = cdragonData[spell.id].dataValues
        if (spell.id === 'passive') {
            spell.datavalues = cdragonData[champion+'Passive'].dataValues
        }
    });

    return newData;
}