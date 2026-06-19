import axios from "axios";

export async  function fetchCdragonData(patch, champion) {
    const url =
        `${process.env.URL_CDRAGON}/${patch}` +
        `/game/data/characters/${champion.toLowerCase()}` +
        `/${champion.toLowerCase()}.bin.json`;

    const res = await axios.get(url);
    const data = Object.entries(res.data).filter(([key]) => key.includes('/Spells'));
    const data_values = {};

    data.forEach(([path, spellData]) => {
        const spellName = spellData.ObjectName;

        if(spellData.mSpell?.DataValues) {
            data_values[spellName] = {
                dataValues: (spellData.mSpell?.DataValues || []).map(dv => ({
                    name: dv.name,
                    values: dv.values
                }))
            };
        }
    });

    return data_values;
}

export async function fetchDdragonData(patch, champion) {
    const url =
        `${process.env.URL_DDRAGON}/${patch}` +
        `/data/fr_FR/champion/${champion}` +
        `.json`;

    const res = await axios.get(url);

    return res.data;
}

